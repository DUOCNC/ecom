import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  quantityControl: {
    flexDirection: 'row',
    marginLeft: DimentionUtils.scale(8),
  },
  right: {
    paddingLeft: DimentionUtils.scale(12),
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: DimentionUtils.scale(48),
    paddingVertical: DimentionUtils.scale(14),
    alignItems: 'center',
    paddingRight: DimentionUtils.scale(16),
    paddingLeft: DimentionUtils.scale(24),
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
});

export {Style};
