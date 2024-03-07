import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    marginBottom: DimentionUtils.scale(20),
  },
  header: {
    paddingHorizontal: DimentionUtils.scale(16),
    height: DimentionUtils.scale(32),
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {},
  headerLeft: {
    flex: 1,
  },
  btnSeeMore: {
    height: '100%',
    paddingHorizontal: DimentionUtils.scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;
