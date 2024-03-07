import {
  bg_salary,
  ic_customer_buy,
  ic_customer_not_buy,
  ic_customer_rate,
  ic_customer_received,
  ic_customer_vistor,
} from 'assets/images';
import {DateFormatPattern} from 'common/enums';
import {Font} from 'components/Base/Text/enums';
import CTLayout from 'components/CTLayout';
import EmptyState from 'components/CTScreen/EmptyState';
import CTStatusBar from 'components/CTStatusBar';
import CTTypography from 'components/CTTypography';
import {BottomMainConfig, MainRouteConfig} from 'config/RouteConfig';
import {ReportCustomerMetricScreenConfig} from 'modules/analytic/config';
import {MetricCustomer} from 'modules/analytic/enums';
import {
  CustomerVisitorEntity,
  ReportCustomerEntity,
} from 'modules/analytic/models/entities';
import {CustomerVisitorService} from 'modules/analytic/services';
import ReportCustomerService from 'modules/analytic/services/ReportCustomerService';
import moment from 'moment';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {FormatDatePattern} from 'utils/DateUtils';
import {CustomerDateView} from '../../views/Customer';
import CustomerMetric from '../../views/Customer/CustomerMetric';
import {Styles} from './style';
import Decentralization from 'config/Decentralization/Decentralization';
import ExpectedSalaryStyle from 'modules/personalize/ui/screens/ExpectedSalaryScreen/style';
import StringUtils from '../../../../../common/utils/StringUtils';
import {useAuth} from 'providers/contexts/AuthContext';
type Props = MainStackScreenProps<'ReportCustomer'>;

