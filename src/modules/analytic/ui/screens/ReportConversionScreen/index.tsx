import React, {useCallback, useEffect, useMemo} from 'react';
import {ErrorType, Layout, Typography} from 'common-ui';
import {useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {style} from './style';
import {ReportConversionBoxView} from '../../views';
import {
  ic_info,
  ic_right,
  onboarding_report_conversion_p1,
  onboarding_report_conversion_p2,
  onboarding_report_conversion_p3,
} from 'assets/images';
import {MainRouteConfig} from 'config/RouteConfig';
import {ReportConversionTabView} from '../../views';
import {ReportConversionTab, ReportViewType} from 'modules/analytic/enums';
import {ReportQueryRequest} from 'modules/analytic/models/requests';
import moment from 'moment';
import {DateFormatPattern} from 'common/enums';
import {ReportConversionFilter} from './Component';
import {
  BarChartItemEntity,
  ReportConversionEntity,
} from 'modules/analytic/models/entities';
import ReportConversionChartView from '../../views/ReportConversionChartView';
import OnboardingModal, {OnBoardingPage} from './Component/OnboardingModal';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import {reportConversionService} from 'modules/analytic/services';
import {ReportQuery} from 'model/query/ReportQuery';
import {useAuth} from 'providers/contexts/AuthContext';
import {ReportConversionChart} from 'modules/analytic/models/interface';

type Props = MainStackScreenProps<'ReportConversion'>;
const ReportConversionScreen: React.FC<Props> = ({navigation}) => {
  const {locationSelected} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingChart, setLoadingChart] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const [boxSelected, setBoxSelected] = useState<string>(
    'trafficReceptionistQuantity',
  );
  const [activeTab, setActiveTab] = useState<string>(
    ReportConversionTab.customer,
  );

  const [arrChart, setArrDataChart] =
    useState<Array<ReportConversionChart> | null>([]);
  const [viewType, setViewType] = useState<ReportViewType | string>(
    ReportViewType.day,
  );
  const [reportConversion, setReportConversion] =
    useState<ReportConversionEntity>(ReportConversionEntity.createEmpty());
  const today = moment(new Date()).format(DateFormatPattern.YYYYMMDD);
  const [request, setRequest] = useState<ReportQueryRequest>({
    from_date: today,
    to_date: today,
    view_date: today,
    view_type: ReportViewType.day,
    store_id: locationSelected.locationId,
  });
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [msg, setMsg] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const handleSelectBox = (key: string) => {
    setBoxSelected(key);
  };
  const onPressDetail = () => {
    navigation.navigate(MainRouteConfig.ReportConversionDetail, {
      from_date: request.from_date,
      to_date: request.to_date,
      view_type: request.view_type,
      view_date: request.view_date,
    });
  };
  const handleChangeParam = useCallback(
    (query: ReportQuery, type: string) => {
      if (!firstLoad) {
        const r = {
          ...query,
          from_date: query.from_date,
          to_date: query.to_date,
          view_type: type,
          store_id: locationSelected.locationId,
        };
        setRequest(r);
        setViewType(type);
        getData(r, type);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [firstLoad, locationSelected],
  );

  const dataChart = useMemo(() => {
    if (!arrChart || !arrChart.find(e => e.key === boxSelected)) {
      return null;
    }
    return arrChart.find(e => e.key === boxSelected)?.entity;
  }, [boxSelected, arrChart]);

  const barChartData = useMemo(() => {
    let res: Array<BarChartItemEntity> = [];
    if (!dataChart || !dataChart.getDataChart()) {
      return [];
    }
    for (let index = 0; index < dataChart.getDataChart().length; index++) {
      res.push(
        new BarChartItemEntity(
          dataChart.getLabelByViewType(
            viewType,
            dataChart.getDataChart()[index].getLabel(),
          ),
          dataChart.getDataChart()[index].getValue(),
        ),
      );
    }
    const template = dataChart.getTemplateChart(viewType, request.view_date);
    template.filter(e => {
      const findColumn = res.find(p => p.getLabel() === e.getLabel());
      if (findColumn) {
        e.setValue(findColumn.getValue());
      }
      return e;
    });
    return template;
  }, [dataChart, request.view_date, viewType]);

  const handleOnboarding = () => {
    setShowOnboarding(!showOnboarding);
    if (showOnboarding) {
      LocalStorageUtils.setOnBoardReport('active');
    }
  };

  const onboardingPages: Array<OnBoardingPage> = [
    {
      key: 0,
      title: 'Page 1',
      backgroundColor: 'red',
      image: onboarding_report_conversion_p1,
    },
    {
      key: 1,
      title: 'Page 2',
      backgroundColor: 'green',
      image: onboarding_report_conversion_p2,
    },
    {
      key: 2,
      title: 'Page 3',
      backgroundColor: 'yellow',
      image: onboarding_report_conversion_p3,
    },
  ];

  const handleSuccess = (report: ReportConversionEntity) => {
    setErrorType(false);
    setReportConversion(report);
  };

  const onError = (code: ErrorType, message?: string) => {
    setErrorType(code);
    if (message) {
      setMsg(message);
    }
    setLoading(false);
  };

  const handleChartSuccess = (chart: Array<ReportConversionChart>) => {
    setArrDataChart(chart);
  };

  const onChartError = (code: ErrorType, message?: string) => {
    setErrorType(code);
    if (message) {
      setMsg(message);
    }
    setLoading(false);
  };

  const getData = (param: ReportQuery, timeType: string) => {
    reportConversionService.getReportData(
      param,
      timeType,
      handleSuccess,
      onError,
      () => setLoading(true),
      () => setLoading(false),
    );
    setTimeout(() => {
      reportConversionService.getConversionChart(
        param,
        timeType,
        boxSelected,
        handleChartSuccess,
        onChartError,
        () => setLoadingChart(true),
        () => setLoadingChart(false),
      );
    }, 300);
  };

  const handleTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === ReportConversionTab.customer) {
      setBoxSelected('trafficReceptionistQuantity');
      return;
    }
    setBoxSelected('numberSlotCreated');
  };

  useEffect(() => {
    if (firstLoad) {
      getData(request, ReportViewType.day);
    }
    setFirstLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLoad, request]);

  const onBoard = async () => {
    return await LocalStorageUtils.getOnBoardReport();
  };

  useEffect(() => {
    onBoard().then(value => {
      if (!value) {
        setShowOnboarding(true);
      }
    });
  }, []);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title="Báo cáo chuyển đổi"
        right={
          <View style={style.icInformation}>
            <TouchableOpacity onPress={handleOnboarding}>
              <Image source={ic_info} />
            </TouchableOpacity>
          </View>
        }
        children={
          <View style={style.tab}>
            <ReportConversionTabView idActive={activeTab} onPress={handleTab} />
          </View>
        }
      />
      <Layout.SafeAreaContainer edges={['bottom']}>
        <Layout.Loading loading={loading}>
          <React.Fragment>
            {/* filter */}
            <View style={style.param}>
              <ReportConversionFilter
                pDate={request.view_date}
                pViewType={request.view_type}
                onPress={handleChangeParam}
              />
            </View>
            <Layout.Error subTitle={msg} error={errorType}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Layout.Loading loading={loadingChart}>
                  <View style={style.viewChart}>
                    {/* chart */}
                    {dataChart &&
                    dataChart.getDataChart() &&
                    dataChart.getDataChart().length > 0 ? (
                      <View style={[style.chart]}>
                        {barChartData.length > 0 && (
                          <ReportConversionChartView
                            barData={barChartData}
                            viewType={viewType}
                          />
                        )}
                      </View>
                    ) : (
                      <View style={style.notDataChart}>
                        <Typography text="Không có dữ liệu hiển thị." />
                      </View>
                    )}
                  </View>
                </Layout.Loading>
                {/* boxes */}
                {activeTab === ReportConversionTab.customer ? (
                  <View style={style.boxContainer}>
                    <ReportConversionBoxView
                      boxKey="trafficReceptionistQuantity"
                      selected={boxSelected}
                      boxName="Khách vào"
                      value={reportConversion.getTrafficReceptionistQuantity()}
                      rate={reportConversion.getTrafficReceptionistQuantityGrowthRatio()}
                      up={
                        reportConversion.getTrafficReceptionistQuantityGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                    <ReportConversionBoxView
                      boxKey="trafficNotBoughtQuantity"
                      selected={boxSelected}
                      boxName="Khách không mua"
                      value={reportConversion.getTrafficNotBoughtQuantity()}
                      rate={reportConversion.getTrafficNotBoughtQuantityGrowthRatio()}
                      up={
                        reportConversion.getTrafficNotBoughtQuantityGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                    <ReportConversionBoxView
                      boxKey="trafficAssigneeQuantity"
                      selected={boxSelected}
                      boxName="Khách đã tiếp"
                      value={reportConversion.getTrafficAssigneeQuantity()}
                      rate={reportConversion.getTrafficAssigneeQuantityGrowthRatio()}
                      up={
                        reportConversion.getTrafficAssigneeQuantityGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                    <ReportConversionBoxView
                      boxKey="customerPurchase"
                      selected={boxSelected}
                      boxName="Khách mua hàng"
                      value={reportConversion.getCustomerPurchase()}
                      rate={reportConversion.getCustomerPurchaseGrowthRatio()}
                      up={
                        reportConversion.getCustomerPurchaseGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                    <ReportConversionBoxView
                      boxKey="crReceptionistPurchase"
                      selected={boxSelected}
                      boxName="CRV Khách vào"
                      value={reportConversion.getCrReceptionistPurchase()}
                      rate={reportConversion.getCrReceptionistPurchaseGrowthRatio()}
                      up={
                        reportConversion.getCrReceptionistPurchaseGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                    <ReportConversionBoxView
                      boxKey="crAssigneePurchase"
                      selected={boxSelected}
                      boxName="CRV Khách đã tiếp"
                      value={reportConversion.getCrAssigneePurchase()}
                      rate={reportConversion.getCrAssigneePurchaseGrowthRatio()}
                      up={
                        reportConversion.getCrAssigneePurchaseGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                  </View>
                ) : (
                  <View style={style.boxContainer}>
                    <ReportConversionBoxView
                      boxKey="numberSlotCreated"
                      selected={boxSelected}
                      boxName="Lốt đã tạo"
                      value={reportConversion.getNumberSlotCreated()}
                      rate={reportConversion.getNumberSlotCreatedGrowthRatio()}
                      up={
                        reportConversion.getNumberSlotCreatedGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                    <ReportConversionBoxView
                      boxKey="numberSlotAssign"
                      selected={boxSelected}
                      boxName="Lốt đã tiếp"
                      value={reportConversion.getNumberSlotAssign()}
                      rate={reportConversion.getNumberSlotAssignGrowthRatio()}
                      up={
                        reportConversion.getNumberSlotAssignGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                    <ReportConversionBoxView
                      boxKey="numberSlotBought"
                      selected={boxSelected}
                      boxName="Mua hàng"
                      value={reportConversion.getNumberSlotBought()}
                      rate={reportConversion.getNumberSlotBoughtGrowthRatio()}
                      up={
                        reportConversion.getNumberSlotBoughtGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                    <ReportConversionBoxView
                      boxKey="numberSlotNotBought"
                      selected={boxSelected}
                      boxName="Không mua"
                      value={reportConversion.getNumberSlotNotBought()}
                      rate={reportConversion.getNumberSlotNotBoughtGrowthRatio()}
                      up={
                        reportConversion.getNumberSlotNotBoughtGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                    <ReportConversionBoxView
                      boxKey="crSlotCreatedBought"
                      selected={boxSelected}
                      boxName="CRV theo lốt đã tạo"
                      value={reportConversion.getCrSlotCreatedBought()}
                      rate={reportConversion.getCrSlotCreatedBoughtGrowthRatio()}
                      up={
                        reportConversion.getCrSlotCreatedBoughtGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                    <ReportConversionBoxView
                      boxKey="crSlotAssignBought"
                      selected={boxSelected}
                      boxName="CRV theo lốt đã tiếp"
                      value={reportConversion.getCrSlotAssignBought()}
                      rate={reportConversion.getCrSlotAssignBoughtGrowthRatio()}
                      up={
                        reportConversion.getCrSlotAssignBoughtGrowthRatioValue() >=
                        0
                      }
                      onPress={handleSelectBox}
                    />
                  </View>
                )}
                <View>
                  <TouchableOpacity
                    onPress={onPressDetail}
                    style={style.btnViewDetail}>
                    <Typography type="h4" text="Xem chi tiết nhân viên" />
                    <Image source={ic_right} />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Layout.Error>
          </React.Fragment>
        </Layout.Loading>
      </Layout.SafeAreaContainer>
      {showOnboarding && (
        <OnboardingModal
          visible={showOnboarding}
          onClose={handleOnboarding}
          pages={onboardingPages}
        />
      )}
    </Layout.Screen>
  );
};

export default ReportConversionScreen;
