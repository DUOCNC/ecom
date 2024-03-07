import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {Colors} from "assets/colors";

const PickStoreStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: DimentionUtils.scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.secondary.o200,
    borderBottomWidth: DimentionUtils.scale(1),
  },
  body: {
    flex: 1,
  },
  searchView: {
    paddingHorizontal: DimentionUtils.scale(20),
    marginBottom: DimentionUtils.scale(8),
    marginTop: DimentionUtils.scale(16),
    height: DimentionUtils.scale(36),
  },
  customBackground: {
    backgroundColor: colors.base.white,
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o200,
  },
  itemContainer: {
    backgroundColor: colors.base.white,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: DimentionUtils.scale(44),
    paddingHorizontal: DimentionUtils.scale(24),
    justifyContent: 'space-between',
  },
  selected: {
    backgroundColor: Colors.Blue10,
  },
  icClose: {
    position: 'absolute',
    left: DimentionUtils.scale(20),
  },
  iconClose: {
    width: DimentionUtils.scale(13),
    height: DimentionUtils.scale(13),
  },
});

export default PickStoreStyle;
