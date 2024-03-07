import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
const style = StyleSheet.create({
  checkInNearest: {
    marginTop: DimentionUtils.scale(8),
    paddingHorizontal: DimentionUtils.scale(16),
    marginHorizontal: DimentionUtils.scale(16),
    height: DimentionUtils.scale(44),
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
  timeNearest: {},
});

export {style};
