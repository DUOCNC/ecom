import {Size} from 'assets/theme';
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
});

export default BarcodeStyle;
