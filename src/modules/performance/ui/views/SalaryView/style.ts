import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.primary.o50,
    height: DimentionUtils.scale(56),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
    justifyContent: 'space-between',
  },
  disable: {
    opacity: 0.5,
  },
  btnSee: {
    height: DimentionUtils.scale(32),
    backgroundColor: colors.primary.o100,
    paddingHorizontal: DimentionUtils.scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: DimentionUtils.scale(8),
  },
});

export default style;
