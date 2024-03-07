import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    marginLeft: DimentionUtils.scale(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: DimentionUtils.scale(32),
    justifyContent: 'space-between',
    marginBottom: DimentionUtils.scale(8),
  },
  txt: {
    marginBottom: DimentionUtils.scale(8),
  },
});

export default style;
