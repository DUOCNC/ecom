import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DimentionUtils.scale(16),
  },
  search: {
    marginHorizontal: DimentionUtils.scale(16),
    marginBottom: DimentionUtils.scale(8),
  },
  titleGroup: {
    marginTop: DimentionUtils.scale(16),
  },
  list: {
    paddingHorizontal: DimentionUtils.scale(16),
  },
  header: {
    paddingHorizontal: DimentionUtils.scale(16),
    height: DimentionUtils.scale(32),
    flexDirection: 'row',
    alignItems: 'center',
  },
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
