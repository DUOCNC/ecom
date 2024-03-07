import {normalize} from 'utils/DimensionsUtils';
import {StyleSheet} from 'react-native';

const MyYodyStyle = StyleSheet.create({
  container: {
    width: '100%',
  },
  img: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    borderRadius: normalize(5),
  },
});

export {MyYodyStyle};
