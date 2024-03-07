import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from 'react';
import {Image, View} from 'react-native';
import {Style} from './style';
import {ic_gift} from 'assets/images';
import {OrderLineEntity} from 'modules/order/models';
import {Typography} from 'common-ui';
import CountView from '../CountView';

interface Props {
  lineItem: OrderLineEntity;
  index: number;
  onQuantityChange: (quantity: number, index: number) => void;
  onHandleZero?: (index: number) => void;
}

export interface OrderLineItemRef {}
type GiftLineItemView = ForwardRefRenderFunction<OrderLineItemRef, Props>;
const GiftLineItemView: GiftLineItemView = (
  {lineItem, index, onQuantityChange, onHandleZero},
  ref,
) => {
  useImperativeHandle(ref, () => ({}));
  if (!lineItem) {
    return <View />;
  }

  const onPlus = (newCount: number) => {
    if (newCount <= OrderLineEntity.max) {
      onQuantityChange(newCount, index);
    }
  };

  const onMinus = (newCount: number) => {
    if (newCount >= OrderLineEntity.min) {
      onQuantityChange(newCount, index);
    }
    if (newCount === OrderLineEntity.min) {
      onHandleZero && onHandleZero(index);
    }
  };

  const onKeyboardPress = (newCount: number) => {
    if (newCount >= OrderLineEntity.min && newCount <= OrderLineEntity.max) {
      onQuantityChange(newCount, index);
    }
    if (newCount === OrderLineEntity.min) {
      onHandleZero && onHandleZero(index);
    }
  };
  return (
    <View style={Style.container}>
      <View style={Style.row}>
        <View style={Style.icon}>
          <Image source={ic_gift} />
        </View>
        <Typography
          style={Style.text}
          numberOfLines={1}
          text={lineItem.getVariantName()}
        />
        <View style={Style.quantityControl}>
          <CountView
            onKeyboardPress={onKeyboardPress}
            title="Số lượng"
            count={lineItem.getQuantity()}
            onPlus={onPlus}
            onMinus={onMinus}
          />
        </View>
      </View>
    </View>
  );
};

export default forwardRef(GiftLineItemView);
