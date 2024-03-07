import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import style from './style';

interface CTToolbarProps {
  showBack?: boolean;
  children?: ReactNode;
}

const CTToolbar: React.FC<CTToolbarProps> = (props: CTToolbarProps) => {
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

export default CTToolbar;
