import {Typography} from 'common-ui';
import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';
import {ic_gift_grey, ic_x_close_circle} from 'assets/images';
import {colors} from 'assets/v2';
import {SuggestedDiscountGiftEntity} from 'modules/order/models/entities/GiftProgramEntity';

export interface Props {
  item: SuggestedDiscountGiftEntity | null;
  onDelete: () => void;
}
const GiftProgramLineItemView: React.FC<Props> = ({item, onDelete}) => {
  return (
    <View style={style.row}>
      <View style={style.icon}>
        <Image style={style.icGift} source={ic_gift_grey} />
      </View>
      <Typography
        style={style.text}
        numberOfLines={1}
        textType="medium"
        color={colors.primary.o500}
        text={item ? item.getTitle() : ''}
      />
      <TouchableOpacity onPress={() => onDelete()}>
        <Image style={style.icClose} source={ic_x_close_circle} />
      </TouchableOpacity>
    </View>
  );
};
export default GiftProgramLineItemView;
