import {colors} from 'assets/v2';
import {DimentionUtils, Text, Typography} from 'common-ui';
import {ReportEntity} from 'modules/personalize/models';
import {homeService} from 'modules/personalize/services';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {ReportHomeStyle} from './style';
import {useAuth} from 'providers/contexts/AuthContext';
import {ThemeStyle} from 'assets/theme';
import {Colors} from 'assets/colors';
import personnelService from 'modules/personalize/services/PersonnelService';
import {ReportSaleOrderEntity} from 'modules/personalize/models/entities';
import {useReportTypeViewHook} from 'modules/personalize/hooks/useReportTypeViewHook';

const WIDTH = Dimensions.get('screen').width;
const PROGRESS_WIDTH = WIDTH - 128;

export interface ReportProps {}

export type ReportRef = {
  refresh: () => void;
};

export type ReportHome = ForwardRefRenderFunction<ReportRef, ReportProps>;

const ReportView: ReportHome = ({}, ref) => {
  const [isLoad, setLoad] = useState<boolean>(true);
  const [isLoadSale, setIsLoadSale] = useState<boolean>(true);
  const [isLoadSaleStore, setIsLoadSaleStore] = useState<boolean>(true);
  const {locationSelected, locations, profile} = useAuth();
  const [report, setReport] = useState<ReportEntity>(new ReportEntity());
  const [reportSale, setReportSale] = useState<ReportSaleOrderEntity>(
    ReportSaleOrderEntity.createEmpty(),
  );
  const [reportSaleStore, setReportSaleStore] = useState<ReportSaleOrderEntity>(
    ReportSaleOrderEntity.createEmpty(),
  );
  const {viewGeneral, viewPersonal} = useReportTypeViewHook();
  console.log('viewGeneral,viewPersonal', viewGeneral, viewPersonal);

  const onRefresh = () => {
    setLoad(true);
    setIsLoadSale(true);
    setIsLoadSaleStore(true);
  };

  useImperativeHandle(ref, () => ({
    refresh: onRefresh,
  }));

  const onReportSuccess = useCallback((reportResult: ReportEntity) => {
    setReport(reportResult);
  }, []);

  const onFinalReport = useCallback(() => {
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (isLoadSale && profile?.code) {
      const storeIds =
        locationSelected.locationId !== -1
          ? locationSelected.locationId.toString()
          : locations.map(e => e.id).join(',');
      personnelService.getReportSale(
        {
          assigneeCode: viewPersonal ? profile.code.toUpperCase() : undefined,
          listStoreId: storeIds,
        },
        (entity: ReportSaleOrderEntity) => {
          setReportSale(entity);
          setIsLoadSale(false);
        },
        () => {},
        () => {},
        () => {
          setIsLoadSale(false);
        },
      );
    }
  }, [
    isLoadSale,
    viewPersonal,
    locationSelected.locationId,
    locations,
    profile,
  ]);

  useEffect(() => {
    if (isLoadSaleStore && viewPersonal) {
      const storeIds =
        locationSelected.locationId !== -1
          ? locationSelected.locationId.toString()
          : locations.map(e => e.id).join(',');
      personnelService.getReportSale(
        {
          listStoreId: storeIds,
        },
        (entity: ReportSaleOrderEntity) => {
          setReportSaleStore(entity);
          setIsLoadSaleStore(false);
        },
        () => {},
        () => {},
        () => {},
      );
    }
  }, [isLoadSaleStore, locationSelected.locationId, locations, viewPersonal]);

  useEffect(() => {
    if (isLoad) {
      homeService.getReport(locationSelected, onReportSuccess, onFinalReport);
    }
  }, [isLoad, locationSelected, onFinalReport, onReportSuccess]);

  useEffect(() => {
    setLoad(true);
    setIsLoadSale(true);
  }, [locationSelected]);

  const ReportScoreCard = (
    <>
      {viewGeneral && (
        <React.Fragment>
          <View style={ReportHomeStyle.row1}>
            <Typography
              text="DOANH THU CỬA HÀNG HÔM NAY"
              textType="medium"
              type="h5"
              color={colors.secondary.o500}
              style={{paddingTop: DimentionUtils.scale(4)}}
            />
          </View>
          <>
            {isLoadSale ? (
              <View style={ReportHomeStyle.loadingView}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <>
                <View style={ReportHomeStyle.row2}>
                  <Typography
                    text={reportSale.getSalesToday()}
                    textType="medium"
                    type="h2"
                    color={colors.primary.o600}
                  />
                </View>
                <View style={[ThemeStyle.separator, ReportHomeStyle.mt16]} />
                <View style={ReportHomeStyle.rowProgress}>
                  <View
                    style={[ReportHomeStyle.progress, {width: PROGRESS_WIDTH}]}>
                    {/* Doanh thu dự kiến cửa hàng */}
                    <View
                      style={[
                        ReportHomeStyle.progressValue,
                        {
                          backgroundColor: Colors.Secondary,
                          width:
                            reportSale.getWidthMonthForecast(PROGRESS_WIDTH),
                        },
                        PROGRESS_WIDTH ===
                          reportSale.getWidthMonthForecast(PROGRESS_WIDTH) && {
                          borderRadius: DimentionUtils.scale(4),
                        },
                      ]}
                    />
                    {/* Tiến độ cửa hàng */}
                    <View
                      style={[
                        ReportHomeStyle.progressValue,
                        {
                          backgroundColor: colors.primary.o700,
                          width: reportSale.getWidthSalesMtd(PROGRESS_WIDTH),
                        },
                        PROGRESS_WIDTH ===
                          reportSale.getWidthSalesMtd(PROGRESS_WIDTH) && {
                          borderRadius: DimentionUtils.scale(4),
                        },
                      ]}
                    />
                  </View>
                  <View style={ReportHomeStyle.progressRate}>
                    <Typography
                      text={reportSale.getSaleRatio()}
                      textType="medium"
                      color={colors.primary.o600}
                    />
                  </View>
                </View>
                <View style={ReportHomeStyle.rowProgress2}>
                  <Typography
                    text="Tiến độ cửa hàng: "
                    color={colors.primary.o600}
                    textType="medium"
                    type="h5"
                  />
                  <Typography
                    text={reportSale.getSalesMtd()}
                    color={colors.primary.o600}
                    textType="medium"
                    type="h5"
                  />
                  <Typography
                    text=" / "
                    color={colors.primary.o600}
                    textType="medium"
                    type="h5"
                  />
                  <Typography
                    text={reportSale.getSalesTarget()}
                    color={colors.primary.o600}
                    textType="medium"
                    type="h5"
                  />
                </View>
                <View style={ReportHomeStyle.rowProgress3}>
                  <Typography
                    text="Doanh thu dự kiến: "
                    color={colors.warning.o500}
                    type="h5"
                    textType="medium"
                  />
                  <Typography
                    text={reportSale.getSalesMonthForecast()}
                    color={colors.warning.o500}
                    type="h5"
                    textType="medium"
                  />
                  <Typography
                    text={reportSale.getSalesMonthForecastRatio()}
                    color={colors.warning.o500}
                    type="h5"
                    textType="medium"
                  />
                </View>
              </>
            )}
          </>
          <View style={[ThemeStyle.separator]} />
        </React.Fragment>
      )}
      {viewPersonal && reportSale.getSalesTargetValue() !== 0 && (
        <React.Fragment>
          <View style={ReportHomeStyle.row1}>
            <Typography
              text="DOANH THU CỦA BẠN HÔM NAY"
              textType="medium"
              type="h5"
              color={colors.secondary.o500}
            />
          </View>
          <>
            {isLoadSale ? (
              <View style={ReportHomeStyle.loadingView}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <>
                <View style={ReportHomeStyle.row2}>
                  <Typography
                    text={reportSale.getSalesToday()}
                    textType="medium"
                    type="h2"
                    color={colors.primary.o600}
                  />
                </View>
                <View style={ReportHomeStyle.row3}>
                  <Typography
                    text="Tiến độ cửa hàng: "
                    type="h5"
                    color={colors.secondary.o400}
                  />
                  <Typography
                    text={reportSaleStore.getSalesMtd()}
                    type="h5"
                    color={colors.secondary.o400}
                  />
                  <Typography
                    text={reportSaleStore.getSaleRatio()}
                    type="h5"
                    color={colors.secondary.o400}
                  />
                </View>
                <View style={[ThemeStyle.separator, ReportHomeStyle.mt16]} />
                <View style={ReportHomeStyle.rowProgress}>
                  <View
                    style={[ReportHomeStyle.progress, {width: PROGRESS_WIDTH}]}>
                    {/* Doanh thu dự kiến cửa hàng */}
                    <View
                      style={[
                        ReportHomeStyle.progressValue,
                        {
                          backgroundColor: Colors.Secondary,
                          width:
                            reportSale.getWidthMonthForecast(PROGRESS_WIDTH),
                        },
                        PROGRESS_WIDTH ===
                          reportSale.getWidthMonthForecast(PROGRESS_WIDTH) && {
                          borderRadius: DimentionUtils.scale(4),
                        },
                      ]}
                    />
                    <View
                      style={[
                        ReportHomeStyle.progressValue,
                        {
                          backgroundColor: colors.primary.o700,
                          width: reportSale.getWidthSalesMtd(PROGRESS_WIDTH),
                        },
                        PROGRESS_WIDTH ===
                          reportSale.getWidthSalesMtd(PROGRESS_WIDTH) && {
                          borderRadius: DimentionUtils.scale(4),
                        },
                      ]}
                    />
                  </View>
                  <View style={ReportHomeStyle.progressRate}>
                    <Typography
                      text={reportSale.getSaleRatio()}
                      textType="medium"
                      color={colors.primary.o600}
                    />
                  </View>
                </View>
                <View style={ReportHomeStyle.rowProgress2}>
                  <Typography
                    text="Tiến độ của bạn: "
                    color={colors.primary.o600}
                    textType="medium"
                    type="h5"
                  />
                  <Typography
                    text={reportSale.getSalesMtd()}
                    color={colors.primary.o600}
                    textType="medium"
                    type="h5"
                  />
                  <Typography
                    text=" / "
                    color={colors.primary.o600}
                    textType="medium"
                    type="h5"
                  />
                  <Typography
                    text={reportSale.getSalesTarget()}
                    color={colors.primary.o600}
                    textType="medium"
                    type="h5"
                  />
                </View>
                <View style={ReportHomeStyle.rowProgress3}>
                  <Typography
                    text="Doanh thu dự kiến: "
                    color={colors.warning.o500}
                    type="h5"
                    textType="medium"
                  />
                  <Typography
                    text={reportSale.getSalesMonthForecast()}
                    color={colors.warning.o500}
                    type="h5"
                    textType="medium"
                  />
                  <Typography
                    text={reportSale.getSalesMonthForecastRatio()}
                    color={colors.warning.o500}
                    type="h5"
                    textType="medium"
                  />
                </View>
              </>
            )}
          </>
          <View style={[ThemeStyle.separator]} />
        </React.Fragment>
      )}
    </>
  );

  const viewToday = useMemo(() => {
    if (!viewGeneral && !viewPersonal) {
      return true;
    }
    if (viewPersonal && reportSale.getSalesTargetValue() === 0) {
      return true;
    }
    return false;
  }, [reportSale, viewGeneral, viewPersonal]);

  return (
    <View style={ReportHomeStyle.container}>
      {ReportScoreCard}
      {isLoad ? (
        <View style={ReportHomeStyle.loadingView}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          {viewToday && (
            <View style={ReportHomeStyle.header}>
              <View style={ReportHomeStyle.headerLeft}>
                <Typography
                  type="h5"
                  color={colors.secondary.o500}
                  textType="medium"
                  text="TỔNG DOANH THU HÔM NAY"
                  style={ReportHomeStyle.textTotal}
                />
                {!isLoad && (
                  <View style={ReportHomeStyle.rowTotalSale}>
                    <Text
                      size={24}
                      color={colors.primary.o500}
                      fontWeight="700"
                      text={report.getTotalSalesPosO2o()}
                    />
                  </View>
                )}
              </View>
            </View>
          )}

          <ScrollView
            style={[
              ReportHomeStyle.rowInfo,
              !viewGeneral && !viewPersonal && {paddingTop: 0},
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <View style={ReportHomeStyle.colInfo}>
              <Typography
                type="h4"
                color={colors.secondary.o500}
                text="Doanh thu thực tế"
              />
              <Typography
                style={ReportHomeStyle.txtValueInfo}
                type="h3"
                textType="medium"
                color={colors.primary.o500}
                text={report.getTotalSale()}
              />
            </View>
            <View style={ReportHomeStyle.colInfo}>
              <Typography
                type="h4"
                color={colors.secondary.o500}
                text="Doanh thu dự kiến O2O"
              />
              <Typography
                style={ReportHomeStyle.txtValueInfo}
                type="h3"
                textType="medium"
                color={colors.primary.o500}
                text={report.getPreTotalSalesO2o()}
              />
            </View>
            <View style={ReportHomeStyle.colInfo}>
              <Typography
                type="h4"
                color={colors.secondary.o500}
                text="Số đơn bán"
              />
              <Typography
                style={ReportHomeStyle.txtValueInfo}
                type="h3"
                textType="medium"
                color={colors.primary.o500}
                text={report.getOrderCount()}
              />
            </View>
            <View style={ReportHomeStyle.colInfo}>
              <Typography
                type="h4"
                color={colors.secondary.o500}
                text="Số đơn trả"
              />
              <Typography
                type="h3"
                textType="medium"
                style={ReportHomeStyle.txtValueInfo}
                color={colors.primary.o500}
                text={report.getReturnCount()}
              />
            </View>
            <View style={ReportHomeStyle.colInfo}>
              <Typography
                type="h4"
                color={colors.secondary.o500}
                text="GTTB/đơn"
              />
              <Typography
                type="h3"
                textType="medium"
                style={ReportHomeStyle.txtValueInfo}
                color={colors.primary.o500}
                text={report.getAverageOrderValue()}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default forwardRef(ReportView);
