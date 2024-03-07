import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {Size} from 'assets/theme';
import {StyleSheet} from 'react-native';
import {Fonts} from 'assets/fonts';

const VersionInformationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  headerVersion: {
    paddingHorizontal: Size.DefaultHorizontal,
    marginTop: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtVersion: {
    color: Colors.Blue,
  },
  viewStatus: {
    paddingHorizontal: normalize(12),
    borderWidth: normalize(1),
    paddingVertical: normalize(2),
    borderRadius: normalize(12),
    marginLeft: normalize(8),
  },
  li: {
    fontFamily: Fonts.Regular,
    fontSize: normalize(15),
    alignItems: 'center',
    textAlign: 'center',
  },
  txtStatusCurrent: {
    color: '#0DB473',
  },
  viewCurrent: {
    backgroundColor: '#F3FCF9',
    borderColor: '#B1F0D8',
  },
  btnVerify: {
    width: normalize(200),
    alignSelf: 'center',
  },
  viewNew: {
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
  },
  textNew: {
    color: '#E6A114',
  },
});

export {VersionInformationStyle};
