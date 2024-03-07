import {Colors} from 'assets/colors';
import {bg_salary, ic_information} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {DateFormatPattern} from 'common/enums';
import CTLayout from 'components/CTLayout';
import CTRbSheet from 'components/CTRbSheet';
import EmptyState from 'components/CTScreen/EmptyState';
import CTStatusBar from 'components/CTStatusBar';
import CTTypography from 'components/CTTypography';
import {MainRouteConfig} from 'config/RouteConfig';
import {useAppSelector} from 'hook/CustomReduxHook';
import {ReportTabButton, ReportViewType} from 'modules/analytic/enums';
import {BarChartItemEntity} from 'modules/analytic/models/entities';
import ReportRetailEntity, {
  ReportKeyDriverEntity,
  ReportRetailChartDetailEntity,
} from 'modules/analytic/models/entities/ReportRetailEntity';
import {ReportQueryRequest} from 'modules/analytic/models/requests';
import reportRetailService from 'modules/analytic/services/ReportRetailService';
import moment from 'moment';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import BSReportBestSell from '../../views/BSReportBestSell';
import ChartDetail from '../../views/ChartDetail';
import ReportRetailChart from '../../views/ReportChart';
import ReportRetailFilter from '../../views/ReportFilter';
import ScrollKeyDriver from '../../views/ReportKeyDriver';
import ReportRetailMenu from '../../views/ReportRetailMenu';
import ReportTabButtonView from '../../views/ReportTab';
import {ReportTabStyle, Style} from './style';
import {useAuth} from 'providers/contexts/AuthContext';
import {ErrorType, Layout} from 'common-ui';
import {REPORT_PERMISSION} from 'modules/analytic/permission';
import {useConfig} from 'hook';

type Props = MainStackScreenProps<'ReportRetail'>;

