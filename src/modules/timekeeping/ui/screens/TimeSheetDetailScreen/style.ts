import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  container: {
    paddingHorizontal: DimentionUtils.scale(16),
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  iconTime: {
    marginRight: DimentionUtils.scale(10),
  },
  title: {
    marginVertical: DimentionUtils.scale(16),
    height: DimentionUtils.scale(48),
    justifyContent: 'space-between',
  },
  textTitle: {
    paddingTop: DimentionUtils.scale(4),
  },
  totalHours: {},
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleRight: {},
  timekeeping: {
    justifyContent: 'space-between',
    paddingBottom: DimentionUtils.scale(8),
    marginLeft: DimentionUtils.scale(32),
  },
  fingerprint: {
    alignSelf: 'flex-end',
  },
  timeWorkHours: {
    marginTop: DimentionUtils.scale(20),
    marginLeft: DimentionUtils.scale(32),
  },
  left: {
    width: DimentionUtils.scale(116),
    alignItems: 'flex-start',
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  paddingTop8: {
    paddingTop: DimentionUtils.scale(8),
  },
});

export default style;
