import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {Platform, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    backgroundColor: colors.base.white,
    zIndex: 100000,
    shadowColor: Platform.OS === 'ios' ? '#A8A8A8' : undefined,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  centerTabBar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: DimentionUtils.scale(14),
  },
  defaultTabbar: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btnCenter: {
    height: DimentionUtils.scale(44),
    width: DimentionUtils.scale(44),
    backgroundColor: colors.primary.o500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: DimentionUtils.scale(17),
  },
  icSearch: {
    tintColor: colors.base.white,
    width: DimentionUtils.scale(32),
    height: DimentionUtils.scale(32),
  },
  txtTitle: {
    marginTop: DimentionUtils.scale(6),
  },
});

export default style;
