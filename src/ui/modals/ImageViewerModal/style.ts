import {Colors} from 'assets/colors';
import {Platform, StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const ImageViewerStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  btnClose: {
    position: 'absolute',
    left: 20,
  },
  iconClose: {
    tintColor: Colors.White,
  },
  btnIndicator: {
    color: Colors.White,
  },
  index: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? normalize(38) : normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 9999,
    width: '100%',
  },
  indexText: {
    fontSize: normalize(24),
    color: Colors.White,
  },
});

export {ImageViewerStyle};
