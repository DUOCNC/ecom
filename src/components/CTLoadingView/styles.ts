import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const styles = StyleSheet.create({
  viewLoading: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: normalize(25),
    resizeMode: 'contain',
  },
  loading: {
    position: 'absolute',
  },
});

export default styles;
