import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    paddingTop: DimentionUtils.scale(16),
    flex: 1,
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
    marginBottom: DimentionUtils.scale(4),
  },
  btnSeeMore: {
    height: '100%',
    paddingHorizontal: DimentionUtils.scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.Gray200,
    marginHorizontal: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(8),
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.Primary,
    paddingBottom: DimentionUtils.scale(8),
    paddingTop: DimentionUtils.scale(8),
    borderRadius: DimentionUtils.scale(8),
    color: Colors.White,
  },
  optionTransparent: {
    backgroundColor: 'transparent',
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
  },
});

export default style;
