import React from 'react';
import {StatusBar as RNStatusBar, StatusBarProps} from 'react-native';

const StatusBar: React.FC<StatusBarProps> = ({barStyle, ...rest}) => {
  return (
    <RNStatusBar
      translucent
      barStyle={barStyle ? barStyle : 'light-content'}
      backgroundColor="transparent"
      {...rest}
    />
  );
};

export default StatusBar;
