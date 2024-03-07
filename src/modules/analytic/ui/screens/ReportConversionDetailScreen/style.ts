import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui/utils';
import {colors} from 'assets/v2';
export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    marginTop: DimentionUtils.scale(16),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    marginHorizontal: DimentionUtils.scale(16),
    borderColor: colors.secondary.o200,
    borderWidth: 1,
    borderRadius: DimentionUtils.scale(50),
    marginBottom: DimentionUtils.scale(8),
  },
  icon: {
    marginRight: DimentionUtils.scale(10),
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
  },
  right: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  name: {
    marginBottom: DimentionUtils.scale(10),
  },
  indicator: {},
  indicatorName: {
    minWidth: DimentionUtils.scale(120),
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: DimentionUtils.scale(8),
    justifyContent: 'space-between',
  },
  leftItem: {flexDirection: 'row'},
  rightItem: {flex: 1},
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
    },
  },
});
