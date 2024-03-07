import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const style = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: DimentionUtils.scale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary.o200,
  },
  highlight: {
    color: Colors.Gray900,
  },
  text: {
    color: Colors.Gray500,
    paddingRight: DimentionUtils.scale(16),
    fontSize: 8,
  },
  value: {
    color: Colors.Gray900,
  },
  highlightValue: {
    color: Colors.Primary,
  },
  selected: {backgroundColor: colors.primary.o50},
  count: {
    minWidth: DimentionUtils.scale(100),
  },
  countItem: {
    backgroundColor: Colors.White,
  },
  styleText: {
    paddingHorizontal: normalize(10),
  },
  itemText: {
    flexGrow: 1,
    height: DimentionUtils.scale(48),
    lineHeight: DimentionUtils.scale(48),
    paddingVertical: DimentionUtils.scale(12),
    paddingLeft: DimentionUtils.scale(24),
    display: 'flex',
  },
});
export default style;
