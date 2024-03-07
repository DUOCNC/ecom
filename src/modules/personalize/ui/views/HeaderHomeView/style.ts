import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  headerStore: {
    height: DimentionUtils.scale(48),
    width: DimentionUtils.scale(48),
    borderRadius: DimentionUtils.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.base.white,
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: DimentionUtils.scale(8),
  },
  iconStore: {
    tintColor: colors.primary.o500,
  },
  btnStore: {
    marginTop: DimentionUtils.scale(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icDown: {
    tintColor: colors.base.white,
  },
  textStore: {
    paddingTop: DimentionUtils.scale(3),
  },
});

export default style;
