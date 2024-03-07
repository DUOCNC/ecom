import React, {useMemo} from 'react';
import Container from '../Container';
import {StatusBar} from 'common-ui/core';
import {ScreenProps} from 'common-ui/types';
import {useTheme} from 'common-ui/hook';

const Screen: React.FC<ScreenProps> = ({
  barStyle,
  children,
  backgroundColor,
}) => {
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

export default Screen;
