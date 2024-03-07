import React from 'react';
import {View} from 'react-native';
import style from './style';
import LineItemView from '../LineItemView';
import {ThemeStyle} from 'assets/theme';
import {OrderYoscanEntity} from 'modules/order/models/entities/OrderYoscanEntity';
import LineItemPosCreateView from './../LineItemPosCreateView';
import {ic_gift_grey, ic_money_tag} from 'assets/images';
import {LineItemTypeLowercase} from 'modules/order/enums/Promotion';

interface Props {
  order: OrderYoscanEntity;
}

const ProductYoscanDetailView: React.FC<Props> = ({order}) => {
  return (
    <View>
      <View style={style.container}>
        {order
          .getOrder()
          .getItems()
          .map((item, index) => {
            return (
              <>
                <View key={index}>
                  <LineItemView lineItem={item} />
                </View>
                {item && item.getDiscountItems().length > 0 && (
                  <View style={style.giftProgramLineItemViewContainer}>
                    <LineItemPosCreateView
                      title={
                        item.getDiscountItems()[0].getPromotionTitle() ?? ''
                      }
                      icon={
                        item.getType() === LineItemTypeLowercase.GIFT
                          ? ic_gift_grey
                          : ic_money_tag
                      }
                    />
                  </View>
                )}
                {order.getOrder().getItems().length !== index + 1 && (
                  <View style={ThemeStyle.separator} />
                )}
              </>
            );
          })}
      </View>
    </View>
  );
};

export default ProductYoscanDetailView;
