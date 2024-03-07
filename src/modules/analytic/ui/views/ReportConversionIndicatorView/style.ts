import {colors} from 'assets/v2';
import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui/utils';

export const style = StyleSheet.create({
  icon: {
    marginRight: DimentionUtils.scale(10),
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
  },
  right: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary.o200,
  },
  user: {
    flexDirection: 'row',
    paddingVertical: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginBottom: DimentionUtils.scale(10),
  },
  indicator: {},
  indicatorName: {
    minWidth: DimentionUtils.scale(124),
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: DimentionUtils.scale(10),
    justifyContent: 'space-between',
  },
  leftItem: {flexDirection: 'row'},
  rightItem: {
    flex: 1,
  },
  tag: {
    flexDirection: 'row',
    borderRadius: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(2),
    paddingHorizontal: DimentionUtils.scale(8),
    up: {
      backgroundColor: colors.success.o50,
    },
    down: {
      backgroundColor: colors.error.o50,
    },
    icon: {
      width: DimentionUtils.scale(12),
      height: DimentionUtils.scale(12),
      marginRight: DimentionUtils.scale(4),
    },
  },
});
