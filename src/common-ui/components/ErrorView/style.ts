import {DimentionUtils} from 'common-ui/utils';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(32),
  },
  txtTitle: {
    marginBottom: DimentionUtils.scale(8),
  },
  txtSubTitle: {
    marginBottom: DimentionUtils.scale(16),
    textAlign: 'center',
  },
  image: {
    height: DimentionUtils.scale(180),
  },
  imageSmall: {
    height: DimentionUtils.scale(125),
  },
});

export default style;
