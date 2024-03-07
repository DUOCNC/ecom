import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const SearchButtonStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F5',
    height: normalize(40),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: normalize(8),
    borderRadius: normalize(5),
  },
  txtSearch: {
    color: Colors.subText,
    marginLeft: normalize(4),
    flex: 1,
  },
});

export {SearchButtonStyle};
