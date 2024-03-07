import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import style from './style';

interface HeaderProps {
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const top = useSafeAreaInsets().top;
  return (
    <View
      style={[
        style.container,
        {
          paddingTop: top,
        },
      ]}>
      {props.children}
    </View>
  );
};

export default Header;
