import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui/utils';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  container: {
    padding: DimentionUtils.scale(16),
    borderBottomWidth: DimentionUtils.scale(1),
    borderBottomColor: colors.secondary.o200,
  },
  btnSku: {
    marginTop: DimentionUtils.scale(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconArrow: {
    marginLeft: DimentionUtils.scale(8),
    tintColor: colors.primary.o500,
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
  },
  iconArrowTransform: {
    transform: [{rotate: '180deg'}],
  },
  viewBarCode: {
    marginTop: DimentionUtils.scale(8),
  },
  txtBarcode: {
    marginTop: DimentionUtils.scale(4),
  },
  rowPrice: {
    marginTop: DimentionUtils.scale(8),
  },
  rowInventory: {
    marginTop: DimentionUtils.scale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  rule: {
    marginHorizontal: DimentionUtils.scale(8),
    width: DimentionUtils.scale(1),
    height: '100%',
    backgroundColor: colors.secondary.o200,
  },
  fontWeight: {
    fontWeight: '900',
  },
});

export default style;
