import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    marginBottom: DimentionUtils.scale(20),
  },
  header: {
    paddingHorizontal: DimentionUtils.scale(16),
    height: DimentionUtils.scale(32),
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    marginTop: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
  },
});

export default style;
