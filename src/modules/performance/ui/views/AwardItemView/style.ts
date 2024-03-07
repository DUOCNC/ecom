import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: DimentionUtils.scale(16),
  },
  right: {
    flex: 1,
    marginLeft: DimentionUtils.scale(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: DimentionUtils.scale(32),
    justifyContent: 'space-between',
  },
  txt: {
    marginBottom: DimentionUtils.scale(8),
  },
});

export default style;
