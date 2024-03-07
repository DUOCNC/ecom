import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui/utils';
import {StyleSheet} from 'react-native';

const BorderColor = '#E8EAEB';

const CTKeyboardStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.base.white,
    width: '85%',
    alignSelf: 'center',
    paddingTop: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(10),
  },
  header: {
    paddingHorizontal: DimentionUtils.scale(16),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: DimentionUtils.scale(50),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: DimentionUtils.scale(24),
  },
  keyboard: {
    width: '100%',
    borderTopWidth: DimentionUtils.scale(1),
    borderBottomWidth: DimentionUtils.scale(1),
    borderTopColor: colors.secondary.o100,
    borderBottomColor: BorderColor,
  },
  rowKeyboard: {
    flexDirection: 'row',
  },
  verticalLine: {
    width: DimentionUtils.scale(1),
    backgroundColor: BorderColor,
  },
  hotizontalLine: {
    height: DimentionUtils.scale(1),
    backgroundColor: BorderColor,
  },
  viewNumPad: {
    height: DimentionUtils.scale(60),
    flex: 1,
  },
  btnKeyboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: DimentionUtils.scale(60),
  },
  btnNumPad: {
    flex: 1,
  },
  txtNumPad: {
    color: colors.secondary.o500,
  },
  bottom: {
    flexDirection: 'row',
    height: DimentionUtils.scale(48),
  },
  btnConfirm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLine: {
    width: DimentionUtils.scale(1),
    backgroundColor: BorderColor,
  },
  txtConfirm: {
    color: colors.primary.o500,
  },
  btnDeleteAll: {
    right: DimentionUtils.scale(25),
    position: 'absolute',
  },
  iconDisable: {
    tintColor: colors.secondary.o200,
  },
});

export default CTKeyboardStyle;
