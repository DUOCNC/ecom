import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginHorizontal: DimentionUtils.scale(16),
    marginBottom: DimentionUtils.scale(8),
  },
  titleGroup: {
    marginTop: DimentionUtils.scale(16),
  },
  list: {
    paddingRight: DimentionUtils.scale(16),
  },
  header: {
    paddingLeft: DimentionUtils.scale(16),
    height: DimentionUtils.scale(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerLeft: {
    // flex: 1,
  },
  btnSeeMore: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
  },
});

export default style;
