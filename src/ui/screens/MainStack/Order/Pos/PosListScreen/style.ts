import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const PosListStyle = StyleSheet.create({
  icon: {
    marginLeft: normalize(10),
  },
  empty: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },
});

export {PosListStyle};
