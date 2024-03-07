import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: DimentionUtils.scale(16),
    // paddingTop: DimentionUtils.scale(16),
  },
  timeWorkDetail: {
    borderRadius: DimentionUtils.scale(8),
    padding: DimentionUtils.scale(16),
    borderColor: colors.secondary.o200,
    borderWidth: 1,
    marginTop: DimentionUtils.scale(24),
  },
  title: {
    paddingTop: DimentionUtils.scale(2),
    marginBottom: DimentionUtils.scale(16),
  },
  box: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(16),
  },
  boxSquare: {
    borderColor: colors.secondary.o200,
    borderRadius: DimentionUtils.scale(8),
    borderWidth: 1,
    width: DimentionUtils.scale(164),
    padding: DimentionUtils.scale(12),
    height: DimentionUtils.scale(124),
    alignItems: 'center',
  },
  boxIcon: {
    marginBottom: DimentionUtils.scale(12),
  },
  boxValue: {
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(8),
  },
  viewMonth: {
    marginTop: DimentionUtils.scale(12),
  },
  tableSheet: {
    marginTop: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(26),
    minHeight: DimentionUtils.scale(400),
  },
  error: {
    marginBottom: DimentionUtils.scale(16),
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
  },
  timeKeepingContainer: {
    marginBottom: DimentionUtils.scale(12),
  },
  timeKeepingElement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearestTxt: {
    marginLeft: DimentionUtils.scale(8),
    flex: 1,
  },
  checkInNearest: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nearestLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearestText: {
    marginLeft: DimentionUtils.scale(10),
  },
});

export {style};
