import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const SearchHistoryCustomerItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: normalize(16),
    height: normalize(48),
    alignItems: 'center',
  },
  txtContainer: {
    marginLeft: normalize(10),
    flex: 1,
  },
});

export {SearchHistoryCustomerItemStyle};
