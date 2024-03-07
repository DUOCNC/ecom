import {Fonts} from 'assets/fonts';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize, normalizeText} from 'utils/DimensionsUtils';

const DetailCustomerStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  toolbar: {
    paddingHorizontal: normalize(24),
    height: normalize(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: Fonts.Regular,
    fontSize: normalizeText(15),
    textTransform: 'none',
    width: DimentionUtils.scale(200),
  },
  headerTitle: {
    marginHorizontal: normalize(16),
    flex: 1,
  },
  statusView: {
    flexDirection: 'row',
    marginLeft: normalize(16),
    alignItems: 'center',
  },
  status: {
    width: normalize(6),
    height: normalize(6),
    borderRadius: normalize(3),
    backgroundColor: '#E83D42',
  },
  active: {
    backgroundColor: '#14B86E',
    marginRight: normalize(6),
  },
  txtStatus: {
    color: '#E83D42',
  },
  txtActive: {
    color: '#14B86E',
  },
});
const style = StyleSheet.create({
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(16),
  },
});

export {DetailCustomerStyle, style};
