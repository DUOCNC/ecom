import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const HEIGHT = normalize(36);

const SearchInputBarcodeStyle = StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: Colors.Background,
    borderTopLeftRadius: HEIGHT,
    borderBottomLeftRadius: HEIGHT,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    paddingHorizontal: normalize(10),
  },
  imgSearch: {
    marginLeft: normalize(14),
  },
  iconClear: {
    marginRight: normalize(10),
  },
});

export default SearchInputBarcodeStyle;
