import React, {useMemo} from 'react';
import {TypographyProps} from '../../types';
import {Text} from '../../core';
import TypographyFactory from './TypographyFactory';

const Typography: React.FC<TypographyProps> = ({
  type = 'h4',
  text,
  textType,
  ...rest
}) => {
  let defaultProps = useMemo(() => TypographyFactory.get(type), [type]);
  let fontWeight = useMemo<'400' | '500'>(() => {
    if (!textType || textType === 'regular') {
      return '400';
    }
    return '500';
  }, [textType]);
  return (
    <Text {...defaultProps} fontWeight={fontWeight} text={text} {...rest} />
  );
};

export default Typography;
