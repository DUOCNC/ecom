import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  modal: {
    margin: 0,
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  indicator: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    height: DimentionUtils.scale(48),
    zIndex: 9999,
    width: '100%',
  },
  buttonClose: {
    padding: DimentionUtils.scale(4),
    position: 'absolute',
    zIndex: 1000,
    left: DimentionUtils.scale(16),
  },
  icClose: {
    tintColor: colors.base.white,
    width: DimentionUtils.scale(13),
    height: DimentionUtils.scale(13),
  },
});

export default style;
