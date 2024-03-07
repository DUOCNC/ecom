import {Typography} from 'common-ui';
import {OrderLineEntity} from 'modules/order/models';
import {Image, View} from 'react-native';
import React from 'react';
import style from './style';
import {ic_gift} from 'assets/images';
import {StringUtils} from 'common';

export interface Props {
  item: OrderLineEntity;
}
const OrderGiftLineItemView: React.FC<Props> = ({item}) => {
  return (
    <View style={[style.row]}>
      <View style={style.icon}>
        <Image source={ic_gift} />
      </View>
      <Typography
        style={style.text}
        numberOfLines={1}
        text={item.getVariantName()}
      />
      <Typography
        style={style.iconRight}
        text={StringUtils.format('X{0}', item.getQuantity())}
      />
    </View>
  );
};
export default OrderGiftLineItemView;
