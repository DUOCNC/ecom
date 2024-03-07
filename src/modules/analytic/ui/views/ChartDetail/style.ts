import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const ChartDetailStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  left: {
    flexDirection: 'row',
    text: {color: Colors.Gray700},
    up: {
      color: Colors.Success700,
      paddingLeft: normalize(4),
    },
    down: {
      color: Colors.Red,
      paddingLeft: normalize(4),
    },
  },
  rate: {
    flexDirection: 'row',
    paddingLeft: normalize(8),
    alignItems: 'center',
  },
  right: {
    color: Colors.Blue,
  },
});
export {ChartDetailStyle};
