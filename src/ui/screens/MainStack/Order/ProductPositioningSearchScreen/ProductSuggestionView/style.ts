import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  item: {
    height: DimentionUtils.scale(48),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(24),
  },
  flatlist: {
    paddingTop: DimentionUtils.scale(8),
  },
});

export default style;
