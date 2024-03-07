import {TextProps, TypographyType} from '../../types';

export default class TypographyFactory {
  private constructor() {}

  static get(type: TypographyType): TextProps {
    let props: TextProps = {};
    if (type === 'h0') {
      props.size = 30;
      props.lineHeight = 38;
    }
    if (type === 'h1') {
      props.size = 24;
      props.lineHeight = 32;
    }
    if (type === 'h2') {
      props.size = 20;
      props.lineHeight = 28;
    }
    if (type === 'h3') {
      props.size = 16;
      props.lineHeight = 20;
    }
    if (type === 'h4') {
      props.size = 14;
      props.lineHeight = 18;
    }
    if (type === 'h5') {
      props.size = 12;
      props.lineHeight = 16;
    }
    if (type === 'h6') {
      props.size = 10;
      props.lineHeight = 14;
    }
    return props;
  }
}
