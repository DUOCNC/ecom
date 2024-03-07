import {TextProps} from './TextProps';
import {TypographyType} from './TypographyType';

export interface TypographyProps extends TextProps {
  type?: TypographyType;
  textType?: 'regular' | 'medium';
}
