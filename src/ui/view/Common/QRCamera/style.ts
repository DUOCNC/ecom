import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const BaseCameraStyle = StyleSheet.create({
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

const edgeBorderWidth = normalize(2);
const absolute = -1;
const FocusStyle = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  topRight: {
    borderRightWidth: edgeBorderWidth,
    borderTopWidth: edgeBorderWidth,
    top: absolute,
    right: absolute,
  },
  topLeft: {
    borderLeftWidth: edgeBorderWidth,
    borderTopWidth: edgeBorderWidth,
    top: absolute,
    left: absolute,
  },
  bottomRight: {
    borderRightWidth: edgeBorderWidth,
    borderBottomWidth: edgeBorderWidth,
    bottom: absolute,
    right: absolute,
  },
  bottomLeft: {
    borderLeftWidth: edgeBorderWidth,
    borderBottomWidth: edgeBorderWidth,
    bottom: absolute,
    left: absolute,
  },
  defaultStyle: {
    width: normalize(13),
    height: normalize(13),
    borderColor: Colors.White,
    position: 'absolute',
  },
  finder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(328),
    height: normalize(328),
    borderWidth: normalize(1),
    borderColor: Colors.White,
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  maskRow: {
    width: '100%',
  },
  applyMaskFrameStyle: {
    backgroundColor: 'rgba(0,0,0,0.32)',
    flex: 1,
  },
  maskInner: {
    backgroundColor: 'transparent',
    width: normalize(328),
    height: normalize(328),
  },
  maskCenter: {
    display: 'flex',
    flexDirection: 'row',
    height: normalize(328),
  },
  bottom: {
    flex: 2,
    alignItems: 'center',
  },
});

export {BaseCameraStyle, FocusStyle};
