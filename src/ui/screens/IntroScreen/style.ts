import {Colors} from 'assets/colors';
import {Dimensions, StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const IntroStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.White,
  },
  skip: {
    zIndex: 10000,
    position: 'absolute',
    right: normalize(16),
  },
  skipTextStyle: {
    color: Colors.Black,
  },
  pager: {
    flex: 1,
  },
  pagerContainer: {},
  indicator: {
    marginTop: normalize(32),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  descriptionContainer: {
    marginTop: normalize(24),
    marginBottom: normalize(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnHelp: {
    marginRight: normalize(10),
  },
  title: {
    textAlign: 'center',
    marginHorizontal: normalize(30),
  },
  subTitle: {
    marginHorizontal: normalize(30),
    textAlign: 'center',
    color: '#98A2B3',
    marginTop: normalize(10),
  },
  btn: {
    marginHorizontal: normalize(24),
  },
  top: {
    marginBottom: normalize(40),
  },
  bottomContainer: {
    paddingTop: normalize(40),
    borderTopRightRadius: normalize(20),
    borderTopLeftRadius: normalize(20),
    flexDirection: 'column',
    backgroundColor: Colors.White,
  },
});

const PagerStyle = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    flexDirection: 'column-reverse',
  },
  img: {
    width: '100%',
  },
});

const IndicatorStyle = StyleSheet.create({
  container: {
    width: normalize(8),
    height: normalize(8),
    backgroundColor: '#E3E5E5',
    borderRadius: normalize(100),
    marginHorizontal: normalize(4),
  },
  active: {
    backgroundColor: Colors.Primary,
    width: normalize(32),
  },
});

export {IntroStyle, PagerStyle, IndicatorStyle};
