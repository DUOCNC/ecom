import React, {useMemo} from 'react';
import Container from '../Container';
import {StatusBar} from 'common-ui/core';
import {TabProps} from 'common-ui/types';
import {useTheme} from 'common-ui/hook';

const Tab: React.FC<TabProps> = ({barStyle, children, backgroundColor}) => {
  const {background} = useTheme();
  const bgColorValue = useMemo(
    () => (backgroundColor ? backgroundColor : background),
    [background, backgroundColor],
  );
  return (
    <Container backgroundColor={bgColorValue}>
      <StatusBar barStyle={barStyle} />
      {children}
    </Container>
  );
};

export default Tab;
