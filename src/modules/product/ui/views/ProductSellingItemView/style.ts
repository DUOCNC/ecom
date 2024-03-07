import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    marginRight: DimentionUtils.scale(12),
  },
  imageView: {
    marginBottom: DimentionUtils.scale(8),
  },
  image: {
    borderRadius: DimentionUtils.scale(5),
  },
  txtVariant: {
    width: '100%',
    height: DimentionUtils.scale(36),
  },
  txtSku: {
    marginTop: DimentionUtils.scale(2),
  },
  txtSale: {
    marginTop: DimentionUtils.scale(2),
  },
});

export default style;
