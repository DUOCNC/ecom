import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const HEIGHT = normalize(36);

const SearchButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.Gray100,
    height: HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: normalize(8),
    borderRadius: HEIGHT,
  },
  icon: {
    width: normalize(35),
    height: normalize(35),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSearch: {
    color: Colors.Gray500,
    marginLeft: normalize(4),
    flex: 1,
  },
  btnSearch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewBarCode: {
    paddingLeft: normalize(14),
    borderLeftWidth: normalize(1),
    borderColor: '#D3D5D7',
  },
});

export {SearchButtonStyle};
