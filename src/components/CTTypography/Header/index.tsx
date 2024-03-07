import {Size} from 'assets/theme';
import CTText, {CTTextProps} from 'components/Base/CTText';
import React, {useMemo} from 'react';
import HeaderStyle from './style';

interface CTTextHeaderProps extends CTTextProps {
  level?: '1' | '2' | '3' | '4';
}

const Header: React.FC<CTTextHeaderProps> = ({level, style, ...rest}) => {
  const defaultStyle = useMemo(() => {
    switch (level) {
      case '1':
        return HeaderStyle.h1;
      case '2':
        return HeaderStyle.h2;
      case '3':
      default:
        return HeaderStyle.h3;
    }
  }, [level]);
  const fontSize = useMemo(() => {
    switch (level) {
      case '1':
        return Size.H1FontSize;
      case '2':
        return Size.H2FontSize;
      case '4':
        return Size.H4FontSize;
      case '3':
      default:
        return Size.H3FontSize;
    }
  }, [level]);
  return <CTText fontSize={fontSize} style={[defaultStyle, style]} {...rest} />;
};

export default Header;
