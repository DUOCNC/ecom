import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const SelectStoreViewStyle = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.White,
  },
  rowStore: {
    height: normalize(45),
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
  },
  viewStore: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icStore: {
    marginRight: normalize(10),
  },
  nameStore: {
    color: Colors.Blue,
  },
});

export {SelectStoreViewStyle};
