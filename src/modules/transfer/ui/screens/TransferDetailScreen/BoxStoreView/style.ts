import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: DimentionUtils.scale(8),
  },
  label: {maxWidth: DimentionUtils.scale(100)},
  store: {
    backgroundColor: colors.base.white,
    paddingHorizontal: DimentionUtils.scale(16),
    marginTop: DimentionUtils.scale(8),
    paddingVertical: DimentionUtils.scale(16),
  },
  viewSubStatus: {
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(2),
    borderRadius: DimentionUtils.scale(30),
    borderWidth: DimentionUtils.scale(1),
  },
  txtStatus: {
    lineHeight: DimentionUtils.scale(20),
  },
  storeFrom: {
    paddingVertical: DimentionUtils.scale(10),
    paddingHorizontal: DimentionUtils.scale(20),
    borderRadius: DimentionUtils.scale(8),
    backgroundColor: colors.secondary.o100,
  },
  storeTo: {
    marginTop: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(10),
    paddingHorizontal: DimentionUtils.scale(20),
    borderRadius: DimentionUtils.scale(8),
    backgroundColor: colors.secondary.o100,
  },
});

export default style;