const ReportRetailScreen: React.FC<Props> = ({navigation}) => {
  const {locationSelected} = useAuth();
  const {height} = useWindowDimensions();
  const bs = createRef<RBSheet>();
  const bsReportBestSell = createRef<RBSheet>();
  const today = moment(new Date()).format(DateFormatPattern.YYYYMMDD);
  const [data, setData] = useState<ReportRetailEntity | null>(null);
  const [dataDetail, setDataDetail] =
    useState<ReportRetailChartDetailEntity | null>(null);
  const [keyDriverData, setKeyDriverData] =
    useState<ReportKeyDriverEntity | null>(null);
  const [activeTab, setActiveTab] = useState<string>(ReportTabButton.revenue);
  const [viewType, setViewType] = useState<string>(ReportViewType.day);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<false | string>(false);
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const {profile} = useAuth();
  const config = useConfig();
  const [request, setRequest] = useState<ReportQueryRequest>({
    from_date: today,
    to_date: today,
    view_date: today,
    view_type: ReportViewType.day,
  });
  const hideFeature = useAppSelector(
    state => state.config.config.hideFeatureFunction,
  );
  const handleSuccess = () => {
    setFirstLoading(false);
    setLoading(false);
    setRefreshing(false);
  };

  const handleError = (err: string) => {
    setFirstLoading(false);
    setLoading(false);
    setError(err);
  };

  const getExpectData = (result: null | ReportRetailEntity) => {
    setData(result);
  };
  const getExpectError = (err: string) => {
    handleError(err);
  };

  const getKeyDriverData = (
    result: null | ReportKeyDriverEntity,
    chartDetailData: null | ReportRetailChartDetailEntity,
  ) => {
    handleSuccess();
    setKeyDriverData(result);
    setDataDetail(chartDetailData);
  };
  const getKeyDriverError = (err: string) => {
    handleError(err);
  };

  const getData = useCallback(
    (beforeCallApi: () => void) => {
      reportRetailService.getReportRetailData(
        request,
        activeTab,
        locationSelected,
        getExpectData,
        getExpectError,
        beforeCallApi,
      );
      reportRetailService.getReportRetailDetail(
        request,
        activeTab,
        locationSelected,
        getKeyDriverData,
        getKeyDriverError,
        beforeCallApi,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab, request],
  );

  const onRefresh = () => {
    getData(() => {
      setRefreshing(true);
    });
  };
  const onReloadPress = () => {
    getData(() => {
      setError(false);
      setLoading(true);
    });
  };

  useEffect(() => {
    if (firstLoading) {
      reportRetailService.getReportRetailData(
        request,
        activeTab,
        locationSelected,
        getExpectData,
        getExpectError,
      );
      reportRetailService.getReportRetailDetail(
        request,
        activeTab,
        locationSelected,
        getKeyDriverData,
        getKeyDriverError,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, firstLoading, activeTab]);

  useEffect(() => {
    if (!firstLoading) {
      getData(() => {
        setLoading(true);
      });
    }
  }, [firstLoading, getData]);

  const handleChangeParam = useCallback(
    (query: ReportQueryRequest, type: string) => {
      setRequest(query);
      setViewType(type);
    },
    [],
  );

  const barChartData = useMemo(() => {
    let res: Array<BarChartItemEntity> = [];
    if (!data || !data.getDataChart()) {
      return [];
    }
    for (let index = 0; index < data.getDataChart().length; index++) {
      res.push(
        new BarChartItemEntity(
          data.getLabelByViewType(
            viewType,
            data.getDataChart()[index].getLabel(),
          ),
          data.getDataChart()[index].getValue(),
        ),
      );
    }
    const template = data.getTemplateChart(viewType, request.view_date);
    template.filter(e => {
      const findColumn = res.find(p => p.getLabel() === e.getLabel());
      if (findColumn) {
        e.setValue(findColumn.getValue());
      }
      return e;
    });
    return template;
  }, [data, viewType, request.view_date]);

  const handleClickMenuReport = (screen: string, type?: string) => {
    const vType =
      viewType === ReportViewType.year ? ReportViewType.month : viewType;
    if (screen === MainRouteConfig.ReportSaleAssignee) {
      if (type) {
        bs.current?.close();
        navigation.navigate(screen, {
          params: {...request, view_type: vType},
          type: type,
        });
        return;
      }
      bs.current?.open();
      return;
    }
    if (screen === MainRouteConfig.ReportTopSale) {
      if (type) {
        bsReportBestSell.current?.close();
        navigation.navigate(screen, {
          params: {...request, view_type: vType},
          type: type,
        });
        return;
      }
      bsReportBestSell.current?.open();
      return;
    }
    if (screen) {
      navigation.navigate(screen, {params: {...request, view_type: vType}});
      return;
    }
    navigation.navigate(MainRouteConfig.Feature);
  };

  const permissionView = useMemo(() => {
    return profile?.checkPermissionByKey(REPORT_PERMISSION.REPORT_RETAIL);
  }, [profile]);
  useEffect(() => {
    if (!profile?.checkPermissionByKey(REPORT_PERMISSION.REPORT_RETAIL)) {
      setErrorType('NotPermissionReport');
    }
    setError(false);
  }, [profile]);

  let dataGapo = useMemo(() => {
    if (config && config.contactSupport) {
      return JSON.parse(config.contactSupport);
    } else {
      return {name: '', link: ''};
    }
  }, [config]);

  const onSupportClick = () => {
    if (dataGapo.link) {
      Linking.openURL(`${dataGapo.link}`);
    } else {
      return;
    }
  };

  return (
    <CTLayout.Container disableHideKeyboardOnPress>
      <CTStatusBar barStyle="dark-content" />
      <Layout.ScreenHeaderBack
        title="Báo cáo bán lẻ"
        children={
          !loading &&
          !firstLoading &&
          permissionView && (
            <View style={[ReportTabStyle.container]}>
              <ReportTabButtonView
                idActive={activeTab}
                onPress={setActiveTab}
              />
            </View>
          )
        }
      />
      <CTLayout.Body>
        <CTLayout.LoadingView firstLoading={firstLoading || loading}>
          <View style={Style.container}>
            <Layout.Error error={errorType}>
              <React.Fragment>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      onRefresh={onRefresh}
                      refreshing={refreshing}
                    />
                  }>
                  <CTLayout.ErrorView
                    onReloadPress={onReloadPress}
                    error={error}>
                    {/* filter */}
                    <View style={Style.param}>
                      <ReportRetailFilter
                        pDate={request.view_date}
                        pViewType={request.view_type}
                        onPress={handleChangeParam}
                      />
                    </View>
                    {/* chart */}
                    {data &&
                    data.getDataChart() &&
                    data.getDataChart().length > 0 ? (
                      <View style={[Style.chart]}>
                        {barChartData.length > 0 && (
                          <ReportRetailChart
                            barData={barChartData}
                            viewType={viewType}
                          />
                        )}
                      </View>
                    ) : (
                      <View style={Style.notDataChart}>
                        <CTTypography.Text text="Không có dữ liệu hiển thị." />
                      </View>
                    )}
                    <CTLayout.Row>
                      <View style={Style.note}>
                        <Image
                          source={ic_information}
                          style={[{tintColor: Colors.Primary}, Style.noteIcon]}
                        />
                        <CTTypography.Text
                          level="4"
                          text="Báo cáo tính theo cửa hàng mặc định bạn đã chọn."
                          style={Style.noteText}
                        />
                      </View>
                    </CTLayout.Row>
                    {/* Chi tiết chart */}
                    <CTLayout.Row>
                      <ChartDetail
                        activeTab={activeTab}
                        viewType={viewType}
                        data={{
                          rate: dataDetail?.getRate(),
                          value: dataDetail?.getValue(),
                        }}
                        loading={false}
                      />
                    </CTLayout.Row>
                    {/* key driver */}
                    <CTLayout.Row style={Style.keyDriver}>
                      <ScrollKeyDriver
                        data={keyDriverData?.getKeyDriverItem()}
                        loadingOrder={false}
                      />
                    </CTLayout.Row>
                    <View style={ThemeStyle.separator} />
                    {/* menu */}
                    <ReportRetailMenu
                      onPress={handleClickMenuReport}
                      hideFeature={hideFeature}
                    />
                  </CTLayout.ErrorView>
                </ScrollView>
                <CTRbSheet
                  closeOnDragDown
                  dragFromTopOnly
                  ref={bsReportBestSell}
                  height={height * 0.35}>
                  <BSReportBestSell onPress={handleClickMenuReport} />
                </CTRbSheet>
              </React.Fragment>
            </Layout.Error>
          </View>
        </CTLayout.LoadingView>
      </CTLayout.Body>
    </CTLayout.Container>
  );
};

export default ReportRetailScreen;
