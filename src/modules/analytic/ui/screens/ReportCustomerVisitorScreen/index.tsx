import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, Text, View} from 'react-native';
import {Styles} from './style';
import CTLayout from 'components/CTLayout';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import CTStatusBar from 'components/CTStatusBar';
import {ic_right, icon_user} from 'assets/images';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import CustomerSupported from 'modules/analytic/ui/views/CustomerSupported';
import {Colors} from 'assets/colors';
import SamePeriodComponent from 'modules/analytic/ui/views/SamePeriodComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {MainRouteConfig} from 'config/RouteConfig';
import {CTButtonTextIcon} from 'components/Button';
import {ReportCustomerVisitorDetailService} from 'modules/analytic/services/ReportCustomerDetailService';
import {FormatDatePattern} from 'utils/DateUtils';
import moment from 'moment';
import {ReportCustomerDetailEntity} from 'modules/analytic/models/entities';
import NumberUtils from 'utils/NumberUtils';
import {MetricCustomer} from 'modules/analytic/enums';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'ReportCustomerVisitor'>;
const ReportCustomerVisitorScreen: React.FC<Props> = ({navigation, route}) => {
  const [date, setDate] = useState<Date>(new Date(route.params.view_date));
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<false | string>(false);
  const [reportCustomerDetail, setReportCustomerDetail] =
    useState<ReportCustomerDetailEntity>(new ReportCustomerDetailEntity());
  const {locationSelected} = useAuth();

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
      view_date: date,
      customer_metric_type: MetricCustomer.received,
    });
  };

  const getExpectDataAnalytic = (data: ReportCustomerDetailEntity) => {
    handleSuccess();
    setReportCustomerDetail(data);
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

  const getAnalyticData = useCallback(
    (beforeCallApi?: () => void) => {
      const reportCustomerService = new ReportCustomerVisitorDetailService();
      reportCustomerService.getReportCustomerDetail(
        {
          view_date: moment(date).format(FormatDatePattern['YYYY-MM-DD']),
          pos_location_name: locationSelected.locationName,
        },
        getExpectDataAnalytic,
        getError,
        beforeCallApi,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date, locationSelected],
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

  const titleGroupPrevious = (type: string, valueCompare: number) => {
    let title =
      type === 'month'
        ? 'Tính trung bình, số khách vào cửa hàng trong tháng này nhiều hơn tháng trước '
        : 'So với hôm qua, số khách vào cửa hàng hôm nay nhiều hơn ';
    if (valueCompare < 0) {
      title =
        type === 'month'
          ? 'Tính trung bình, số khách vào cửa hàng trong tháng này thấp hơn tháng trước '
          : 'So với hôm qua, số khách vào cửa hàng hôm nay thấp hơn ';

      valueCompare = Math.abs(valueCompare);
    }

    return (
      <Text>
        <CTTypography.Text style={Styles.descriptionPeriod} text={title} />
        <CTTypography.Text
          font={Font.Medium}
          style={Styles.descriptionPeriod}
          text={NumberUtils.formatNumber(valueCompare)}
        />
        <CTTypography.Text style={Styles.descriptionPeriod} text=" khách." />
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
  }, [handleBack, navigation]);

  return (
    <CTLayout.Container>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack
        title="Khách vào cửa hàng"
        onBackPress={handleBack}
      />
      <CTLayout.Body>
        <View style={Styles.container}>
          <CTLayout.LoadingView firstLoading={firstLoading || loading}>
            <CTLayout.ErrorView onReloadPress={onReloadPress} error={error}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <CustomerSupported
                  onChangeDate={onChangeDate}
                  date={date}
                  icon={icon_user}
                  title="KHÁCH VÀO CỬA HÀNG"
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
                        text="Số khách vào cửa hàng được đếm bởi chuyên viên tiếp đón. Dựa vào dữ liệu này, bạn có thể biết lưu lượng khách theo thời điểm của cửa hàng."
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
                      unit="khách"
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
                      unit="khách/ ngày"
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

export default ReportCustomerVisitorScreen;
