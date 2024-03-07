import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {ReportTabStyle, style} from './style';
import {ErrorType, Layout, Typography} from 'common-ui';
import {Animated, Image, Linking, View} from 'react-native';
import {
  EmulationDetailView,
  ReportRankView,
  ReportTabButtonView,
} from '../../views';
import {ReportTabButton, ReportViewType} from 'modules/analytic/enums';
import {
  bg_salary,
  ic_attention,
  ic_crv,
  ic_product_store,
  ic_rp_down,
  ic_rp_up,
} from 'assets/images';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MainRouteConfig} from 'config/RouteConfig';
import {
  ReportEmulationEntity,
  ReportEmulationRevenueEntity,
} from 'modules/analytic/models/entities';
import reportEmulationService from 'modules/analytic/services/ReportEmulationService';
import {ReportQuery} from 'model/query/ReportQuery';
import {useConfig} from 'hook';
import ReportRetailFilter from 'ui/screens/MainStack/Report/ReportRetailScreen/ReportRetailFilter';
import EmptyState from 'components/CTScreen/EmptyState';
import {useAuth} from 'providers/contexts/AuthContext';
import SwitchTab from 'modules/analytic/ui/views/SwitchTab';
import {CRVViewType} from 'modules/analytic/config/ReportConfig';
import {AlignVerticalErrorEnum} from 'enums/MainErrorType';

