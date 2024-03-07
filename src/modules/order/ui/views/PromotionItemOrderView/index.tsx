import {ImageBackground, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';
import {SuggestedDiscountEntity} from 'modules/order/models/entities';
import {bg_promotion_h96} from 'assets/images';
import {colors} from 'assets/v2';
import {Text} from 'common-ui';
import CTRadio from 'components/Form/CTRadio';
import {getTotalAfterDiscountOrder, TYPE} from 'modules/order/utils';
import {OrderEntity} from 'modules/order/models';
import ApplyDiscountEntity from 'modules/order/models/entities/ApplyDiscountEntity';

interface Props {
  discount: SuggestedDiscountEntity | ApplyDiscountEntity;
  order: OrderEntity;
  selected: boolean;
  onCheckedChange: (selected: boolean, item: SuggestedDiscountEntity) => void;
}

const PromotionItemOrderView: React.FC<Props> = ({
  discount,
  selected,
  order,
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
                    text={getTotalAfterDiscountOrder(
                      discount,
                      order.getTotalPriceRetail(),
                      TYPE.currency,
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
          <View style={style.viewSelect}>
            <CTRadio selected={selected} />
          </View>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default PromotionItemOrderView;
