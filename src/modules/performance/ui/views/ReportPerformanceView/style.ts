import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: DimentionUtils.scale(12),
  },
  rowMargin: {
    marginBottom: DimentionUtils.scale(12),
  },
  rpCustomer: {
    tintColor: '#9B8AFB',
  },
});

export default style;