type Props = MainStackScreenProps<'ReportEmulationRSM'>;
const ReportEmulationRSMScreen: FC<Props> = ({navigation, route}) => {
  const {params} = route.params;
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [reportEmulationEntity, setReportEmulationEntity] =
    useState<ReportEmulationEntity>(new ReportEmulationRevenueEntity());
  const [activeTab, setActiveTab] = useState<string>(ReportTabButton.revenue);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const [msg, setMsg] = useState<string>('');
  const [request, setRequest] = useState<ReportQuery>({...params});
  const [crvType, setCrvType] = useState<CRVViewType>(CRVViewType.customer);

  const {profile} = useAuth();
  const config = useConfig();

  const rateText = useMemo(() => {
    if (!reportEmulationEntity.getGrowthRatioValue(crvType)) {
      return '';
    }
    return `${Math.abs(
      reportEmulationEntity.getGrowthRatioValue(crvType),
    ).toFixed(1)}%`;
  }, [crvType, reportEmulationEntity]);

  const queryParam = useMemo(() => {
    let query: ReportQuery = {};
    if (params && params) {
      query = {...params};
    }
    return query;
  }, [params]);

  const iconSource = useMemo(() => {
    if (activeTab === ReportTabButton.crv) {
      return ic_crv;
    }
    return ic_product_store;
  }, [activeTab]);

  const storeView = useMemo(() => {
    let title = 'Doanh thu hệ thống offline';
    if (activeTab === ReportTabButton.customer) {
      title = 'Tổng khách hệ thống offline';
    }
    if (activeTab === ReportTabButton.average) {
      title = 'GTTB/đơn hệ thống offline';
    }
    if (activeTab === ReportTabButton.crv) {
      if (crvType === CRVViewType.customer) {
        title = 'CRV khách tiếp hệ thống offline';
      }
      if (crvType === CRVViewType.lot) {
        title = 'CRV lốt đã tiếp hệ thống offline';
      }
    }
    return (
      <Typography
        type="h3"
        text={title}
        color={colors.secondary.o900}
        textType="medium"
      />
    );
  }, [activeTab, crvType]);

  const storeViewType = useMemo(() => {
    if (activeTab === ReportTabButton.customer) {
      return 'Tổng số khách mua';
    }
    if (activeTab === ReportTabButton.average) {
      return 'GTTB/đơn';
    }
    if (activeTab === ReportTabButton.crv) {
      if (crvType === CRVViewType.customer) {
        return 'Tổng số khách mua / Tổng số khách tiếp';
      }
      if (crvType === CRVViewType.lot) {
        return 'Tổng số lốt mua / Tổng số lốt tiếp';
      }
    }
    return 'Tổng doanh thu';
  }, [activeTab, crvType]);

  const onChangeCRVType = (type: CRVViewType) => {
    setCrvType(type);
  };

  let dataGapo = useMemo(() => {
    if (config && config.contactSupport) {
      return JSON.parse(config.contactSupport);
    } else {
      return {name: '', link: ''};
    }
  }, [config]);

  const hasPermission = useMemo(() => {
    if (errorType === 'NotPermissionReport') {
      return false;
    }
    return true;
  }, [errorType]);

  const handleSuccess = (report: ReportEmulationEntity) => {
    setErrorType(false);
    if (
      report.getViewType() === 'rsm' &&
      report.getReportEmulationItems().length === 0
    ) {
      onError('NotfoundReport', '');
      return;
    }
    if (report.getViewType() === 'am') {
      navigation.navigate(MainRouteConfig.ReportEmulationASM, {
        params: {...request},
      });
    }
    if (report.getViewType() === 'store') {
      navigation.navigate(MainRouteConfig.ReportEmulationPOS, {
        params: {...request},
      });
    }
    setReportEmulationEntity(report);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const onError = (code: ErrorType, message?: string) => {
    setErrorType(code);
    if (message) {
      setMsg(message);
    }
    setLoading(false);
  };

  const getData = (param: ReportQuery, viewType: string, tab: string) => {
    reportEmulationService.getReportData(
      param,
      profile?.code,
      tab,
      viewType,
      'rsm',
      handleSuccess,
      onError,
      () => setLoading(true),
      crvType,
      () => {},
    );
  };

  const onPressDetail = (viewName: string) => {
    navigation.navigate(MainRouteConfig.ReportEmulationASM, {
      params: {...request, pos_location_department_lv2: viewName},
    });
  };

  const handleChangeParam = useCallback(
    (query: ReportQuery, viewType: string) => {
      if (!firstLoad) {
        setRequest({
          ...query,
          from_date: query.from_date,
          to_date: query.to_date,
          view_type: viewType,
        });
        getData(query, viewType, activeTab);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab, firstLoad, crvType],
  );

  useEffect(() => {
    if (firstLoad && hasPermission) {
      getData(queryParam, ReportViewType.day, activeTab);
    }
    setFirstLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, firstLoad, queryParam, hasPermission]);

  if (!reportEmulationEntity) {
    return <View />;
  }

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.Container>
        <Layout.ScreenHeaderBack
          title={hasPermission ? 'Báo cáo theo miền' : 'Báo cáo thi đua'}
          onBackPress={() => navigation.navigate(MainRouteConfig.ReportRetail)}
          children={
            hasPermission &&
            !loading && (
              <View style={[ReportTabStyle.container]}>
                <ReportTabButtonView
                  idActive={activeTab}
                  onPress={setActiveTab}
                  isRevenue={true}
                />
              </View>
            )
          }
        />

        <React.Fragment>
          <Layout.Error align={AlignVerticalErrorEnum.center} error={errorType}>
            <View style={style.container}>
              {activeTab === ReportTabButton.crv && (
                <View style={style.switchTab}>
                  <SwitchTab
                    firstTabTitle="CRV Khách tiếp"
                    secondTabTitle="CRV Lốt đã tiếp"
                    firstTabValue={CRVViewType.customer}
                    secondTabValue={CRVViewType.lot}
                    onChangeCRVType={onChangeCRVType}
                  />
                </View>
              )}
              <View style={[style.param]}>
                <ReportRetailFilter
                  loading={loading}
                  pDate={queryParam.view_date}
                  pViewType={queryParam.view_type}
                  onPress={handleChangeParam}
                />
              </View>
              <Layout.Loading loading={loading} position="top">
                <Layout.Error subTitle={msg} error={errorType}>
                  <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}>
                    <View style={style.store}>
                      <Image style={style.iconStore} source={iconSource} />
                      <View style={style.storeRight}>
                        <View style={style.storeName}>
                          <Typography
                            text={storeView}
                            color={colors.secondary.o500}
                            type="h3"
                          />
                        </View>
                        <View style={style.storeViewType}>
                          <Typography
                            text={storeViewType}
                            color={colors.secondary.o500}
                            type="h5"
                          />
                        </View>
                        <View style={style.storeValue}>
                          <Typography
                            text={reportEmulationEntity.getTotal(crvType)}
                            type="h3"
                            style={style.subText}
                            color={colors.primary.o500}
                            textType="medium"
                          />
                          {reportEmulationEntity.getGrowthRatioValue(
                            crvType,
                          ) ? (
                            reportEmulationEntity.getGrowthRatioValue(
                              crvType,
                            ) >= 0 ? (
                              <View
                                style={[
                                  style.storeGrowth,
                                  style.storeGrowth.tagUp,
                                ]}>
                                <Image source={ic_rp_up} />
                                <Typography
                                  type="h4"
                                  text={rateText}
                                  color={colors.success.o700}
                                  style={style.growth.down}
                                />
                              </View>
                            ) : (
                              <View
                                style={[
                                  style.storeGrowth,
                                  style.storeGrowth.tagDown,
                                ]}>
                                <Image source={ic_rp_down} />
                                <View>
                                  <Typography
                                    type="h4"
                                    text={rateText}
                                    color={colors.error.o500}
                                    style={style.growth.down}
                                  />
                                </View>
                              </View>
                            )
                          ) : (
                            <Image source={ic_attention} />
                          )}
                        </View>
                      </View>
                    </View>
                    <View style={style.title}>
                      <Typography text="XẾP HẠNG RSM" textType="medium" />
                      <View style={style.count}>
                        <Typography
                          type="h5"
                          text={StringUtils.format(
                            '{0} RSM',
                            reportEmulationEntity?.getReportEmulationItems()
                              .length,
                          )}
                          color={colors.blue.o75}
                          style={style.countText}
                        />
                      </View>
                    </View>
                    <ReportRankView
                      data={reportEmulationEntity.getReportEmulationItems()}
                      activeTab={activeTab}
                    />
                    <EmulationDetailView
                      data={reportEmulationEntity.getReportEmulationItems()}
                      activeTab={activeTab}
                      onPress={onPressDetail}
                    />
                  </Animated.ScrollView>
                </Layout.Error>
              </Layout.Loading>
            </View>
          </Layout.Error>
        </React.Fragment>
        <SafeAreaView edges={['bottom']} />
      </Layout.Container>
    </Layout.Screen>
  );
};

export default ReportEmulationRSMScreen;
