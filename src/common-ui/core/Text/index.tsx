import {useTheme} from 'common-ui/hook';
import React from 'react';
import {Text as RNText} from 'react-native';
import {TextProps} from '../../types';
import {DimentionUtils} from '../../utils';
import DefaultTextStyle from './style';

const Text: React.FC<TextProps> = ({
  color,
  size = 14,
  text,
  style,
  fontWeight = '400',
  lineHeight,
  fontStyle,
  textAlign,
  textDecorationLine,
  textDecorationStyle,
  ...rest
}) => {
  const Roboto = 'Roboto';
  const theme = useTheme();
  return (
    <RNText
      style={[
        DefaultTextStyle.default,
        style,
        {
          fontFamily: Roboto,
          color: color ? color : theme.text,
          fontSize: DimentionUtils.scaleFont(size),
          fontWeight: fontWeight,
          fontStyle: fontStyle,
          lineHeight: lineHeight,
          textAlign: textAlign,
          textDecorationLine: textDecorationLine,
          textDecorationStyle: textDecorationStyle,
        },
      ]}
      {...rest}>
      {text}
    </RNText>
  );
};

export default Text;
