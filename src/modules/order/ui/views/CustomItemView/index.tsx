import {NavigationProp, useNavigation} from '@react-navigation/native';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {Typography} from 'common-ui';
import {CustomerEntity} from 'modules/order/models';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from 'ui/screens/AuthenticationStack';
import style from './style';

interface Props {
  customer: CustomerEntity;
  link: string;
}

const CustomerItemView: React.FC<Props> = ({link, customer}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onCustomerPress = () => {
    navigation.navigate(link, {customerId: customer.getId()});
  };
  return (
    <TouchableOpacity onPress={onCustomerPress} style={style.container}>
      <View style={[style.row, style.rowFirst]}>
        <Typography
          type="h3"
          style={style.txtName}
          color={colors.primary.o500}
          numberOfLines={1}
          ellipsizeMode="tail"
          text={customer.getFullName()}
        />
        <View style={style.groupView}>
          <Typography
            color={colors.warning.o400}
            type="h5"
            text={customer.getLevel()}
          />
        </View>
      </View>
      <View style={style.row}>
        <Typography type="h3" text={customer.getPhone()} />
      </View>
      <View style={style.row}>
        <Typography
          type="h4"
          text={StringUtils.format('Điểm: {0}', customer.getPoint())}
        />
        <View style={style.rule} />
        <Typography
          type="h4"
          text={StringUtils.format('Đã mua: {0}', customer.getTotalBuy())}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomerItemView;
