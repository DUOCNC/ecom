import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container: {
    borderRadius: DimentionUtils.scale(8),
    backgroundColor: colors.base.white,
    padding: DimentionUtils.scale(16),
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    height: DimentionUtils.scale(48),
    backgroundColor: colors.primary.o500,
    borderRadius: DimentionUtils.scale(8),
    marginTop: DimentionUtils.scale(16),
  },
  btnClose: {},
  icon: {
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    paddingTop: DimentionUtils.scale(16),
    marginBottom: DimentionUtils.scale(18),
  },
  iconTime: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    marginRight: DimentionUtils.scale(10),
  },
  iconLocation: {
    marginTop: DimentionUtils.scale(-2),
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    marginRight: DimentionUtils.scale(10),
  },
  row: {
    flexDirection: 'row',
    height: DimentionUtils.scale(36),
    paddingRight: DimentionUtils.scale(16),
  },
  viewAddress: {
    height: 36,
  },
  address: {
    paddingRight: DimentionUtils.scale(16),
  },
  time: {
    paddingTop: DimentionUtils.scale(4),
  },
});

export default Style;
