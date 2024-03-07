import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui/utils';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.base.white,
    zIndex: 100000,
    shadowColor: '#A8A8A8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  headerSearch: {
    padding: DimentionUtils.scale(16),
    paddingBottom: DimentionUtils.scale(8),
  },
  scrollView: {
    flex: 1,
    paddingVertical: DimentionUtils.scale(20),
  },
});

export default style;
