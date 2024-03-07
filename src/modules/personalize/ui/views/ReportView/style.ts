import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const ReportHomeStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    padding: normalize(16),
    borderRadius: normalize(5),
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row2: {
    marginTop: DimentionUtils.scale(8),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row3: {
    marginTop: DimentionUtils.scale(8),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowProgress: {
    marginTop: DimentionUtils.scale(16),
    height: DimentionUtils.scale(18),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  progress: {
    borderRadius: DimentionUtils.scale(4),
    height: DimentionUtils.scale(18),
    backgroundColor: colors.primary.o50,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressRate: {
    marginLeft: DimentionUtils.scale(4),
    width: DimentionUtils.scale(44),
    alignItems: 'flex-end',
  },
  progressValue: {
    height: '100%',
    borderTopLeftRadius: DimentionUtils.scale(4),
    borderBottomLeftRadius: DimentionUtils.scale(4),
    alignItems: 'flex-start',
    position: 'absolute',
    left: 0,
  },
  rowProgress2: {
    flexDirection: 'row',
    marginVertical: DimentionUtils.scale(8),
  },
  rowProgress3: {
    flexDirection: 'row',
    marginBottom: DimentionUtils.scale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  txtTitle: {
    color: Colors.Gray500,
  },
  btnReport: {
    flexDirection: 'row',
  },
  txtReport: {
    color: Colors.Blue,
    marginRight: normalize(5),
  },
  loadingView: {
    paddingVertical: normalize(20),
  },
  rowTotalSale: {
    marginTop: normalize(4),
    paddingBottom: normalize(12),
  },
  rowInfo: {
    paddingTop: normalize(12),
    flexDirection: 'row',
  },
  colInfo: {
    marginRight: DimentionUtils.scale(10),
    borderRadius: DimentionUtils.scale(8),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o200,
    height: DimentionUtils.scale(64),
    padding: DimentionUtils.scale(12),
  },
  txtValueInfo: {
    marginTop: normalize(4),
  },
  txtLabelInfo: {
    color: Colors.Gray500,
  },
  btnSalary: {
    position: 'absolute',
    right: 0,
  },
  textSalary: {
    fontSize: 12,
  },
  iconRight: {
    color: Colors.White,
    fontSize: 30,
  },
  btnRight: {
    height: DimentionUtils.scale(32),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(8),
    backgroundColor: colors.primary.o500,
    borderRadius: DimentionUtils.scale(8),
  },
  icTail: {
    width: DimentionUtils.scale(5),
    marginLeft: DimentionUtils.scale(10),
    marginRight: DimentionUtils.scale(6),
    tintColor: colors.base.white,
    height: DimentionUtils.scale(8),
  },
  textTotal: {
    paddingTop: 1,
  },
  mt16: {
    marginTop: DimentionUtils.scale(16),
  },
});

export {ReportHomeStyle};
