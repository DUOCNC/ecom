import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 100000,
    width: '100%',
  },
  headerContainer: {
    height: DimentionUtils.scale(48),
    paddingHorizontal: DimentionUtils.scale(16),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
  },
  iconClose: {
    tintColor: colors.base.white,
    width: DimentionUtils.scale(13),
    height: DimentionUtils.scale(13),
  },
  iconFlash: {
    width: DimentionUtils.scale(13),
  },
});

export default style;
