/*
 * Create By: Ánh Nguyễn
 * Version: 1.0.0
 */

import {BaseText} from 'components/Base/Text';
import {Font} from 'components/Base/Text/enums';
import React, {useMemo} from 'react';
import {Text, TextStyle} from 'react-native';
import {CTTextStyle} from './style';
import {normalizeText} from 'utils/DimensionsUtils';
import {Size} from 'assets/theme';

export interface CTTextProps extends BaseText {
  fontSize?: number;
  text?: React.ReactNode;
}

const CTText: React.FC<CTTextProps> = ({
  text,
  font,
  fontSize = Size.DefaultTextSize,
  style,
  ...rest
}) => {
  const fontWeight = useMemo(() => {
    switch (font) {
      case Font.Medium:
        return {fontWeight: '500'} as TextStyle;
      case Font.Bold:
        return {fontWeight: 'bold'} as TextStyle;
      case Font.Regular:
      default:
        return {fontWeight: '400'} as TextStyle;
    }
  }, [font]);
  return (
    <Text
      style={[
        CTTextStyle.base,
        style,
        fontWeight,
        {
          fontSize: fontSize,
        },
      ]}
      {...rest}>
      {text}
    </Text>
  );
};

export default CTText;
