import React from 'react';
import {View} from 'react-native';
import {ScreenBottomProps} from 'common-ui/types';
import {colors} from 'assets/v2';
import defaultStyle from './style';

const ScreenBottom: React.FC<ScreenBottomProps> = ({
  backgroundColor = colors.base.white,
  children,
  style,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor,
        },
        defaultStyle.bottom,
        style,
      ]}>
      {children}
    </View>
  );
};

export default ScreenBottom;
