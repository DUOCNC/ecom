import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {BackHandler, Text, View} from 'react-native';
import {ReportTabStyle, Styles} from './style';
import CTLayout from 'components/CTLayout';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import CTStatusBar from 'components/CTStatusBar';
import {icon_percent, icon_user, ic_right} from 'assets/images';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import CustomerSupported from 'modules/analytic/ui/views/CustomerSupported';
import SamePeriodRateComponent from 'modules/analytic/ui/views/SamePeriodRateComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {StringUtils} from 'common';
import {ReportCustomerDetailEntity} from 'modules/analytic/models/entities';
import moment from 'moment';
import {FormatDatePattern} from 'utils/DateUtils';
import NumberUtils from 'utils/NumberUtils';
import {ReportCustomerRateDetailService} from 'modules/analytic/services';
import {MainRouteConfig} from 'config/RouteConfig';
import {CTButtonTextIcon} from 'components/Button';
import {Colors} from 'assets/colors';
import {MetricCustomer} from 'modules/analytic/enums';
import ReportCustomerTabView from '../../views/ReportCustomerTabView';
import {ReportCustomerTab} from 'modules/analytic/enums/ReportConfig';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'ReportCustomerRate'>;
const ReportCustomerRateDetailScreen: React.FC<Props> = ({
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

  const [activeTab, setActiveTab] = useState<ReportCustomerTab>(
    ReportCustomerTab.receptionist,
  );

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
      const reportCustomerService = new ReportCustomerRateDetailService();
      reportCustomerService.getReportCustomerDetail(
        {
          view_date: moment(date).format(FormatDatePattern['YYYY-MM-DD']),
          pos_location_name: locationSelected.locationName,
          source: activeTab,
        },
        getExpectDataAnalytic,
        getError,
        beforeCallApi,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date, locationSelected, activeTab],
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

  const titleGroupPrevious = (
    type: string,
    thisValue: string,
    previousValue: string,
    compareValue: number,
  ) => {
    if (thisValue === '--') {
      return (
        <CTTypography.Text
          style={Styles.descriptionPeriod}
          text={StringUtils.format(
            'Vui lòng nhập số {0} {1}.',
            activeTab === ReportCustomerTab.receptionist
              ? 'khách vào cửa hàng'
              : 'khách đã tiếp',
            type === 'month' ? 'tháng này' : 'hôm nay',
          )}
        />
      );
    }
    let [title, value] = [
      type === 'month'
        ? 'Tính trung bình, tỷ lệ chuyển đổi tháng này của cửa hàng cao hơn tháng trước '
        : 'So với hôm qua, tỷ lệ chuyển đổi hôm nay đã tăng ',
      compareValue,
    ];
    if (value < 0) {
      title =
        type === 'month'
          ? 'Tính trung bình, tỷ lệ chuyển đổi tháng này của cửa hàng thấp hơn tháng trước '
          : 'So với hôm qua, tỷ lệ chuyển đổi hôm nay đã giảm ';
      value = Math.abs(value);
    }

    return (
      <Text>
        <CTTypography.Text style={Styles.descriptionPeriod} text={title} />
        <CTTypography.Text
          font={Font.Medium}
          style={Styles.descriptionPeriod}
          text={StringUtils.format('{0} ', NumberUtils.formatNumber(value))}
        />
        <CTTypography.Text style={Styles.descriptionPeriod} text="phần trăm." />
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

  const handleClickDetailEmployee = () => {
    navigation.navigate(MainRouteConfig.ConvertRateAssignee, {
      view_date: date,
      customer_metric_type: MetricCustomer.convert_rate,
    });
  };

  const formulaText = useMemo((): [string, string] => {
    if (activeTab === ReportCustomerTab.receptionist) {
      return [
        'Số khách mua / Số khách vào cửa hàng',
        'Bạn cần nhập đúng đủ số khách hàng vào cửa hàng để dữ liệu tỷ lệ chuyển đổi được chính xác.',
      ];
    }
    return [
      'Số khách mua / Số khách đã tiếp',
      'Dữ liệu này sẽ cho bạn biết hiệu quả tư vấn của cửa hàng và của từng nhân viên.',
    ];
  }, [activeTab]);

  return (
    <CTLayout.Container>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack
        title="Tỷ lệ chuyển đổi"
        onBackPress={handleBack}
        bottom={
          <View style={[ReportTabStyle.container]}>
            <ReportCustomerTabView
              idActive={activeTab}
              onPress={setActiveTab}
            />
          </View>
        }
      />
      <CTLayout.Body>
        <View style={Styles.container}>
          <CTLayout.LoadingView firstLoading={firstLoading || loading}>
            <CTLayout.ErrorView onReloadPress={onReloadPress} error={error}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <CustomerSupported
                  onChangeDate={onChangeDate}
                  date={date}
                  icon={icon_percent}
                  title="TỶ LỆ CHUYỂN ĐỔI"
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
                        text="Tỷ lệ chuyển đổi được tính theo công thức:"
                      />
                      <CTTypography.Text
                        style={Styles.descriptionItalicText}
                        font={Font.Medium}
                        text={formulaText[0]}
                      />
                      <CTTypography.Text
                        style={Styles.descriptionText}
                        text={formulaText[1]}
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
                    <SamePeriodRateComponent
                      type="day"
                      thisValue={reportCustomerDetail.getTotalToday()}
                      previousValue={reportCustomerDetail.getTotalYesterday()}
                      titleGroup={titleGroupPrevious(
                        'day',
                        reportCustomerDetail.getTotalToday(),
                        reportCustomerDetail.getTotalYesterday(),
                        reportCustomerDetail.getTotalCompareByDate(),
                      )}
                      unit="phần trăm"
                      data={reportCustomerDetail}
                    />
                    <SamePeriodRateComponent
                      type="month"
                      thisValue={reportCustomerDetail.getTotalThisMonth()}
                      previousValue={reportCustomerDetail.getTotalLastMonth()}
                      titleGroup={titleGroupPrevious(
                        'month',
                        reportCustomerDetail.getTotalThisMonth(),
                        reportCustomerDetail.getTotalLastMonth(),
                        reportCustomerDetail.getTotalCompareByMonth(),
                      )}
                      unit="phần trăm"
                      data={reportCustomerDetail}
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

export default ReportCustomerRateDetailScreen;
