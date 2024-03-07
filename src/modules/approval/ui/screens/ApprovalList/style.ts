import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  header: {
    height: DimentionUtils.scale(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.base.white,
    marginVertical: DimentionUtils.scale(8),
  },
  container: {
    flex: 1,
    paddingHorizontal: DimentionUtils.scale(10),
  },
  row1: {
    marginTop: DimentionUtils.scale(10),
    flexDirection: 'row',
    backgroundColor: Colors.Gray200,
    marginHorizontal: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(8),
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.Primary,
    paddingBottom: DimentionUtils.scale(8),
    paddingTop: DimentionUtils.scale(8),
    borderRadius: DimentionUtils.scale(8),
    color: Colors.White,
  },
  optionTransparent: {
    backgroundColor: 'transparent',
  },
  row2: {
    marginTop: DimentionUtils.scale(16),
    flexDirection: 'row',
    height: DimentionUtils.scale(44),
    marginHorizontal: DimentionUtils.scale(4),
    type: {flex: 1},
  },
  checkAll: {
    justifyContent: 'center',
    marginLeft: DimentionUtils.scale(10),
    flex: 1,
    alignItems: 'flex-end',
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    flexDirection: 'row',
  },
  row3: {
    marginTop: DimentionUtils.scale(10),
    flexDirection: 'row',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  list: {
    flex: 1,
  },
  reject: {
    marginRight: DimentionUtils.scale(16),
    flex: 1,
  },
});
