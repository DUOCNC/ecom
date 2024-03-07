import {Typography} from 'common-ui';
import {Image, ImageProps, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';
import {ic_gift_grey, ic_x_close_circle} from 'assets/images';
import {colors} from 'assets/v2';
import {SuggestedDiscountGiftEntity} from 'modules/order/models/entities/GiftProgramEntity';

export interface Props {
  title: string;
  icon: ImageProps;
}
const LineItemPosCreateView: React.FC<Props> = ({title, icon}) => {
  return (
    <View style={style.row}>
      <View style={style.icon}>
        <Image style={style.icGift} source={icon} />
      </View>
      <Typography
        style={style.text}
        numberOfLines={1}
        textType="medium"
        color={colors.primary.o500}
        text={title ?? ''}
      />
    </View>
  );
};
export default LineItemPosCreateView;
