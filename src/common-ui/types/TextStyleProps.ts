import {ColorValue} from 'react-native';

export interface TextStyleProps {
  /**
   * Color Text default color theme
   */
  color?: ColorValue;
  /**
   * Size Text defaut size 14
   */
  size?: number;

  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';

  /**
   * textDecorationLine default none
   */
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';

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
