import React from 'react';
import {Image, View} from 'react-native';
import {ErrorViewProps} from 'common-ui/types';
import style from './style';
import Typography from '../Typography';
import {colors} from 'assets/v2';

const ErrorView: React.FC<ErrorViewProps> = ({
  image,
  subTitle,
  title,
  bottom,
  imageSize,
}) => {
  const imageStyle = imageSize === 'small' ? style.imageSmall : style.image;
  return (
    <View style={style.container}>
      {image && (
        <Image resizeMode="contain" style={imageStyle} source={image} />
      )}
      {title && (
        <Typography
          type="h3"
          style={style.txtTitle}
          text={title}
          textType="medium"
        />
      )}
      {subTitle ? (
        <Typography
          color={colors.secondary.o500}
          style={style.txtSubTitle}
          type="h4"
          text={subTitle}
          textAlign="center"
        />
      ) : null}
      {bottom}
    </View>
  );
};

export default ErrorView;
