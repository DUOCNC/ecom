import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  container: {
    padding: DimentionUtils.scale(16),
  },
  row: {
    marginTop: DimentionUtils.scale(4),
    flexDirection: 'row',
  },
  rowFirst: {
    marginTop: 0,
  },
  txtName: {
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
  rule: {
    marginHorizontal: DimentionUtils.scale(8),
    width: DimentionUtils.scale(1),
    height: '100%',
    backgroundColor: colors.secondary.o200,
  },
});

export default style;
