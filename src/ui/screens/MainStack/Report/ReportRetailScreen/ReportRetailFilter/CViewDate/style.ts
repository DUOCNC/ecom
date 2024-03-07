import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {Platform, StyleSheet} from 'react-native';
import {Size} from 'assets/theme';

const MAX_INPUT_HEIGHT = normalize(36);
const PADDING_WIDTH = Size.DefaultFormInputPaddingHorizontal;

const CTCalendarStyle = StyleSheet.create({
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
    flexDirection: 'row',
  },
  input: {},
  inputDisplay: {
    color: Colors.Text,
    marginTop: Platform.OS === 'android' ? normalize(-3) : normalize(-1),
  },
  error: {
    color: Colors.Error,
    marginBottom: normalize(5),
  },
  btnIcon: {marginLeft: normalize(8)},
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
  },
  disable: {
    backgroundColor: Colors.Border,
  },
});

export {CTCalendarStyle};
