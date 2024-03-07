import {normalize} from 'utils/DimensionsUtils';
import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';

const CTButtonIconStyle = StyleSheet.create({
  viewButton: {
    padding: normalize(5),
    backgroundColor: Colors.Transparent,
  },
  iconDisable: {
    opacity: 0.4,
  },
});

export {CTButtonIconStyle};
