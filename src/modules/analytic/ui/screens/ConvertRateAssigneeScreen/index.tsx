import React, {createRef, useMemo, useState} from 'react';
import {View} from 'react-native';
import {ConversionCustomerDetailStyle} from './style';
import CTLayout from 'components/CTLayout';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import CTStatusBar from 'components/CTStatusBar';
import {icon_percent} from 'assets/images';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import CTFLastList from 'components/CTFlatList';
import CustomerSupported from '../../views/CustomerSupported';
import {ConvertRateEachAssigneeList} from 'modules/analytic/models/responses/AnalyticResponse';
import {Styles} from 'modules/analytic/ui/screens/ReportCustomerScreen/style';
import {SelectStoreView} from 'modules/analytic/ui/views/Customer';
import {PickStoreRef} from 'modules/analytic/ui/views/PickStoreView';
import ConvertRateLineItem from 'modules/analytic/ui/views/ConvertRateLineItemComponent';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'ConvertRateAssignee'>;

const ConvertRateAssignee: React.FC<Props> = ({route}) => {
  const [date, setDate] = useState<Date>(new Date());
  const {locationSelected} = useAuth();
  const [value] = useState<string>('0');
  const pickStoreRef = createRef<PickStoreRef>();
  const [store] = useState<{id: number; name: string}>({
    id: locationSelected.locationId,
    name: locationSelected.locationName,
  });
  const [data, setData] = useState<ConvertRateEachAssigneeList[]>([
    {
      customerBuyCount: 100,
      convertRate: 122,
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
        title="Chi tiết theo từng nhân viên"
        bottom={
          <View style={Styles.pickStore}>
            <SelectStoreView
              storeName={storeActive.name}
              onPickStore={onPickStore}
            />
          </View>
        }
      />
      <CTLayout.Body>
        <View style={ConversionCustomerDetailStyle.container}>
          <CustomerSupported
            onChangeDate={onChangeDate}
            date={date}
            icon={icon_percent}
            title="TỶ LỆ CHUYỂN ĐỔI"
            value={value}
          />
          <View style={ConversionCustomerDetailStyle.container}>
            <View style={ConversionCustomerDetailStyle.header}>
              <CTTypography.Text
                font={Font.Medium}
                level="2"
                text="CHI TIẾT NHÂN VIÊN"
              />
              <CTTypography.Text
                style={ConversionCustomerDetailStyle.textTag}
                font={Font.Regular}
                level="3"
                text={`${data.length} nhân viên`}
              />
            </View>
            {data.length > 0 && (
              <View style={ConversionCustomerDetailStyle.body}>
                <CTFLastList
                  showsVerticalScrollIndicator={false}
                  disableRefresh
                  keyExtractor={item => item}
                  data={data}
                  renderItem={({item}) => <ConvertRateLineItem data={item} />}
                />
              </View>
            )}
          </View>
        </View>
      </CTLayout.Body>
    </CTLayout.Container>
  );
};

export default ConvertRateAssignee;
