import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {},
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
    marginBottom: DimentionUtils.scale(12),
  },
  btnAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: DimentionUtils.scale(8),
  },
  txtAdd: {
    marginLeft: DimentionUtils.scale(8),
  },
  iconClose: {
    width: DimentionUtils.scale(13),
    height: DimentionUtils.scale(13),
  },
  viewLoading: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.25)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowOther: {
    marginTop: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtPoint: {
    flex: 1,
  },
  groupView: {
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(2),
    backgroundColor: colors.warning.o50,
    borderRadius: DimentionUtils.scale(16),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.warning.o200,
  },
  itemCustomer: {
    marginTop: DimentionUtils.scale(12),
    backgroundColor: colors.secondary.o200,
    borderRadius: 8,
  },
  checkbox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DimentionUtils.scale(12),
  },
  mr4: {
    marginRight: DimentionUtils.scale(6),
  },
});

export default style;
