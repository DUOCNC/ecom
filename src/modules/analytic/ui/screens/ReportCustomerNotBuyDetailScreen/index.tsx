import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {BackHandler, Text, View} from 'react-native';
import {Styles} from './style';
import CTLayout from 'components/CTLayout';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import CTStatusBar from 'components/CTStatusBar';
import {icon_user} from 'assets/images';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import CustomerSupported from 'modules/analytic/ui/views/CustomerSupported';
import {Colors} from 'assets/colors';
import SamePeriodComponent from 'modules/analytic/ui/views/SamePeriodComponent';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {FormatDatePattern} from 'utils/DateUtils';
import {ReportCustomerNotBuyDetailService} from 'modules/analytic/services';
import {ReportCustomerDetailEntity} from 'modules/analytic/models/entities';
import {MainRouteConfig} from 'config/RouteConfig';
import {StringUtils} from 'common';
import NumberUtils from 'utils/NumberUtils';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'ReportCustomerNotBuy'>;
const ReportCustomerNotBuyDetailScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const [date, setDate] = useState<Date>(new Date(route.params.view_date));
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<false | string>(false);
  const {locationSelected} = useAuth();
  const [reportCustomerDetail, setReportCustomerDetail] =
    useState<ReportCustomerDetailEntity>(new ReportCustomerDetailEntity());

  const onChangeDate = (val: Date) => {
    setDate(val);
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
      const reportCustomerService = new ReportCustomerNotBuyDetailService();
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

  const titleGroupPrevious = (type: string, compareValue: number) => {
    let title =
        'Trời ơi, khách không mua hàng tại cửa hàng hôm nay đã tăng lên tận ',
      titleEnd = 'khách so với hôm qua.';
    if (type === 'month') {
      title =
        'Trời ơi, tính trung bình khách không mua hàng tại cửa hàng tháng này đã tăng lên tận ';
      titleEnd = 'khách/ ngày so với tháng trước.';
    }
    if (compareValue < 0) {
      title =
        'Thật tuyệt vời, khách không mua hàng tại cửa hàng hôm nay đã giảm ';

      if (type === 'month') {
        title =
          'Thật tuyệt vời, tính trung bình khách không mua hàng tại cửa hàng trong tháng này ít hơn ';
      }

      compareValue = Math.abs(compareValue);
    }

    return (
      <Text>
        <CTTypography.Text style={Styles.descriptionPeriod} text={title} />
        <CTTypography.Text
          font={Font.Medium}
          style={Styles.descriptionPeriod}
          text={StringUtils.format(
            '{0} ',
            NumberUtils.formatNumber(compareValue),
          )}
        />
        <CTTypography.Text style={Styles.descriptionPeriod} text={titleEnd} />
      </Text>
    );
  };

  const missRevenue = useMemo(() => {
    const totalMiss = reportCustomerDetail.getTotal()[5];
    if (!totalMiss) {
      return <View />;
    }
    return (
      <Text>
        <CTTypography.Text
          text="Trời ơi! Cửa hàng đã đánh rơi tận "
          style={Styles.descriptionText}
        />
        <CTTypography.Text
          text={reportCustomerDetail.getTotalMissRevenue()}
          font={Font.Medium}
          style={{color: Colors.Error500}}
        />
        <CTTypography.Text
          style={Styles.descriptionText}
          text=" doanh thu rồi. Cố gắng lên nào!"
        />
      </Text>
    );
  }, [reportCustomerDetail]);

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
      <CTLayout.HeaderBack title="Khách không mua" onBackPress={handleBack} />
      <CTLayout.Body>
        <View style={Styles.container}>
          <CTLayout.LoadingView firstLoading={firstLoading || loading}>
            <CTLayout.ErrorView onReloadPress={onReloadPress} error={error}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <CustomerSupported
                  onChangeDate={onChangeDate}
                  date={date}
                  icon={icon_user}
                  title="KHÁCH KHÔNG MUA"
                  value={reportCustomerDetail.getTotalValue()}
                  description={missRevenue}
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
                        text="Số khách không mua hàng hiện tại được tính bằng số khách vào cửa hàng trừ đi số khách mua hàng."
                      />
                      <CTTypography.Text
                        style={Styles.descriptionText}
                        text="Số doanh thu bạn đánh rơi được tính bằng giá trị trung bình khách nhân với số khách không mua hàng."
                      />
                    </View>
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
                      disPlayThisValue={reportCustomerDetail.getTotalThisMonth()}
                      disPlayPreviousValue={reportCustomerDetail.getTotalLastMonth()}
                      thisValue={reportCustomerDetail.getTotal()[3]}
                      previousValue={reportCustomerDetail.getTotal()[4]}
                      titleGroup={titleGroupPrevious(
                        'month',
                        reportCustomerDetail.getTotalCompareByMonth(),
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

export default ReportCustomerNotBuyDetailScreen;
