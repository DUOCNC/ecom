import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: DimentionUtils.scale(1),
    justifyContent: 'center',
  },
  param: {
    flexDirection: 'row',
    paddingVertical: DimentionUtils.scale(16),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  keyDriver: {
    paddingBottom: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(8),
  },
  chart: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: DimentionUtils.scale(200),
    marginTop: DimentionUtils.scale(20),
  },
  notDataChart: {
    justifyContent: 'center',
    alignItems: 'center',
    height: DimentionUtils.scale(100),
  },
  link: {
    color: Colors.Primary,
    marginTop: DimentionUtils.scale(-20),
  },
  note: {
    flexDirection: 'row',
    height: DimentionUtils.scale(48),
    backgroundColor: Colors.Primary50,
    alignItems: 'center',
    paddingLeft: DimentionUtils.scale(8),
    paddingRight: DimentionUtils.scale(21),
    borderRadius: DimentionUtils.scale(8),
  },
  noteIcon: {},
  noteText: {
    lineHeight: DimentionUtils.scale(16),
    marginRight: DimentionUtils.scale(21),
    marginLeft: DimentionUtils.scale(8),
  },
});

const ReportTabStyle = StyleSheet.create({
  container: {
    height: DimentionUtils.scale(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
});

export {Style, ReportTabStyle};
