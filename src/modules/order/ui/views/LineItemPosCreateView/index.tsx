import {Typography} from 'common-ui';
import {Image, ImageProps, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';
import {colors} from 'assets/v2';
import {ic_close} from 'assets/images';

export interface Props {
  title: string;
  icon: ImageProps;
  onClear?: () => void;
}
const LineItemPosCreateView: React.FC<Props> = ({title, icon, onClear}) => {
  return (
    <View style={style.row}>
      <View style={style.content}>
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
      {onClear && (
        <TouchableOpacity onPress={onClear}>
          <Image source={ic_close} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default LineItemPosCreateView;
