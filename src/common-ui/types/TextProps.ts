import {TextProps as RNTextProps} from 'react-native';
import {TextStyleProps} from './TextStyleProps';
export interface TextProps extends RNTextProps, TextStyleProps {
  text?: React.ReactNode;
}
