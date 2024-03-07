import {Size} from 'assets/theme';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const BarcodeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: Size.DefaultToolbarHeight,
    width: '100%',
    zIndex: 10000,
    paddingHorizontal: Size.DefaultHorizontal,
  },
  iconClose: {
    width: normalize(14),
    height: normalize(14),
  },
  screenBottom: {
    flexDirection: 'row',
    marginVertical: DimentionUtils.scale(12),
    marginHorizontal: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(8),
    justifyContent: 'space-between',
    position: 'absolute',
    backgroundColor: colors.base.white,
    bottom: DimentionUtils.scale(100),
  },
  buttonView: {
    flex: 1,
  },
});

export default BarcodeStyle;
