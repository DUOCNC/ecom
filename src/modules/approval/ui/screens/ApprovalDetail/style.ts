import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: DimentionUtils.scale(16),
  },
  row: {
    flexDirection: 'row',
    paddingTop: DimentionUtils.scale(16),
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleLeft: {},
  createDate: {marginTop: DimentionUtils.scale(4)},
  titleRight: {},
  row2: {},
  label: {
    width: DimentionUtils.scale(100),
  },
  value: {
    flex: 1,
  },
  time: {
    marginTop: DimentionUtils.scale(16),
    height: DimentionUtils.scale(68),
    borderRadius: DimentionUtils.scale(4),
    backgroundColor: colors.primary.o25,
    paddingVertical: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: DimentionUtils.scale(10),
  },
  timeTo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeEnd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeValue: {
    paddingVertical: DimentionUtils.scale(3),
    height: DimentionUtils.scale(44),
    justifyContent: 'space-between',
  },
  separator: {
    marginTop: DimentionUtils.scale(12),
  },
  attached: {
    flexDirection: 'row',
  },
  attachedEmpty: {
    marginTop: DimentionUtils.scale(16),
    flex: 1,
    justifyContent: 'center',
  },
  rightTitleContainer: {flex: 1},
  rightTitle: {
    alignSelf: 'flex-end',
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reject: {
    marginRight: DimentionUtils.scale(16),
    flex: 1,
  },
});
