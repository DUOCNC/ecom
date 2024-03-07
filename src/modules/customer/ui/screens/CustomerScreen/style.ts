import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const CustomerStyle = StyleSheet.create({
  headerSearch: {
    backgroundColor: Colors.White,
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(8),
  },
  flatList: {
    paddingTop: normalize(8),
  },
});

export {CustomerStyle};
