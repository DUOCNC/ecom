import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  formSearch: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingBottom: DimentionUtils.scale(8),
  },
  button: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;
