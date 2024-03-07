import {Size} from 'assets/theme';
import CTText, {CTTextProps} from 'components/Base/CTText';
import React, {useMemo} from 'react';
import HeaderStyle from './style';

interface TextProps extends CTTextProps {
  level?: '1' | '2' | '3' | '4' | '5' | '0';
}

const Text: React.FC<TextProps> = ({level, style, ...rest}) => {
  const defaultStyle = useMemo(() => {
    switch (level) {
      case '0':
        return HeaderStyle.h0;
      case '1':
        return HeaderStyle.h1;
      case '3':
        return HeaderStyle.h3;
      case '2':
        return HeaderStyle.h2;
      case '4':
        return HeaderStyle.h4;
      case '5':
        return HeaderStyle.h5;
      default:
        return HeaderStyle.h3;
    }
  }, [level]);
  const fontSize = useMemo(() => {
    switch (level) {
      case '0':
        return Size.T0FontSize;
      case '1':
        return Size.T1FontSize;
      case '2':
        return Size.T2FontSize;
      case '4':
        return Size.T4FontSize;
      case '3':
      default:
        return Size.T3FontSize;
    }
  }, [level]);
  return <CTText fontSize={fontSize} style={[defaultStyle, style]} {...rest} />;
};

export default Text;
