import {Typography} from 'common-ui';
import {OrderLineEntity} from 'modules/order/models';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import React, {useMemo} from 'react';
import {colors} from 'assets/v2';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {ic_arrow} from 'assets/images';
import {DiscountItemEntity, OrderEntity} from 'modules/order/models/entities';

interface Props {
  order: OrderEntity;
  lineItem: OrderLineEntity;
  lineIndex: number;
  isNew: boolean;
  onQuantityChange: (newQuantity: number, index: number) => void;
}
const PromotionContainerView: React.FC<Props> = ({
  order,
  lineItem,
  lineIndex,
  isNew,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onPress = () => {
    navigation.navigate(MainRouteConfig.PickPromotion, {
      order: order,
      lineItem: lineItem,
      lineIndex: lineIndex,
      isNew: isNew,
    });
  };

  const discountInfoView = useMemo(() => {
    if (!lineItem) {
      return <View />;
    }
    const discountItem: DiscountItemEntity = lineItem.getDiscountItems()[0];
    if (discountItem) {
      return (
        <View style={[style.selectInput]}>
          <View style={style.promotionTitle}>
            <Typography
              text="Chiết khấu trên 1 sản phẩm"
              color={colors.secondary.o500}
              type="h4"
              numberOfLines={1}
            />
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
          </View>
          <View style={style.iconArrow}>
            <Image source={ic_arrow} />
          </View>
        </View>
      );
    }
    return (
      <View
        style={[
          style.selectInput,
          order && order.getSuggestedDiscounts().length > 0 && style.disabled,
        ]}>
        <View style={style.promotionTitle}>
          <Typography
            text="Chiết khấu trên 1 sản phẩm"
            color={colors.secondary.o500}
            type="h3"
            numberOfLines={1}
          />
        </View>
        <Image source={ic_arrow} />
      </View>
    );
  }, [lineItem, order]);

  return (
    <View style={style.container}>
      <View style={style.title}>
        <Typography
          textType="medium"
          text="Khuyến mại"
          type="h3"
          color={colors.secondary.o900}
        />
      </View>
      <View>
        <TouchableOpacity
          disabled={order && order.getSuggestedDiscounts().length > 0}
          onPress={onPress}>
          {discountInfoView}
        </TouchableOpacity>

        <View style={style.amount}>
          <Typography
            text="Tổng tiền"
            color={colors.secondary.o500}
            type="h4"
          />
          <Typography
            style={style.amountValue}
            text={lineItem.getLineAmountAfterLineDiscount()}
            color={colors.secondary.o500}
            type="h3"
          />
        </View>
      </View>
    </View>
  );
};

export default PromotionContainerView;
