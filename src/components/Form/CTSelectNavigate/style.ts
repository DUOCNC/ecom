import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {Size} from 'assets/theme';
import {DimentionUtils} from 'common-ui';

const MAX_INPUT_HEIGHT = Size.DefaultFormInputHeight;
const PADDING_WIDTH = Size.DefaultFormInputPaddingHorizontal;
const DEFAULT_RADIUS = Size.DefaultFormInputRadius;

const style = StyleSheet.create({
  animatedStyle: {
    left: normalize(PADDING_WIDTH),
    position: 'absolute',
    zIndex: 10000,
  },
  container: {
    display: 'flex',
  },
  title: {
    opacity: 0.24,
    color: Colors.Black,
  },
  body: {
    height: DimentionUtils.scale(48),
    paddingVertical: normalize(10),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: DEFAULT_RADIUS,
    borderWidth: normalize(1),
  },
  input: {
    flex: 1,
    height: normalize(MAX_INPUT_HEIGHT),
    paddingHorizontal: normalize(PADDING_WIDTH),
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputDisplay: {
    marginTop: normalize(10),
    color: Colors.Black,
  },
  inputPadding: {
    paddingTop: normalize(10),
  },
  error: {
    color: Colors.Error,
    marginBottom: normalize(5),
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
  containerSelect: {
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
  },
  draggableIcon: {
    width: normalize(100),
  },
  rowTitle: {
    width: '100%',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(24),
  },
  rowSelect: {
    height: normalize(40),
    alignItems: 'center',
    flexDirection: 'row',
  },
  flatlist: {
    paddingHorizontal: normalize(20),
  },
  separator: {
    width: '100%',
    height: normalize(2),
    backgroundColor: Colors.Border,
  },
  inputSearch: {
    height: normalize(44),
    borderColor: Colors.Border,
    borderRadius: normalize(8),
    borderWidth: normalize(2),
    paddingLeft: normalize(30),
    paddingRight: normalize(5),
  },
  containerSearch: {
    paddingHorizontal: normalize(20),
    marginBottom: normalize(12),
  },
  icon: {
    top: normalize(10),
    left: normalize(26),
    position: 'absolute',
  },
  headerCalendar: {
    flex: 1,
  },
  placeholder: {
    color: Colors.subText,
    marginTop: 0,
  },
  disable: {
    backgroundColor: Colors.Border,
  },
});

export default style;
