import {Colors} from 'assets/colors';
import {Fonts} from 'assets/fonts';
import {Dimensions, StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import Size from './size';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const ThemeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 1,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  shadowHeader: {
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
  },
  shadowActionBottom: {
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: Colors.White,
  },
  shadowBottom: {
    marginBottom: normalize(1),
  },
  separator: {
    height: normalize(1),
    backgroundColor: Colors.Gray200,
  },
  separator12: {
    height: normalize(1),
    // marginHorizontal: normalize(12),
    backgroundColor: Colors.Border,
  },
  separator16: {
    height: normalize(1),
    marginHorizontal: normalize(16),
    backgroundColor: Colors.Gray200,
  },
  separator24: {
    marginHorizontal: normalize(24),
    height: normalize(1),
    backgroundColor: Colors.BorderInput,
  },
  subText: {
    color: Colors.SubText,
  },
  subText2: {
    color: Colors.SubText2,
  },
  loading: {
    position: 'absolute',
    top: normalize(24),
    width: '100%',
  },
  viewSearchError: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingTop: '20%',
    marginTop: normalize(8),
  },
  headerSearch: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: normalize(8),
    paddingHorizontal: normalize(16),
    backgroundColor: Colors.White,
    marginBottom: normalize(1),
  },
  flatList: {
    paddingTop: normalize(8),
  },
  tabLable: {
    fontFamily: Fonts.Medium,
    fontSize: normalize(15),
    lineHeight: normalize(20),
    textTransform: 'none',
  },
  buttonPrimary: {
    borderRadius: DimentionUtils.scale(8),
    backgroundColor: colors.primary.o500,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(10),
  },
});

export {ThemeStyle, Size};
