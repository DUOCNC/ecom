import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {Size} from 'assets/theme';

const MAX_INPUT_HEIGHT = normalize(36);
const PADDING_WIDTH = Size.DefaultFormInputPaddingHorizontal;
const DEFAULT_RADIUS = normalize(8);

const Styles = StyleSheet.create({
  item: {
    paddingLeft: normalize(24),
    paddingRight: normalize(16),
    paddingVertical: normalize(12),
  },
  animatedStyle: {
    left: normalize(PADDING_WIDTH),
    position: 'absolute',
    zIndex: 10000,
  },
  container: {alignItems: 'flex-end'},
  title: {
    opacity: 0.24,
    color: Colors.Black,
  },
  body: {
    height: normalize(MAX_INPUT_HEIGHT),
    borderWidth: normalize(1),
    borderRadius: DEFAULT_RADIUS,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.Gray50,
    paddingHorizontal: normalize(10),
    borderColor: Colors.Gray300,
  },
  input: {},
  inputDisplay: {
    color: Colors.Text,
  },
  error: {
    color: Colors.Error,
    marginBottom: normalize(5),
  },
  btnIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(16),
    height: normalize(16),
    paddingLeft: normalize(8),
  },
  hide: {
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.24)',
    padding: 0,
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
  titleContent: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    backgroundColor: Colors.Primary25,
  },
});

export {Styles};
