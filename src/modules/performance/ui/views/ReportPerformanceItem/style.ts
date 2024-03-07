import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    width: DimentionUtils.scale(90),
    alignItems: 'center',
  },
  txt: {
    marginTop: DimentionUtils.scale(4),
  },
  icon: {
    width: DimentionUtils.scale(16),
    height: DimentionUtils.scale(16),
  },
  value: {
    marginTop: DimentionUtils.scale(4),
  },
});

export default style;
