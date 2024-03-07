/*
 * Create By: Ánh Nguyễn
 * Version: 1.0.0
 */

import {StyleProp, TextProps, TextStyle} from 'react-native';
import {Font} from './enums';

export interface BaseText extends TextProps {
  font?: Font;
  style?: StyleProp<TextStyle>;
}

export {Font};
