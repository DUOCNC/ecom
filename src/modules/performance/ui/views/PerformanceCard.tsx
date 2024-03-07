import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {}

const PerformanceCard: React.FC<Props> = ({children}) => {
  return <View style={style.container}>{children}</View>;
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.base.white,
    borderRadius: DimentionUtils.scale(24),
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(20),
    shadowColor: '#A8A8A8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default PerformanceCard;
