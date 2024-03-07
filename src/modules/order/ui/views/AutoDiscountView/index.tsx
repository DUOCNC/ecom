import {Typography} from 'common-ui';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, Switch, TouchableOpacity, View} from 'react-native';
import style from './style';
import {Colors} from 'assets/colors';
import {ic_arrow, ic_money_tag, ic_x_close_circle} from 'assets/images';
import {
  getDiscountOrderUI,
  handleConditionDiscountUI,
} from 'modules/order/utils';
import {OrderEntity} from 'modules/order/models';
import {NumberUtils} from 'common';
import {colors} from 'assets/v2';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import CountView from '../CountView';
import {SuggestedDiscountEntity} from 'modules/order/models/entities';
import ApplyDiscountEntity from 'modules/order/models/entities/ApplyDiscountEntity';

interface Props {
  isHaveLineItems: boolean;
  order: OrderEntity;
  onChangeAutoDiscount: (autoDiscount: boolean) => void;
  onChangePoint: (p: number) => void;
  onRemoveOrderDiscount: (index: number) => void;
}

const AutoDiscountView: React.FC<Props> = ({
  isHaveLineItems,
  order,
  onChangeAutoDiscount,
  onChangePoint,
  onRemoveOrderDiscount,
}: Props) => {
  const [isAutoDiscount, setIsAutoDiscount] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const [test, setTest] = useState(false);

  useEffect(() => {
    setIsAutoDiscount(order.getAutoDiscount());
  }, [order.getAutoDiscount()]);

  const toggleSwitch = (value: boolean) => {
    setIsAutoDiscount(previousState => !previousState);
    onChangeAutoDiscount(value);
  };
  // const toggleSwitchTest = () => setTest(previousState => !previousState);
  let displayCheck = useMemo(() => {
    return handleConditionDiscountUI(isHaveLineItems, order.getAutoDiscount());
  }, [isHaveLineItems, order.getAutoDiscount()]);

  const onPressDiscount = useCallback(
    (discountInfo?: SuggestedDiscountEntity | ApplyDiscountEntity) => {
      navigation.navigate(MainRouteConfig.PickPromotionOrder, {
        order,
        oldSelectSuggestDiscount: discountInfo,
      });
    },
    [navigation, order],
  );

  const discountInfoView = useMemo(() => {
    if (!displayCheck.isDisableSelectDiscount) {
      if (order.getSuggestedDiscounts().length === 0) {
        return (
          <TouchableOpacity onPress={() => onPressDiscount()}>
            <View style={[style.selectInput]}>
              <View style={style.promotionTitle}>
                <Typography
                  text="Khuyến mại"
                  textType="regular"
                  color={colors.secondary.o500}
                  numberOfLines={1}
                />
              </View>
              <TouchableOpacity style={style.iconArrowContainer}>
                <Image source={ic_arrow} style={style.iconArrow} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      }
      return order.getSuggestedDiscounts().map((e, index) => {
        const discountInfo = e;
        const {value, title} = getDiscountOrderUI(
          discountInfo,
          order.getTotalPriceRetail(),
          order.getAmountDiscountProduct(),
        );
        return (
          <TouchableOpacity
            onPress={() => onPressDiscount(e)}
            key={e.getPriceRuleId()}>
            <View style={[style.selectInput, style.discountItem]}>
              {discountInfo && <Image source={ic_money_tag} />}
              <View style={style.promotionTitle}>
                <Typography
                  text={discountInfo ? discountInfo.getTitle() : 'Khuyến mại'}
                  textType={discountInfo ? 'medium' : 'regular'}
                  color={
                    discountInfo ? colors.primary.o500 : colors.secondary.o500
                  }
                  numberOfLines={1}
                />
                {discountInfo && (
                  <View style={style.promoValue}>
                    <View style={style.value}>
                      <Typography
                        text={value}
                        color={colors.error.o500}
                        type="h5"
                        numberOfLines={1}
                      />
                    </View>
                    <Typography
                      text={title}
                      color={colors.error.o500}
                      type="h5"
                      numberOfLines={1}
                    />
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  onRemoveOrderDiscount(index);
                }}
                style={style.iconArrowContainer}>
                <Image
                  source={discountInfo ? ic_x_close_circle : ic_arrow}
                  style={style.iconArrow}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      });
    }
    if (order.getSuggestedDiscounts().length > 0) {
      return (
        <View style={[style.selectInput, style.disabled]}>
          <View style={style.promotionTitle}>
            <Typography
              text="Khuyến mại"
              color={colors.secondary.o500}
              type="h3"
              numberOfLines={1}
            />
          </View>
          <Image source={ic_arrow} />
        </View>
      );
    }
    return (
      <View style={[style.selectInput, style.disabled]}>
        <View style={style.promotionTitle}>
          <Typography
            text="Khuyến mại"
            color={colors.secondary.o500}
            type="h3"
            numberOfLines={1}
          />
        </View>
        <Image source={ic_arrow} />
      </View>
    );
  }, [
    displayCheck.isDisableSelectDiscount,
    onPressDiscount,
    onRemoveOrderDiscount,
    order,
  ]);

  const onPlus = (newCount: number) => {
    const newPoint = order.getPointApply(newCount);
    onChangePoint(newPoint);
  };

  const onMinus = (newCount: number) => {
    onChangePoint(newCount);
  };

  const onKeyboardPress = (newCount: number) => {
    const newPoint = order.getPointApply(newCount);
    onChangePoint(newPoint);
  };

  return (
    <View style={style.container}>
      <View style={[style.header]}>
        <Typography
          style={style.txtTitle}
          type="h3"
          textType="medium"
          text="Chiết khấu tự động"
        />
        <Switch
          trackColor={{false: Colors.Gray400, true: Colors.Primary}}
          thumbColor={Colors.White}
          ios_backgroundColor={Colors.Gray400}
          style={style.switch}
          onValueChange={toggleSwitch}
          value={isAutoDiscount}
        />
      </View>
      {discountInfoView}
      <View style={style.information}>
        <View style={style.rowInformation}>
          <Typography
            text="Tổng tiền hàng"
            type="h4"
            color={colors.secondary.o500}
          />
          <Typography
            type="h4"
            text={NumberUtils.formatCurrency(order.getTotalPriceRetail())}
          />
        </View>
        <View style={style.rowInformation}>
          <View style={[style.row, style.point]}>
            <Typography
              text="Tiêu điểm (1điểm = 1000đ)"
              type="h4"
              color={colors.secondary.o500}
            />
            <CountView
              onKeyboardPress={onKeyboardPress}
              title="Số lượng"
              count={order.getPoint()}
              onPlus={onPlus}
              onMinus={onMinus}
              disabled={order.emptyCustomer()}
            />
          </View>
        </View>
        <View style={style.rowInformation}>
          <View style={style.row}>
            <Typography
              text="Tổng chiết khấu"
              type="h4"
              color={colors.secondary.o500}
            />
            <View style={style.tag}>
              <Typography
                text={order.getPercentDiscountTotalOrder()}
                color={colors.error.o500}
                type="h4"
                numberOfLines={1}
              />
            </View>
          </View>
          <Typography type="h4" text={order.getAmountDiscountDisplay()} />
        </View>
      </View>
    </View>
  );
};

export default AutoDiscountView;
