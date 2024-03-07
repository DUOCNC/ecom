import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import {DimentionUtils} from 'common-ui';

const PickStoreStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Colors.Border,
    borderBottomWidth: normalize(1),
  },
  body: {
    flex: 1,
  },
  searchView: {
    paddingHorizontal: normalize(20),
    marginBottom: normalize(8),
    marginTop: normalize(16),
    height: normalize(36),
  },
  customBackground: {
    backgroundColor: Colors.White,
    borderWidth: normalize(1),
    borderColor: Colors.Border,
  },
  itemContainer: {
    backgroundColor: Colors.White,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(44),
    paddingHorizontal: normalize(24),
    justifyContent: 'space-between',
  },
  selected: {
    backgroundColor: Colors.Blue10,
  },
  icClose: {
    position: 'absolute',
    left: normalize(20),
  },
  iconClose: {
    width: DimentionUtils.scale(13),
    height: DimentionUtils.scale(13),
  },
});

export default PickStoreStyle;
