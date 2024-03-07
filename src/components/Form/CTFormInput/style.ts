import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {Size} from 'assets/theme';

const MAX_INPUT_HEIGHT = Size.DefaultFormInputHeight;
const PADDING_WIDTH = Size.DefaultFormInputPaddingHorizontal;
const DEFAULT_RADIUS = Size.DefaultFormInputRadius;

const CTInputStyle = StyleSheet.create({
  animatedStyle: {
    left: PADDING_WIDTH,
    position: 'absolute',
    zIndex: 10000,
  },
  container: {
    display: 'flex',
  },
  title: {
    color: Colors.SubText2,
  },
  body: {
    height: MAX_INPUT_HEIGHT,
    paddingVertical: normalize(10),
    borderWidth: normalize(1),
    borderRadius: DEFAULT_RADIUS,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: MAX_INPUT_HEIGHT,
    paddingHorizontal: PADDING_WIDTH,
    color: Colors.Black,
    fontSize: 15,
  },
  inputPadding: {
    paddingTop: normalize(10),
  },
  error: {
    color: Colors.Error,
    flexWrap: 'wrap',
  },
  btnPassword: {
    width: normalize(35),
    height: normalize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  hide: {
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.24)',
    padding: 0,
  },
  borderPassword: {
    width: normalize(2),
    height: normalize(30),
    backgroundColor: Colors.Border,
  },
  viewError: {
    marginTop: normalize(8),
    paddingHorizontal: PADDING_WIDTH,
  },
  disable: {
    backgroundColor: Colors.Border,
  },
});

export {CTInputStyle};
