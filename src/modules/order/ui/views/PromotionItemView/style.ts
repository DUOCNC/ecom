import {colors} from 'assets/v2';
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
    paddingTop: DimentionUtils.scale(4),
    height: DimentionUtils.scale(40),
    lineHeight: DimentionUtils.scale(20),
  },
  viewSelect: {
    width: DimentionUtils.scale(46),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewApply: {
    justifyContent: 'center',
  },
  apply: {
    height: DimentionUtils.scale(24),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o300,
    borderRadius: DimentionUtils.scale(8),
    width: DimentionUtils.scale(56),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default style;
