import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  image: {
    width: DimentionUtils.scale(352),
    height: DimentionUtils.scale(100),
    marginBottom: DimentionUtils.scale(8),
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    width: DimentionUtils.scale(250),
    height: DimentionUtils.scale(83),
    marginLeft: DimentionUtils.scale(89),
    paddingLeft: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
  },
  text: {flex: 1},
  txtPromotion: {
    marginTop: DimentionUtils.scale(2),
  },
  txtTitle: {
    height: DimentionUtils.scale(24),
  },
  viewSelect: {
    width: DimentionUtils.scale(46),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flexDirection: 'row'},
  pt4: {paddingTop: DimentionUtils.scale(4)},
  itemDiscount: {
    alignItems: 'flex-end',
  },
});
export default style;
