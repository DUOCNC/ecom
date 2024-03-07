import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const edgeBorderWidth = DimentionUtils.scale(2);
const absolute = -1;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
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
    width: DimentionUtils.scale(13),
    height: DimentionUtils.scale(13),
    borderColor: colors.base.white,
    position: 'absolute',
  },
  finder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DimentionUtils.scale(328),
    height: DimentionUtils.scale(328),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.base.white,
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
    width: DimentionUtils.scale(328),
    height: DimentionUtils.scale(328),
  },
  maskCenter: {
    display: 'flex',
    flexDirection: 'row',
    height: DimentionUtils.scale(328),
  },
  bottom: {
    flex: 2,
    alignItems: 'center',
  },
});

export default style;
