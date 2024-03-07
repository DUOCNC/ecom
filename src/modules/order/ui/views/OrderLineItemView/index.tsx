import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {OrderLineStyle} from './style';
import {
  ic_placeholder_6080,
  ic_program_discount,
  ic_promotion,
} from 'assets/images';
import {OrderEntity, OrderLineEntity} from 'modules/order/models';
import {colors} from 'assets/v2';
import CTImage from 'components/CTImage';
import {Typography} from 'common-ui';
import CountView from '../CountView';
import {StringUtils} from 'common';

interface Props {
  order: OrderEntity;
  lineItem: OrderLineEntity;
  index: number;
  onQuantityChange: (quantity: number) => void;
  onLineItemPress: (lineItem: OrderLineEntity, index: number) => void;
  onHandleZero?: (index: number) => void;
}

export interface OrderLineItemRef {
  loading: () => void;
  unLoading: () => void;
}

type OrderLineItemView = ForwardRefRenderFunction<OrderLineItemRef, Props>;

const OrderLineItemView: OrderLineItemView = (
  {order, lineItem, index, onQuantityChange, onLineItemPress, onHandleZero},
  ref,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  useImperativeHandle(ref, () => ({
    loading: onLoading,
    unLoading: onUnLoading,
  }));
  if (!lineItem) {
    return <View />;
  }

  const onPressItem = () => onLineItemPress(lineItem, index);
  const onLoading = () => {
    setLoading(true);
  };
  const onUnLoading = () => {
    setLoading(false);
  };

  const onPlus = (newCount: number) => {
    if (newCount <= OrderLineEntity.max) {
      onQuantityChange(newCount);
    }
  };

  const onMinus = (newCount: number) => {
    if (newCount >= OrderLineEntity.min) {
      onQuantityChange(newCount);
    }
    if (newCount === OrderLineEntity.min) {
      onHandleZero && onHandleZero(index);
    }
  };

  const onKeyboardPress = (newCount: number) => {
    if (newCount >= OrderLineEntity.min && newCount <= OrderLineEntity.max) {
      onQuantityChange(newCount);
    }
    if (newCount === OrderLineEntity.min) {
      onHandleZero && onHandleZero(index);
    }
  };
  return (
    <TouchableOpacity onPress={onPressItem} style={OrderLineStyle.container}>
      <View style={OrderLineStyle.image}>
        <CTImage
          style={OrderLineStyle.variantAvatar}
          source={{uri: lineItem.getVariantImage()}}
          placeholder={ic_placeholder_6080}
        />
        {lineItem.getGiftProgram() && (
          <Image
            style={OrderLineStyle.programDiscountIcon}
            source={ic_program_discount}
          />
        )}
      </View>
      <View style={OrderLineStyle.right}>
        <View style={OrderLineStyle.firstRow}>
          <Typography
            text={lineItem.getVariant().getName()}
            type="h4"
            fontWeight="400"
            numberOfLines={2}
            lineHeight={18}
          />
        </View>
        <View style={OrderLineStyle.secondRow}>
          <Typography
            text={StringUtils.format('Mã: {0}', lineItem.getSku())}
            color={colors.secondary.o500}
            type="h5"
          />
        </View>
        <View style={OrderLineStyle.thirdRow}>
          <Typography
            type="h5"
            color={
              lineItem.getSellableInventory(order)
                ? colors.success.o500
                : colors.error.o500
            }
            numberOfLines={1}
            text={StringUtils.format(
              'Có thể bán: {0}',
              lineItem.getVariant().getAvailable(),
            )}
          />
        </View>
        <View style={OrderLineStyle.fourthRow}>
          <View>
            <Typography
              style={OrderLineStyle.txtPrice}
              fontWeight="500"
              type="h3"
              color={colors.primary.o500}
              text={lineItem.getVariant().getRetailPrice(lineItem)}
            />
          </View>
          <View style={OrderLineStyle.quantityControl}>
            <CountView
              onKeyboardPress={onKeyboardPress}
              title="Số lượng"
              count={lineItem.getQuantity()}
              onPlus={onPlus}
              onMinus={onMinus}
              disabled={!lineItem.getSellableInventory(order)}
            />
          </View>
        </View>
        {loading && (
          <View style={OrderLineStyle.viewLoading}>
            <ActivityIndicator size="large" color={colors.base.white} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default forwardRef(OrderLineItemView);
