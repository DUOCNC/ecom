import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    marginTop: DimentionUtils.scale(20),
    marginBottom: DimentionUtils.scale(10),
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
  },
  headerIcon: {
    marginRight: DimentionUtils.scale(8),
  },
  list: {
    marginTop: DimentionUtils.scale(12),
    marginLeft: DimentionUtils.scale(16),
    flex: 1,
  },
  statusContainer: {
    maxHeight: DimentionUtils.scale(66),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  statusElement: {
    borderWidth: 1,
    borderRadius: DimentionUtils.scale(40),
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(8),
    marginRight: DimentionUtils.scale(12),
  },
});

export default style;
