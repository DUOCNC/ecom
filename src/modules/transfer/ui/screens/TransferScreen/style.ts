import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DimentionUtils.scale(16),
  },
  search: {
    marginHorizontal: DimentionUtils.scale(16),
    marginBottom: DimentionUtils.scale(8),
  },
});

export default style;
