import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {Colors} from 'assets/colors';

const style = StyleSheet.create({
  container: {
    marginTop: DimentionUtils.scale(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  title: {
    flex: 1,
    color: Colors.Gray900,
  },
  btnRight: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {},
  notFoundText: {
    width: '50%',
  },
  errorView: {
    paddingBottom: DimentionUtils.scale(390),
  },
});

export default style;
