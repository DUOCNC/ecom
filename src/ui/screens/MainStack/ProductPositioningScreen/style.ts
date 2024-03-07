import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSearch: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingBottom: DimentionUtils.scale(8),
    paddingTop: DimentionUtils.scale(-8),
  },
  scrollView: {
    flex: 1,
    paddingVertical: DimentionUtils.scale(20),
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(12),
    paddingBottom: DimentionUtils.scale(12),
  },
});

export default style;
