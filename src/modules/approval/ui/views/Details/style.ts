import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingTop: DimentionUtils.scale(16),
  },
  titleGroup: {paddingTop: DimentionUtils.scale(4)},
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
    width: DimentionUtils.scale(130),
  },
  value: {
    flex: 1,
  },
  time: {
    marginTop: DimentionUtils.scale(10),
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
    marginHorizontal: DimentionUtils.scale(-16),
  },
  attached: {
    flexDirection: 'row',
  },
  attachedEmpty: {
    marginTop: DimentionUtils.scale(16),
    flex: 1,
    justifyContent: 'center',
  },
  detailItem: {
    marginTop: DimentionUtils.scale(30),
  },
});
