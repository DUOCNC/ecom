import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
const style = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: DimentionUtils.scale(36),
    marginBottom: DimentionUtils.scale(8),
    marginLeft: DimentionUtils.scale(8),
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: DimentionUtils.scale(74),
    position: 'relative',
  },
  activeTab: {
    borderBottomColor: colors.primary.o600,
    borderBottomWidth: DimentionUtils.scale(2),
  },
  tabText: {},
  addTabButton: {
    width: DimentionUtils.scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary.o500,
    borderRadius: DimentionUtils.scale(8),
    marginLeft: DimentionUtils.scale(16),
  },
  backgroundDisable: {
    backgroundColor: colors.secondary.o500,
  },
  addTabButtonText: {},
  actionLeft: {
    transform: [{rotate: '180deg'}], // Góc xoay 45 độ
  },
  buttonLeft: {},
  tabs: {
    marginHorizontal: DimentionUtils.scale(16),
    width: '100%',
  },
  close: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
  },
});
export default style;
