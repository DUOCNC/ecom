import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenHeaderProps} from 'common-ui/types';
import {colors} from 'assets/v2';
import defaultStyle from './style';

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  backgroundColor = colors.base.white,
  children,
  style,
}) => {
  const top = useSafeAreaInsets().top;
  return (
    <View
      style={[
        {
          paddingTop: top,
          backgroundColor: backgroundColor,
        },
        defaultStyle.header,
        style,
      ]}>
      {children}
    </View>
  );
};

export default ScreenHeader;
