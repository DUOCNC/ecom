import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: DimentionUtils.scale(2),
    flexDirection: 'row',
    marginHorizontal: DimentionUtils.scale(16),
    backgroundColor: colors.secondary.o200,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: DimentionUtils.scale(8),
    paddingHorizontal: DimentionUtils.scale(16),
    borderRadius: 8,
  },
  tabLeft: {
    marginRight: DimentionUtils.scale(10),
  },
  selected: {
    backgroundColor: colors.primary.o400,
  },
});
export default style;
