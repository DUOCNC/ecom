/*
 * Create By: Ánh Nguyễn
 * Version: 1.0.0
 */

import {BaseText} from 'components/Base/Text';
import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {CTInputStyle} from './style';
import {Size} from 'assets/theme';
import {DimentionUtils} from 'common-ui';

export interface CTInputProps extends BaseText, TextInputProps {
  fontSize?: number;
}

const CTInput = React.forwardRef<TextInput, CTInputProps>(
  ({fontSize = Size.DefaultInputSize, style, ...rest}, ref) => {
    return (
      <TextInput
        autoCapitalize="sentences"
        ref={ref}
        autoCorrect={false}
        underlineColorAndroid="rgba(0,0,0,0)"
        style={[
          CTInputStyle.base,
          {
            fontSize: DimentionUtils.scale(fontSize),
          },
          style,
        ]}
        {...rest}
      />
    );
  },
);

export default CTInput;