const ReportCustomerScreen: React.FC<Props> = ({navigation, route}) => {
  const {locationSelected} = useAuth();
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState<false | string>(false);
  const [reportCustomer, setReportCustomer] = useState<ReportCustomerEntity>(
    new ReportCustomerEntity(),
  );
  const {profile} = useAuth();
  const decentralization = new Decentralization(profile?.positionId ?? -1);
  useEffect(() => {
    if (route.params && route.params.view_date) {
      setDate(new Date(route.params.view_date));
    }
  }, [route.params]);

  useLayoutEffect(() => {
    setFirstLoading(false);
  }, [navigation]);

  const handleChangeDate = (value: Date) => {
    setDate(value);
  };

  const handleClickMetric = (metricType: string) => {
    const params = {
      customer_metric_type: metricType,
      view_date: moment(date).format(DateFormatPattern.YYYYMMDD),
    };
    const reportCustomerMetricScreenConfig =
      ReportCustomerMetricScreenConfig.find(e => e.type === metricType);

    navigation.navigate(
      reportCustomerMetricScreenConfig?.screen ??
        MainRouteConfig.ReportCustomerDetail,
      params,
    );
  };

  const handleSuccess = () => {
    setFirstLoading(false);
    setLoading(false);
  };

  const handleError = (err: string) => {
    setFirstLoading(false);
    setLoading(false);
    setError(err);
  };

  const getError = (err: string) => {
    handleError(err);
  };

  const getExpectDataAnalytic = (data: ReportCustomerEntity) => {
    handleSuccess();
    setReportCustomer(data);
  };

  const getAnalyticData = useCallback(
    (
      customerVisitorEntity: CustomerVisitorEntity,
      customerReceived: CustomerVisitorEntity,
    ) => {
      ReportCustomerService.getReportCustomer(
        {
          view_date: moment(date).format(FormatDatePattern['YYYY-MM-DD']),
          pos_location_name: locationSelected.locationName,
        },
        customerVisitorEntity,
        customerReceived,
        getExpectDataAnalytic,
        getError,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date, locationSelected],
  );

  const getExpectData = (
    customerVisitorEntity: CustomerVisitorEntity,
    customerReceived: CustomerVisitorEntity,
  ) => {
    getAnalyticData(customerVisitorEntity, customerReceived);
  };

  const getData = useCallback(
    (beforeCallApi?: () => void) => {
      CustomerVisitorService.getCustomerVisitor(
        {
          from_date: moment(date).format(FormatDatePattern['YYYY-MM-DD']),
          to_date: moment(date).format(FormatDatePattern['YYYY-MM-DD']),
          pos_location_name: locationSelected.locationName,
        },
        getExpectData,
        getError,
        beforeCallApi,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date, locationSelected.locationName],
  );

  const onReloadPress = () => {
    getData(() => {
      setError(false);
      setLoading(true);
    });
  };

  useEffect(() => {
    if (firstLoading) {
      getData(() => {
        setError(false);
        setLoading(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstLoading) {
      getData(() => {
        setLoading(true);
      });
    }
  }, [firstLoading, getData]);

  const SubCustomerNotBuy = useMemo(() => {
    if (reportCustomer.getCustomerNotBuyValue() === 0) {
      return (
        <CTTypography.Text
          style={Styles.textFooter}
          level="3"
          text="Tuyệt vời, bạn đã không đánh rơi khách hàng nào!"
        />
      );
    }

    if (reportCustomer.getCustomerNotBuy() === '--') {
      return (
        <CTTypography.Text
          style={Styles.textFooter}
          level="3"
          text="Có vẻ như bạn đã quên nhập số khách vào cửa hàng mất rồi!"
        />
      );
    }
    if (reportCustomer.getTotalMissRevenueValue() === 0) {
      return <View />;
    }

    return (
      <Text>
        <CTTypography.Text
          style={Styles.textFooter}
          level="3"
          text="Bạn đã đánh rơi tận "
        />
        <CTTypography.Text
          style={Styles.valueRevenue}
          level="3"
          text={reportCustomer.getTotalMissRevenue()}
          font={Font.Medium}
        />
        <CTTypography.Text
          style={Styles.textFooter}
          level="3"
          text=" doanh thu rồi!"
        />
      </Text>
    );
  }, [reportCustomer]);

  const warningCustomerRate = useMemo(() => {
    if (reportCustomer.getCustomerRate() === '--') {
      return true;
    }
    return false;
  }, [reportCustomer]);

  return (
    <CTLayout.Container>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack
        title="Chuyển đổi khách hàng"
        onBackPress={() => {
          navigation.navigate(BottomMainConfig.Home);
        }}
      />

      {decentralization.isViewConvertScreen() ? (
        <CTLayout.Body>
          <View style={Styles.container}>
            <View style={Styles.body}>
              <CTLayout.LoadingView firstLoading={firstLoading || loading}>
                <CTLayout.ErrorView onReloadPress={onReloadPress} error={error}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={Styles.filter}>
                      <CustomerDateView
                        date={date}
                        title="TỔNG QUAN"
                        onChange={handleChangeDate}
                      />
                    </View>
                    <CustomerMetric
                      icon={ic_customer_vistor}
                      textHeader="Vào cửa hàng"
                      type={MetricCustomer.visitor}
                      value={reportCustomer.getCustomerVisitor()}
                      unit="khách hàng"
                      onPress={handleClickMetric}
                    />
                    <CustomerMetric
                      icon={ic_customer_received}
                      textHeader="Đã tiếp"
                      type={MetricCustomer.received}
                      value={reportCustomer.getCustomerReceived()}
                      unit="khách hàng"
                      onPress={handleClickMetric}
                    />

                    <CustomerMetric
                      icon={ic_customer_buy}
                      textHeader="Mua hàng"
                      type={MetricCustomer.customer}
                      value={reportCustomer.getCustomer()}
                      unit="khách hàng"
                      onPress={handleClickMetric}
                    />
                    <CustomerMetric
                      icon={ic_customer_rate}
                      textHeader="Tỷ lệ chuyển đổi"
                      type={MetricCustomer.convert_rate}
                      value={reportCustomer.getCustomerRate()}
                      unit="phần trăm"
                      onPress={handleClickMetric}
                      children={
                        <CTTypography.Text
                          style={Styles.textFooter}
                          level="3"
                          text={
                            warningCustomerRate
                              ? ' Có vẻ như bạn đã quên nhập số khách vào cửa hàng mất rồi!'
                              : 'Tỷ lệ chuyển đổi theo số khách hàng mua hàng trên số khách vào cửa hàng.'
                          }
                        />
                      }
                    />
                    <CustomerMetric
                      icon={ic_customer_not_buy}
                      textHeader="Không mua"
                      type={MetricCustomer.customer_not_buy}
                      value={reportCustomer.getCustomerNotBuy()}
                      unit="khách hàng"
                      onPress={handleClickMetric}
                      children={SubCustomerNotBuy}
                    />
                  </ScrollView>
                </CTLayout.ErrorView>
              </CTLayout.LoadingView>
            </View>
          </View>
        </CTLayout.Body>
      ) : (
        <View
          style={[ExpectedSalaryStyle.container, ExpectedSalaryStyle.center]}>
          <EmptyState
            icon={bg_salary}
            title={StringUtils.format(
              'Vị trí {0} của bạn chưa hỗ trợ xem tỷ lệ chuyển đổi khách hàng',
              profile?.position,
            )}
          />
        </View>
      )}
    </CTLayout.Container>
  );
};

export default ReportCustomerScreen;
