import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    height: DimentionUtils.scale(48),
    paddingVertical: DimentionUtils.scale(12),
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(16),
    marginHorizontal: DimentionUtils.scale(16),
    borderWidth: 1,
    borderColor: colors.secondary.o200,
    borderRadius: DimentionUtils.scale(8),
    backgroundColor: colors.base.white,
  },
  selected: {borderColor: colors.primary.o500},
  icon: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignContent: 'center',
    alignItems: 'center',
    marginRight: DimentionUtils.scale(8),
  },
  text: {
    flex: 1,
    paddingRight: DimentionUtils.scale(16),
  },
  disabled: {
    tintColor: colors.secondary.o200,
  },
});
export default style;
