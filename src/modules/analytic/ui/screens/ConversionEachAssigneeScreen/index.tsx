import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import CTLayout from 'components/CTLayout';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import CTStatusBar from 'components/CTStatusBar';
import {icon_user} from 'assets/images';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import CTFLastList from 'components/CTFlatList';
import AssigneeLineItem from '../../views/AssigneeLineItemView';
import CustomerSupported from '../../views/CustomerSupported';
import {ConversionCustomerDetailStyle} from './style';
import {MainRouteConfig} from 'config/RouteConfig';
import {FormatDatePattern} from 'utils/DateUtils';
import {CustomerVisitorService} from 'modules/analytic/services';
import moment from 'moment';
import {
  CustomerVisitorEntity,
  ReportAssigneeEntity,
} from 'modules/analytic/models/entities';
import {ReportCustomerTab} from 'modules/analytic/enums/ReportConfig';
import customerVisitorService from 'modules/analytic/services/CustomerVisitorService';
import {Colors} from 'assets/colors';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'ConversionEachAssignee'>;
const ConversionEachAssigneeScreen: React.FC<Props> = ({navigation, route}) => {
  const [date, setDate] = useState<Date>(new Date(route.params.view_date));
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<false | string>(false);
  const [customerReceived, setCustomerReceived] =
    useState<CustomerVisitorEntity>(new CustomerVisitorEntity());
  const {locationSelected} = useAuth();
  const [lsData, setLstDat] = useState<Array<ReportAssigneeEntity>>([]);

  const onChangeDate = (val: Date) => {
    setDate(val);
  };

  const [totalValue, title, backScreen] = useMemo((): [
    string,
    string,
    string,
  ] => {
    return [
      customerReceived.getCustomerVisitor().getTextValue(),
      'Khách đã tiếp',
      MainRouteConfig.ReportCustomerReceived,
    ];
  }, [customerReceived]);

  const handleBack = () => {
    navigation.navigate(backScreen, {
      view_date: date,
    });
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

  const getExpectData = (
    data: CustomerVisitorEntity,
    received: CustomerVisitorEntity,
  ) => {
    handleSuccess();
    setCustomerReceived(received);
  };

  const getData = useCallback(
    (beforeCallApi: () => void) => {
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
      customerVisitorService.getCustomerVisitorDetail(
        date,
        [locationSelected.locationId],
        locationSelected.locationName,
        res => {
          setLstDat(res);
        },
        () => {},
        ReportCustomerTab.assignee,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date, locationSelected],
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

  return (
    <CTLayout.Container>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack
        onBackPress={handleBack}
        title="Chi tiết nhân viên"
      />
      <CTLayout.Body>
        <View style={ConversionCustomerDetailStyle.container}>
          <CTLayout.LoadingView firstLoading={firstLoading || loading}>
            <CTLayout.ErrorView onReloadPress={onReloadPress} error={error}>
              <CustomerSupported
                onChangeDate={onChangeDate}
                date={date}
                icon={icon_user}
                title={title}
                value={totalValue}
              />
              <View style={ConversionCustomerDetailStyle.container}>
                <View style={ConversionCustomerDetailStyle.header}>
                  <CTTypography.Text
                    font={Font.Medium}
                    level="2"
                    text="CHI TIẾT NHÂN VIÊN"
                  />
                  <View style={ConversionCustomerDetailStyle.tag}>
                    <CTTypography.Text
                      style={ConversionCustomerDetailStyle.textTag}
                      level="4"
                      text={`${lsData.length} nhân viên`}
                    />
                  </View>
                </View>
                {lsData.length > 0 ? (
                  <View style={ConversionCustomerDetailStyle.body}>
                    <CTFLastList
                      showsVerticalScrollIndicator={false}
                      disableRefresh
                      keyExtractor={item => item.getCode()}
                      data={lsData}
                      renderItem={({item}) => (
                        <AssigneeLineItem assignee={item} />
                      )}
                    />
                  </View>
                ) : (
                  <View style={ConversionCustomerDetailStyle.empty}>
                    <CTTypography.Text
                      text="Không có dữ liệu hiển thị."
                      style={{color: Colors.Gray500}}
                    />
                  </View>
                )}
              </View>
            </CTLayout.ErrorView>
          </CTLayout.LoadingView>
        </View>
      </CTLayout.Body>
    </CTLayout.Container>
  );
};

export default ConversionEachAssigneeScreen;
