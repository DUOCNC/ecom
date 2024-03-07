import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnError: {
    width: normalize(120),
  },
  emptyView: {
    backgroundColor: Colors.White,
    alignItems: 'center',
    paddingTop: '30%',
    flex: 1,
  },
});

export default style;
