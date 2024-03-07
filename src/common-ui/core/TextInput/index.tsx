import {useTheme} from 'common-ui/hook';
import {TextInputProps} from 'common-ui/types';
import {DimentionUtils} from 'common-ui/utils';
import React from 'react';
import {TextInput as RNTextInput} from 'react-native';
import DefaultTextStyle from './style';

const TextInput: React.FC<TextInputProps> = ({
  color,
  size = 14,
  style,
  fontWeight,
  lineHeight,
  fontStyle,
  textAlign,
  ...rest
}) => {
  const Roboto = 'Roboto';
  const theme = useTheme();
  return (
    <RNTextInput
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
        },
      ]}
      {...rest}
    />
  );
};

export default TextInput;
