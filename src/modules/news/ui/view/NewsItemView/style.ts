import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o300,
    borderRadius: DimentionUtils.scale(8),
    height: DimentionUtils.scale(96),
    marginBottom: DimentionUtils.scale(8),
  },
  imageView: {
    marginBottom: DimentionUtils.scale(8),
  },
  image: {
    borderTopLeftRadius: DimentionUtils.scale(8),
    borderBottomLeftRadius: DimentionUtils.scale(8),
    width: DimentionUtils.scale(128),
    height: DimentionUtils.scale(94),
    marginRight: DimentionUtils.scale(8),
    resizeMode: 'contain',
  },
  title: {
    width: '100%',
    paddingVertical: DimentionUtils.scale(10),
  },
  txtSku: {
    marginTop: DimentionUtils.scale(2),
  },
  txtSale: {
    marginTop: DimentionUtils.scale(2),
  },
  content: {
    marginBottom: DimentionUtils.scale(16),
    flexDirection: 'row',
  },
  shortContent: {
    width: '100%',
    paddingTop: DimentionUtils.scale(4),
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default style;
