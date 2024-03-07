import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    height: DimentionUtils.scale(30),
    paddingVertical: DimentionUtils.scale(12),
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(8),
    backgroundColor: colors.secondary.o100,
  },
  selected: {borderColor: colors.primary.o500},
  icon: {
    alignContent: 'center',
    alignItems: 'center',
    marginRight: DimentionUtils.scale(6),
  },
  text: {
    height: DimentionUtils.scale(16),
  },
  icClose: {
    width: DimentionUtils.scale(20),
    height: DimentionUtils.scale(20),
  },
  icGift: {
    width: DimentionUtils.scale(17),
    height: DimentionUtils.scale(17),
  },
});
export default style;
