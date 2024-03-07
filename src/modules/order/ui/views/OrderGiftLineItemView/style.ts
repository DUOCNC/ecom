import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    height: DimentionUtils.scale(48),
    paddingVertical: DimentionUtils.scale(12),
    alignItems: 'center',
  },
  selected: {backgroundColor: colors.primary.o50},
  icon: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignContent: 'center',
    alignItems: 'center',
    marginRight: DimentionUtils.scale(8),
  },
  text: {
    flex: 1,
  },
  iconRight: {
    paddingLeft: DimentionUtils.scale(16),
  },
});
export default style;
