import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: DimentionUtils.scale(16),
    height: DimentionUtils.scale(44),
  },
  containerLeft: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCenter: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRight: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBack: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;
