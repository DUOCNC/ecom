import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui/utils';
import {StyleSheet} from 'react-native';

const HEIGHT = DimentionUtils.scale(36);
const HOTIZONRAL_PADDING = DimentionUtils.scale(12);
const HOTIZONRAL_PADDING_TXT = DimentionUtils.scale(8);
const DARK_COLOR = colors.secondary.o400;
const LIGHT_COLOR = colors.secondary.o400;
const BG_LIGHT_COLOR = colors.base.white;
const BG_DARK_COLOR = colors.secondary.o200;
const ICON = DimentionUtils.scale(24);

const style = StyleSheet.create({
  container: {
    height: HEIGHT,
    alignItems: 'center',
    borderRadius: HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: HOTIZONRAL_PADDING,
  },
  dark: {
    backgroundColor: BG_DARK_COLOR,
  },
  light: {
    backgroundColor: BG_LIGHT_COLOR,
  },
  icon: {
    width: ICON,
    height: ICON,
  },
  iconDark: {
    tintColor: DARK_COLOR,
  },
  iconLight: {
    tintColor: LIGHT_COLOR,
  },
  txt: {
    marginLeft: HOTIZONRAL_PADDING_TXT,
    flex: 1,
  },
  rightView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rule: {
    height: DimentionUtils.scale(24),
    backgroundColor: colors.secondary.o300,
    width: DimentionUtils.scale(1),
    marginRight: DimentionUtils.scale(12),
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default style;
