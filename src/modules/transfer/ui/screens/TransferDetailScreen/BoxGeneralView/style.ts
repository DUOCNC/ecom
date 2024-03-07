import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowGeneral: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: DimentionUtils.scale(8),
  },
  label: {maxWidth: DimentionUtils.scale(100)},
  general: {
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
});

export default style;
