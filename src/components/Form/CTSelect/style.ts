import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {Size} from 'assets/theme';

const MAX_INPUT_HEIGHT = Size.DefaultFormInputHeight;
const PADDING_WIDTH = Size.DefaultFormInputPaddingHorizontal;
const DEFAULT_RADIUS = Size.DefaultFormInputRadius;
const MAX_RADIUS_MODAL = normalize(20);

const CTSelectStyle = StyleSheet.create({
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
    height: normalize(MAX_INPUT_HEIGHT),
    paddingVertical: normalize(10),
    borderWidth: normalize(1),
    borderRadius: DEFAULT_RADIUS,
    alignItems: 'center',
    flexDirection: 'row',
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
    borderTopLeftRadius: MAX_RADIUS_MODAL,
    borderTopRightRadius: MAX_RADIUS_MODAL,
  },
  draggableIcon: {
    width: normalize(40),
    height: normalize(4),
  },
  rowTitle: {
    width: '100%',
    height: normalize(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Colors.Border,
    borderBottomWidth: normalize(1),
  },
  rowSelect: {
    height: normalize(48),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: normalize(16),
  },
  flatList: {
    flex: 1,
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
    marginBottom: normalize(8),
    marginTop: normalize(16),
    height: normalize(36),
  },
  icon: {
    top: normalize(10),
    left: normalize(26),
    position: 'absolute',
  },
  containerModal: {
    flex: 1,
  },
  viewError: {
    marginTop: normalize(8),
    paddingHorizontal: PADDING_WIDTH,
  },
  disable: {
    backgroundColor: Colors.Border,
  },
  customBackground: {
    backgroundColor: Colors.White,
    borderWidth: normalize(1),
    borderColor: Colors.Border,
  },
  emptyText: {
    marginTop: normalize(8),
    marginHorizontal: normalize(16),
    color: Colors.SubText2,
  },
  select: {
    backgroundColor: Colors.Blue10,
  },
});

export {CTSelectStyle};
