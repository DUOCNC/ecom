import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const HEIGHT = normalize(36);

const SearchInputStyle = StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: Colors.Gray200,
    borderRadius: HEIGHT,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: normalize(14),
  },
  input: {
    flex: 1,
    paddingHorizontal: normalize(10),
    color: Colors.Gray500,
  },
  viewBarCode: {
    paddingLeft: normalize(14),
    borderLeftWidth: normalize(1),
    borderColor: '#D3D5D7',
  },
  icon: {
    width: normalize(20),
    height: normalize(20),
  },
});

export default SearchInputStyle;
