import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, Text, View} from 'react-native';
import {Styles} from './style';
import CTLayout from 'components/CTLayout';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import CTStatusBar from 'components/CTStatusBar';
import {icon_user, ic_right} from 'assets/images';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import CustomerSupported from 'modules/analytic/ui/views/CustomerSupported';
import SamePeriodComponent from 'modules/analytic/ui/views/SamePeriodComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {StringUtils} from 'common';
import {FormatDatePattern} from 'utils/DateUtils';
import moment from 'moment';
import {ReportCustomerDetailEntity} from 'modules/analytic/models/entities';
import {ReportCustomerBuyDetailService} from 'modules/analytic/services';
import {MainRouteConfig} from 'config/RouteConfig';
import {CTButtonTextIcon} from 'components/Button';
import {MetricCustomer} from 'modules/analytic/enums';
import {Colors} from 'assets/colors';
import {DateFormatPattern} from 'common/enums';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'ReportCustomerDetail'>;
const ReportCustomerDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const [date, setDate] = useState<Date>(new Date(route.params.view_date));
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<false | string>(false);
  const {locationSelected} = useAuth();
  const [reportCustomerDetail, setReportCustomerDetail] =
    useState<ReportCustomerDetailEntity>(new ReportCustomerDetailEntity());
  useEffect(() => {
    if (route.params && route.params.view_date) {
      setDate(new Date(route.params.view_date));
    }
  }, [route.params]);
  const onChangeDate = (val: Date) => {
    setDate(val);
  };

  const handleClickDetailEmployee = () => {
    navigation.navigate(MainRouteConfig.ConversionEachAssignee, {
      view_date: moment(date).format(DateFormatPattern.YYYYMMDD),
      customer_metric_type: MetricCustomer.customer,
    });
  };

  const getExpectDataAnalytic = useCallback(
    (data: ReportCustomerDetailEntity) => {
      handleSuccess();
      setReportCustomerDetail(data);
    },
    [],
  );

  const handleSuccess = () => {
    setFirstLoading(false);
    setLoading(false);
  };

  const handleError = (err: string) => {
    setFirstLoading(false);
    setLoading(false);
    setError(err);
  };

  const getError = useCallback((err: string) => {
    handleError(err);
  }, []);

  const getAnalyticData = useCallback(
    (beforeCallApi?: () => void) => {
      const reportCustomerBuyDetailService =
        new ReportCustomerBuyDetailService();
      reportCustomerBuyDetailService.getReportCustomerDetail(
        {
          view_date: moment(date).format(FormatDatePattern['YYYY-MM-DD']),
          pos_location_name: locationSelected.locationName,
        },
        getExpectDataAnalytic,
        getError,
        beforeCallApi,
      );
    },
    [date, getError, getExpectDataAnalytic, locationSelected.locationName],
  );

  useEffect(() => {
    if (firstLoading) {
      getAnalyticData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstLoading) {
      getAnalyticData(() => {
        setLoading(true);
      });
    }
  }, [firstLoading, getAnalyticData]);

  const onReloadPress = () => {
    getAnalyticData(() => {
      setError(false);
      setLoading(true);
    });
  };
  const titleGroupPrevious = (type: string, compareValue: number) => {
    let title =
      type === 'month'
        ? 'Tính trung bình, số khách mua hàng tại cửa hàng trong tháng này đã nhiều hơn tháng trước '
        : 'So với hôm qua, số khách mua hàng tại cửa hàng hôm nay đã nhiều hơn ';
    if (compareValue < 0) {
      title =
        type === 'month'
          ? 'Tính trung bình, số khách mua hàng tại cửa hàng trong tháng này thấp hơn tháng trước '
          : 'So với hôm qua, số khách mua hàng tại cửa hàng hôm nay thấp hơn ';

      compareValue = Math.abs(compareValue);
    }

    return (
      <Text>
        <CTTypography.Text style={Styles.descriptionPeriod} text={title} />
        <CTTypography.Text
          font={Font.Medium}
          style={Styles.descriptionPeriod}
          text={StringUtils.format('{0} ', compareValue)}
        />
        <CTTypography.Text style={Styles.descriptionPeriod} text="khách." />
      </Text>
    );
  };

  const handleBack = useCallback(() => {
    navigation.navigate(MainRouteConfig.ReportCustomer, {
      view_date: date,
    });
    return true;
  }, [date, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );

    return () => backHandler.remove();
  }, [handleBack]);

  return (
    <CTLayout.Container>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack title="Khách mua hàng" onBackPress={handleBack} />
      <CTLayout.Body>
        <View style={Styles.container}>
          <CTLayout.LoadingView firstLoading={firstLoading || loading}>
            <CTLayout.ErrorView onReloadPress={onReloadPress} error={error}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <CustomerSupported
                  onChangeDate={onChangeDate}
                  date={date}
                  icon={icon_user}
                  title="KHÁCH MUA HÀNG"
                  value={reportCustomerDetail.getTotalValue()}
                />
                <View style={Styles.container}>
                  <View style={Styles.header}>
                    <CTTypography.Text
                      font={Font.Medium}
                      level="2"
                      text="GIẢI THÍCH CHỈ SỐ"
                    />
                  </View>
                  <View style={Styles.body}>
                    <View style={Styles.description}>
                      <CTTypography.Text
                        style={Styles.descriptionText}
                        text="Số khách hàng mua hàng là số khách hàng có phát sinh đơn hàng và được tính toán bởi hệ thống Unicorn. Dựa vào số liệu này, bạn biết được hiệu suất tư vấn của cửa hàng và nhân viên."
                      />
                    </View>
                    <CTButtonTextIcon
                      style={Styles.displayNone}
                      // disabled
                      onPress={handleClickDetailEmployee}
                      icon={icon_user}
                      text="Chi tiết theo từng nhân viên"
                      iconColor={Colors.LightBlue}
                      iconTail={ic_right}
                      iconTailColor={Colors.Gray400}
                    />
                  </View>
                  <View style={Styles.header}>
                    <CTTypography.Text
                      font={Font.Medium}
                      level="2"
                      text="SO SÁNH CÙNG KỲ"
                    />
                  </View>
                  <View style={Styles.body}>
                    <SamePeriodComponent
                      type="day"
                      disPlayThisValue={reportCustomerDetail.getTotalToday()}
                      disPlayPreviousValue={reportCustomerDetail.getTotalYesterday()}
                      thisValue={reportCustomerDetail.getTotal()[1]}
                      previousValue={reportCustomerDetail.getTotal()[2]}
                      titleGroup={titleGroupPrevious(
                        'day',
                        reportCustomerDetail.getTotalCompareByDate(),
                      )}
                      unit="khách hàng"
                    />
                    <SamePeriodComponent
                      type="month"
                      disPlayThisValue={reportCustomerDetail.getThisMonth()}
                      disPlayPreviousValue={reportCustomerDetail.getLastMonth()}
                      thisValue={reportCustomerDetail.getTotal()[6]}
                      previousValue={reportCustomerDetail.getTotal()[7]}
                      titleGroup={titleGroupPrevious(
                        'month',
                        reportCustomerDetail.getCompareByMonth(),
                      )}
                      unit="khách hàng/ ngày"
                    />
                  </View>
                </View>
              </ScrollView>
            </CTLayout.ErrorView>
          </CTLayout.LoadingView>
        </View>
      </CTLayout.Body>
    </CTLayout.Container>
  );
};

export default ReportCustomerDetailScreen;
