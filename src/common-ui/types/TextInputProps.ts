import {ColorValue, TextInputProps as RNTextInputProps} from 'react-native';
export interface TextInputProps extends RNTextInputProps {
  /**
   * Color Text default color theme
   */
  color?: ColorValue;
  /**
   * Size Text defaut size 14
   */
  size?: number;

  /**
   * if textDecorationLine not none
   */
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed';

  /**
   * Font weight default normal
   */
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;

  fontStyle?: 'normal' | 'italic' | undefined;

  /**
   * Line Height Text
   */
  lineHeight?: number | undefined;
}
