import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  header: {
    height: DimentionUtils.scale(48),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(16),
  },
  txtHeader: {
    flex: 1,
  },
  txtTitle: {
    flex: 1,
  },
  btnBarcode: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    paddingHorizontal: DimentionUtils.scale(16),
  },
  btnAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: DimentionUtils.scale(8),
  },
  txtAdd: {
    marginLeft: DimentionUtils.scale(8),
  },
  noteInput: {
    height: DimentionUtils.scale(80),
    borderRadius: DimentionUtils.scale(5),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o200,
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(10),
    backgroundColor: colors.secondary.o200,
  },
  container: {
    marginBottom: DimentionUtils.scale(16),
  },
});

export default style;
