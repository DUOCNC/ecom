import React, {ForwardRefRenderFunction, useState} from 'react';
import {Image, View} from 'react-native';
import {OrderLineStyle} from './style';
import {ic_placeholder_6080, ic_program_discount} from 'assets/images';
import {colors} from 'assets/v2';
import CTImage from 'components/CTImage';
import {Typography} from 'common-ui';
import {StringUtils} from 'common';
import style from 'modules/order/ui/views/PromotionContainerView/style';
import {
  DiscountItemYoscanEntity,
  ItemOrderYoscanEntity,
} from 'modules/order/models/entities/OrderYoscanEntity';
import CountView from 'modules/order/ui/views/CountView';
import {LineItemTypeLowercase} from 'modules/order/enums/Promotion';

interface Props {
  lineItem: ItemOrderYoscanEntity;
}

export interface LineItemViewRef {
  loading: () => void;
  unLoading: () => void;
}

type LineItemView = ForwardRefRenderFunction<LineItemViewRef, Props>;

const LineItemView: LineItemView = ({lineItem}) => {
  const discountItem: DiscountItemYoscanEntity | null =
    lineItem.getDiscountItems().length > 0 && lineItem.getDiscountItems()[0]
      ? lineItem.getDiscountItems()[0]
      : null;
  return (
    <View style={OrderLineStyle.container}>
      <View style={OrderLineStyle.image}>
        <CTImage
          style={OrderLineStyle.variantAvatar}
          source={{uri: lineItem.getVariantImage() ?? ''}}
          placeholder={ic_placeholder_6080}
        />
        {lineItem.getType() === LineItemTypeLowercase.GIFT && (
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
              text={lineItem.getPriceAfterDiscount()}
            />
            {lineItem.getDiscountItems() &&
              lineItem.getDiscountItems().length > 0 && (
                <Typography
                  textDecorationLine="line-through"
                  color={colors.secondary.o400}
                  style={OrderLineStyle.txtPriceNotDiscount}
                  textType="medium"
                  type="h5"
                  text={lineItem.getRetailPrice()}
                />
              )}
          </View>
          <View style={OrderLineStyle.quantityControl}>
            <CountView
              onKeyboardPress={() => {}}
              title="Số lượng"
              count={lineItem.getQuantity()}
              disabled={true}
              onMinus={() => {}}
              onPlus={() => {}}
            />
          </View>
        </View>
        {discountItem && lineItem.getType() !== LineItemTypeLowercase.GIFT && (
          <View style={style.promoValue}>
            <Typography
              text={lineItem.getTitleByDiscountType()}
              color={colors.secondary.o900}
              type="h3"
              numberOfLines={1}
            />
            <View style={style.value}>
              <Typography
                text={lineItem.getTagDiscount()}
                color={colors.error.o500}
                type="h4"
                numberOfLines={1}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default LineItemView;
