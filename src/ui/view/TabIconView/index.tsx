import {DimentionUtils} from 'common-ui';
import React, {FC} from 'react';
import {Image, StyleSheet, ImageSourcePropType} from 'react-native';

interface IProps {
  focused: boolean;
  icon: ImageSourcePropType;
  activeIcon: any;
}

const TabIconView: FC<IProps> = (props: IProps) => {
  const {focused, icon, activeIcon} = props;
  return (
    <Image
      resizeMode="contain"
      style={style.icon}
      source={focused ? activeIcon : icon}
    />
  );
};

const style = StyleSheet.create({
  icon: {
    height: DimentionUtils.scale(20),
  },
});

export default TabIconView;
