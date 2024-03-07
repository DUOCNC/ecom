import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {},
  header: {
    height: DimentionUtils.scale(48),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(24),
  },
  emptyItem: {
    paddingHorizontal: DimentionUtils.scale(24),
  },
  footer: {},
  footerBtn: {
    height: DimentionUtils.scale(48),
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});

export default style;
