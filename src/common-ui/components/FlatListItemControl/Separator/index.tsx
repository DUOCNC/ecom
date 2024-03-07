import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const style = StyleSheet.create({
  container: {
    height: DimentionUtils.scale(1),
    flexDirection: 'row',
    marginHorizontal: DimentionUtils.scale(16),
    backgroundColor: colors.secondary.o200,
  },
});

const Separator: React.FC = () => {
  return <View style={style.container} />;
};

export default Separator;
