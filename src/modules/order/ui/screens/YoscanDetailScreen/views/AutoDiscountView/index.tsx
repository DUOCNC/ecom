import {Typography} from 'common-ui';
import React, {useMemo} from 'react';
import {Image, View} from 'react-native';
import style from './style';
import {ic_arrow, ic_money_tag} from 'assets/images';
import {getDiscountOrderUIDetailYoscan} from 'modules/order/utils';
import {NumberUtils} from 'common';
import {colors} from 'assets/v2';
import CountView from 'modules/order/ui/views/CountView';
import {OrderYoscanEntity} from 'modules/order/models/entities/OrderYoscanEntity';

interface Props {
  order: OrderYoscanEntity;
}

const AutoDiscountView: React.FC<Props> = ({order}: Props) => {
  const discountInfo = useMemo(() => {
    return order.getOrder().getDiscounts()[0];
  }, [order]);

  let title = useMemo(() => {
    return getDiscountOrderUIDetailYoscan(
      discountInfo,
      order.getOrder().getTotalRetailPrice(),
      0,
    ).title;
  }, [discountInfo, order]);
  let value = useMemo(() => {
    return getDiscountOrderUIDetailYoscan(
      discountInfo,
      order.getOrder().getTotalRetailPrice(),
      0,
    ).value;
  }, [discountInfo, order]);

  const discountInfoView = useMemo(() => {
    return (
      <View style={[style.selectInput, style.disabled]}>
        {discountInfo && <Image source={ic_money_tag} />}
        <View style={style.promotionTitle}>
          <Typography
            text={
              discountInfo ? discountInfo.getPromotionTitle() : 'Khuyến mại'
            }
            textType={discountInfo ? 'medium' : 'regular'}
            color={discountInfo ? colors.primary.o500 : colors.secondary.o500}
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
        <View style={style.iconArrowContainer}>
          <Image source={ic_arrow} style={style.iconArrow} />
        </View>
      </View>
    );
  }, [title, value]);

  return (
    <View style={style.container}>
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
            text={NumberUtils.formatCurrency(
              order.getOrder().getTotalRetailPrice(),
            )}
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
              onKeyboardPress={() => {}}
              title="Số lượng"
              count={order.getOrder().getPoint()}
              onPlus={() => {}}
              onMinus={() => {}}
              disabled={true}
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
          <Typography
            type="h4"
            text={NumberUtils.formatCurrency(order.getTotalDiscount())}
          />
        </View>
      </View>
    </View>
  );
};

export default AutoDiscountView;
