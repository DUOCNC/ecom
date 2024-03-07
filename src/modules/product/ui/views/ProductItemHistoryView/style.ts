import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    height: DimentionUtils.scale(48),
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: DimentionUtils.scale(16),
  },
  icHistory: {
    width: DimentionUtils.scale(20),
    height: DimentionUtils.scale(20),
    marginHorizontal: DimentionUtils.scale(10),
  },
  btnContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  txt: {
    flex: 1,
  },
  icClose: {
    width: DimentionUtils.scale(10),
    height: DimentionUtils.scale(10),
  },
  btnDelete: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: DimentionUtils.scale(10),
  },
});

export default style;
