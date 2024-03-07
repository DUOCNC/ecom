import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    height: DimentionUtils.scale(48),
    paddingVertical: DimentionUtils.scale(12),
    alignItems: 'center',
    paddingRight: DimentionUtils.scale(16),
    paddingLeft: DimentionUtils.scale(24),
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary.o200,
  },
  highlight: {
    color: Colors.Gray900,
  },
  text: {
    color: Colors.Gray500,
    flex: 1,
    paddingRight: DimentionUtils.scale(16),
  },
  value: {
    color: Colors.Gray900,
  },
  highlightValue: {
    color: Colors.Primary,
  },
  selected: {backgroundColor: colors.primary.o50},
});
export default style;
