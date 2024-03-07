import {ImageBackground, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';
import {
  SuggestedDiscountEntity,
  VariantEntity,
} from 'modules/order/models/entities';
import {bg_promotion_h96} from 'assets/images';
import {colors} from 'assets/v2';
import {Text, Typography} from 'common-ui';
import CTRadio from 'components/Form/CTRadio';

interface Props {
  discount: SuggestedDiscountEntity;
  variant: VariantEntity;
  selected: boolean;
  onCheckedChange: (selected: boolean, item: SuggestedDiscountEntity) => void;
}

const PromotionItemView: React.FC<Props> = ({
  discount,
  selected,
  variant,
  onCheckedChange,
}) => {
  return (
    <ImageBackground style={style.image} source={bg_promotion_h96}>
      <TouchableOpacity
        onPress={() => {
          onCheckedChange(!selected, discount);
        }}
        style={style.container}>
        <View style={style.containerStyle}>
          <View style={style.text}>
            <Text
              size={14}
              color={colors.primary.o500}
              fontWeight={'500'}
              numberOfLines={2}
              ellipsizeMode="tail"
              style={style.txtTitle}
              text={discount.getTitle()}
            />
            <Text
              size={12}
              color={colors.secondary.o500}
              style={style.txtPromotion}
              fontWeight={'400'}
              text={
                <>
                  Giá sau CK dự kiến:{' '}
                  <Text
                    size={14}
                    fontWeight={'500'}
                    color={colors.primary.o500}
                    text={discount.getPriceAfterDiscount(
                      variant.getRetailPriceValue(),
                    )}
                  />
                </>
              }
            />
            <Text
              size={10}
              style={style.txtPromotion}
              color={
                discount.checkDueDate()
                  ? colors.error.o500
                  : colors.secondary.o500
              }
              fontWeight={'400'}
              text={discount.getDueDate()}
            />
          </View>
          {selected ? (
            <View style={style.viewSelect}>
              <CTRadio selected={selected} />
            </View>
          ) : (
            <View style={style.viewApply}>
              <TouchableOpacity
                style={style.apply}
                onPress={() => {
                  onCheckedChange(!selected, discount);
                }}>
                <Typography text="Áp dụng" type="h5" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default PromotionItemView;
