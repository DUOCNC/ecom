import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  buttonActionContainer: {
    paddingVertical: DimentionUtils.scale(8),
    paddingHorizontal: DimentionUtils.scale(16),
    borderWidth: 1,
  },
  text: {
    alignSelf: 'center',
    flex: 1,
  },
});

export default style;
