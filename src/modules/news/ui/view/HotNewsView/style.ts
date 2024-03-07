import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    height: DimentionUtils.scale(346),
  },
  header: {
    paddingHorizontal: DimentionUtils.scale(16),
    height: DimentionUtils.scale(32),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DimentionUtils.scale(8),
  },
  headerTitle: {
    flex: 1,
    paddingTop: DimentionUtils.scale(4),
  },
  headerIcon: {
    marginRight: DimentionUtils.scale(8),
  },
  list: {
    marginLeft: DimentionUtils.scale(16),
    flex: 1,
  },
});

export default style;
