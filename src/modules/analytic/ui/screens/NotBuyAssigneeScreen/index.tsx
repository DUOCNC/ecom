import React, {createRef, useMemo, useState} from 'react';
import {View} from 'react-native';
import {NotBuyAssigneeStyle} from './style';
import CTLayout from 'components/CTLayout';
import {ThemeStyle} from 'assets/theme';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import CTStatusBar from 'components/CTStatusBar';
import {icon_user} from 'assets/images';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import CTFLastList from 'components/CTFlatList';
import CustomerSupported from '../../views/CustomerSupported';
import {NotBuyEachAssigneeList} from 'modules/analytic/models/responses/AnalyticResponse';
import {Styles} from 'modules/analytic/ui/screens/ReportCustomerScreen/style';
import {SelectStoreView} from 'modules/analytic/ui/views/Customer';
import {PickStoreRef} from 'modules/analytic/ui/views/PickStoreView';
import NotBuyLineItem from 'modules/analytic/ui/views/NotBuyLineItemComponent';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'NotBuyAssignee'>;

const NotBuyAssignee: React.FC<Props> = ({route}) => {
  const [date, setDate] = useState<Date>(new Date());
  const {locationSelected} = useAuth();
  const [value] = useState<string>('0');
  const [missedRevenue] = useState<string>('820.000');
  const pickStoreRef = createRef<PickStoreRef>();
  const [store] = useState<{id: number; name: string}>({
    id: locationSelected.locationId,
    name: locationSelected.locationName,
  });
  const [data] = useState<NotBuyEachAssigneeList[]>([
    {
      customerNotBuyCount: 100,
      missedRevenue: 122,
      name: 'Nguyễn Văn Mock',
    },
    {
      customerNotBuyCount: 100,
      missedRevenue: 122,
      name: 'Nguyễn Văn Mock',
    },
  ]);
  const onChangeDate = (val: Date) => {
    setDate(val);
  };
  const storeActive = useMemo(() => {
    let storeDefault = {...store};
    if (storeDefault.id === -1 && route.params && route.params.store_active) {
      storeDefault = route.params.store_active;
    }

    return storeDefault;
  }, [route.params, store]);
  const onPickStore = () => {
    pickStoreRef.current?.open();
  };
  return (
    <CTLayout.Container>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack
        style={[ThemeStyle.shadow, ThemeStyle.shadowBottom]}
        title="Chi tiết theo từng nhân viên"
      />
      <CTLayout.Body>
        <View style={NotBuyAssigneeStyle.container}>
          <View style={Styles.pickStore}>
            <SelectStoreView
              storeName={storeActive.name}
              onPickStore={onPickStore}
            />
          </View>
          <CustomerSupported
            onChangeDate={onChangeDate}
            date={date}
            icon={icon_user}
            title="KHÁCH KHÔNG MUA"
            value={value}
            description={
              <CTTypography.Text
                style={NotBuyAssigneeStyle.description}
                text={
                  <>
                    Trời ơi! Cửa hàng đã bỏ lỡ tận{' '}
                    <CTTypography.Text
                      style={NotBuyAssigneeStyle.redTextBold}
                      text={`${missedRevenue}đ`}
                    />{' '}
                    doanh thu rồi. Cố gắng lên nào!
                  </>
                }
              />
            }
          />
          <View style={NotBuyAssigneeStyle.container}>
            <View style={NotBuyAssigneeStyle.header}>
              <CTTypography.Text
                font={Font.Medium}
                level="2"
                text="CHI TIẾT NHÂN VIÊN"
              />
              <CTTypography.Text
                style={NotBuyAssigneeStyle.textTag}
                font={Font.Regular}
                level="3"
                text={`${data.length} nhân viên`}
              />
            </View>
            {data.length > 0 && (
              <View style={NotBuyAssigneeStyle.body}>
                <CTFLastList
                  showsVerticalScrollIndicator={false}
                  disableRefresh
                  keyExtractor={item => item}
                  data={data}
                  renderItem={({item}) => <NotBuyLineItem data={item} />}
                />
              </View>
            )}
          </View>
        </View>
      </CTLayout.Body>
    </CTLayout.Container>
  );
};

export default NotBuyAssignee;
