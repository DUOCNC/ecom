import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    marginRight: DimentionUtils.scale(12),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o300,
    borderRadius: DimentionUtils.scale(8),
  },
  imageView: {
    marginBottom: DimentionUtils.scale(8),
  },
  image: {
    borderTopLeftRadius: DimentionUtils.scale(5),
    borderTopRightRadius: DimentionUtils.scale(5),
  },
  title: {
    width: '100%',
    paddingTop: DimentionUtils.scale(4),
  },
  txtSku: {
    marginTop: DimentionUtils.scale(2),
  },
  txtSale: {
    marginTop: DimentionUtils.scale(2),
  },
  content: {
    padding: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(16),
  },
  shortContent: {
    width: '100%',
    maxHeight: DimentionUtils.scale(100),
    overflow: 'hidden',
  },
});

export default style;
