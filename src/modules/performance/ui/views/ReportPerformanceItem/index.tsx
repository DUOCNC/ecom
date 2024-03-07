import {Typography} from 'common-ui';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
} from 'react-native';
import style from './style';
import {colors} from 'assets/v2';

interface Props {
  image: ImageSourcePropType;
  title: string;
  imageStyle?: StyleProp<ImageStyle>;
  value: string;
  type: 'h4' | 'h3';
}

const ReportPerformanceItem: React.FC<Props> = ({
  image,
  title,
  imageStyle,
  value,
  type,
}) => {
  return (
    <View style={style.container}>
      <Image style={[style.icon, imageStyle]} source={image} />
      <Typography
        style={style.txt}
        color={colors.secondary.o500}
        type="h5"
        text={title}
      />
      <Typography
        style={style.value}
        textType="medium"
        type={type}
        color={colors.primary.o500}
        text={value}
      />
    </View>
  );
};

export default ReportPerformanceItem;
