import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  container: {
    borderRadius: DimentionUtils.scale(30),
    paddingVertical: DimentionUtils.scale(2),
    paddingHorizontal: DimentionUtils.scale(12),
    borderWidth: 1,
  },
});

export default style;
