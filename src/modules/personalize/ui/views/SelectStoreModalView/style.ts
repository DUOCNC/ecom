import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

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
  icClose: {
    position: 'absolute',
    left: DimentionUtils.scale(20),
  },
  iconClose: {
    width: DimentionUtils.scale(13),
    height: DimentionUtils.scale(13),
  },
  btn: {
    height: DimentionUtils.scale(56),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: DimentionUtils.scale(30),
  },
  iconContainer: {
    width: DimentionUtils.scale(32),
    height: DimentionUtils.scale(32),
    borderRadius: DimentionUtils.scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.o50,
  },
  icon: {
    tintColor: colors.primary.o500,
    width: DimentionUtils.scale(20),
    height: DimentionUtils.scale(20),
  },
  title: {
    marginLeft: DimentionUtils.scale(8),
  },
  row: {
    borderBottomWidth: DimentionUtils.scale(1),
    borderBottomColor: colors.secondary.o200,
  },
  active: {
    backgroundColor: colors.primary.o10,
  },
});

export default PickStoreStyle;
