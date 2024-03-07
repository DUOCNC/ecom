import React from 'react';
import {StatusBar, StatusBarStyle} from 'react-native';

type Props = {
  barStyle?: null | StatusBarStyle;
};

const CTStatusBar: React.FC<Props> = ({barStyle}) => {
  return (
    <StatusBar
      translucent
      animated
      barStyle={barStyle ? barStyle : 'light-content'}
      backgroundColor="transparent"
    />
  );
};

export default CTStatusBar;
