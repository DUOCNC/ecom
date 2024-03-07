import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {OrderLineStyle} from './style';
import {
  ic_close,
  ic_gift,
  ic_gift_background_grey,
  ic_gift_grey,
  ic_placeholder_6080,
  ic_program_discount,
  ic_promotion,
  ic_promotion_background_grey,
} from 'assets/images';
import {OrderEntity, OrderLineEntity} from 'modules/order/models';
import {colors} from 'assets/v2';
import CTImage from 'components/CTImage';
import {Typography} from 'common-ui';
import CountView from '../CountView';
import {StringUtils} from 'common';
import {MainRouteConfig} from 'config/RouteConfig';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import style from 'modules/order/ui/views/PromotionContainerView/style';
import {DiscountItemEntity} from 'modules/order/models/entities';

interface Props {
  order: OrderEntity;
  lineItem: OrderLineEntity;
  index: number;
  onQuantityChange: (quantity: number, index: number) => void;
  onRemoveLineItem: (index: number) => void;
}

export interface LineItemViewRef {
  loading: () => void;
  unLoading: () => void;
}

type LineItemView = ForwardRefRenderFunction<LineItemViewRef, Props>;

const LineItemView: LineItemView = (
  {order, lineItem, index, onQuantityChange, onRemoveLineItem},
  ref,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useImperativeHandle(ref, () => ({
    loading: onLoading,
    unLoading: onUnLoading,
  }));
  if (!lineItem) {
    return <View />;
  }

  const onLoading = () => {
    setLoading(true);
  };
  const onUnLoading = () => {
    setLoading(false);
  };

  const onPlus = (newCount: number) => {
    if (newCount <= OrderLineEntity.max) {
      onQuantityChange(newCount, index);
    }
  };

  const onMinus = (newCount: number) => {
    if (newCount > OrderLineEntity.min) {
      onQuantityChange(newCount, index);
    }
    if (newCount === OrderLineEntity.min) {
      onRemoveLineItem && onRemoveLineItem(index);
    }
  };

  const onKeyboardPress = (newCount: number) => {
    if (newCount > OrderLineEntity.min && newCount <= OrderLineEntity.max) {
      onQuantityChange(newCount, index);
    }
    if (newCount === OrderLineEntity.min) {
      onRemoveLineItem && onRemoveLineItem(index);
    }
  };

  const onPressClose = () => {
    onRemoveLineItem(index);
  };

  const onPressGift = () => {
    if (lineItem) {
      navigation.navigate(MainRouteConfig.PickGift, {
        lineItem: lineItem,
        lineIndex: index,
        isNew: false,
        order,
      });
    }
  };

  const onPressPromotion = () => {
    navigation.navigate(MainRouteConfig.PickPromotion, {
      lineItem: lineItem,
      lineIndex: index,
      isNew: false,
      order,
    });
  };

  const discountItem: DiscountItemEntity | null =
    lineItem.getDiscountItems()[0] &&
    lineItem.getDiscountItems()[0].getSuggestedDiscounts().length > 0
      ? lineItem.getDiscountItems()[0]
      : null;
  return (
    <View style={OrderLineStyle.container}>
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
            text={lineItem.getVariantName()}
            type="h4"
            fontWeight="400"
            numberOfLines={2}
            lineHeight={18}
            style={OrderLineStyle.name}
          />
          <TouchableOpacity
            onPress={onPressClose}
            style={OrderLineStyle.btnClose}>
            <Image style={OrderLineStyle.iconClose} source={ic_close} />
          </TouchableOpacity>
        </View>
        <View style={OrderLineStyle.secondRow}>
          <Typography
            text={StringUtils.format('Mã: {0}', lineItem.getSku())}
            color={colors.secondary.o500}
            type="h5"
          />
        </View>
        <View style={OrderLineStyle.fourthRow}>
          <View style={OrderLineStyle.price}>
            <Typography
              style={OrderLineStyle.txtPrice}
              fontWeight="500"
              type="h3"
              color={colors.primary.o500}
              text={lineItem.getPrice(lineItem)}
            />
            {lineItem.getDiscountItems() &&
              lineItem.getDiscountItems().length > 0 &&
              lineItem.getDiscountItems()[0].getSuggestedDiscounts().length >
                0 && (
                <Typography
                  textDecorationLine="line-through"
                  color={colors.secondary.o400}
                  style={OrderLineStyle.txtPriceNotDiscount}
                  textType="medium"
                  type="h5"
                  text={lineItem.getVariant().getRetailPrice()}
                />
              )}
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
        {!discountItem && (
          <View style={OrderLineStyle.thirdRow}>
            <TouchableOpacity onPress={onPressPromotion}>
              <Image
                source={ic_promotion_background_grey}
                style={OrderLineStyle.icPromotion}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressGift}>
              <Image source={ic_gift_background_grey} />
            </TouchableOpacity>
          </View>
        )}
        {discountItem && (
          <View style={style.promoValue}>
            <Typography
              text={discountItem.getTitleByDiscountType()}
              color={colors.secondary.o900}
              type="h3"
              numberOfLines={1}
            />
            <View style={style.value}>
              <Typography
                text={discountItem.getTagDiscount()}
                color={colors.error.o500}
                type="h4"
                numberOfLines={1}
              />
            </View>
          </View>
        )}
        {loading && (
          <View style={OrderLineStyle.viewLoading}>
            <ActivityIndicator size="large" color={colors.base.white} />
          </View>
        )}
      </View>
    </View>
  );
};

export default forwardRef(LineItemView);
