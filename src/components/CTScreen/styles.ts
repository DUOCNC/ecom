import {Colors} from 'assets/colors';
import {Fonts} from 'assets/fonts';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const CTScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  rowLoading: {
    marginTop: normalize(24),
  },
  keyboard: {
    flex: 1,
  },
});

const ViewConnectionStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonConnect: {
    width: normalize(200),
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FF',
    borderRadius: normalize(20),
  },
  txtConnect: {
    color: '#0056F1',
  },
});

const EmptyStateStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: normalize(32),
  },
  rowTitle: {
    marginTop: normalize(16),
  },
  title: {
    textAlign: 'center',
    color: '#212B35',
    marginTop: 16,
  },
  text: {
    textAlign: 'center',
    color: Colors.SubText2,
    fontSize: normalize(14),
    fontFamily: Fonts.Regular,
    lineHeight: normalize(22),
  },
  rowSubTitle: {
    marginTop: normalize(16),
    fontWeight: '500',
  },
  other: {
    marginTop: normalize(28),
  },
  link: {
    color: Colors.Primary,
  },
  notPromotionImg: {
    width: 128,
    height: 128,
  },
});

export {ViewConnectionStyle, CTScreenStyle, EmptyStateStyle};
