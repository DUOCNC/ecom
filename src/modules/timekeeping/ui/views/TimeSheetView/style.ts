import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';

const completeStyle = StyleSheet.create({
  empty: {
    width: DimentionUtils.scale(110),
  },
  buttonCreate: {
    borderWidth: 1,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    borderRadius: 8,
    borderColor: colors.secondary.o300,
    backgroundColor: colors.secondary.o50,
  },
  icon: {
    marginLeft: DimentionUtils.scale(5),
  },
  dateName: {
    marginBottom: DimentionUtils.scale(3),
  },
  container: {
    borderWidth: 1,
    borderColor: colors.secondary.o300,
    backgroundColor: colors.secondary.o50,
    borderRadius: 8,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: DimentionUtils.scale(60),
  },
  dateCol: {
    flex: 0,
    borderRightWidth: 1,
    paddingRight: DimentionUtils.scale(12),
  },
  calWorkCol: {
    paddingLeft: DimentionUtils.scale(16),
    width: DimentionUtils.scale(55),
  },
  informationCol: {
    paddingLeft: DimentionUtils.scale(16),
  },
  buttonCol: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: DimentionUtils.scale(8),
    minWidth: DimentionUtils.scale(80),
  },
  row: {
    flexDirection: 'row',
  },
  code: {
    marginLeft: DimentionUtils.scale(3),
  },
});
const futureStyle = StyleSheet.create({
  empty: {
    width: DimentionUtils.scale(110),
  },
  buttonCreate: {
    borderWidth: 1,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    borderRadius: 8,
    borderColor: colors.secondary.o300,
    backgroundColor: colors.secondary.o50,
  },
  icon: {
    marginLeft: DimentionUtils.scale(5),
  },
  dateName: {
    marginBottom: DimentionUtils.scale(3),
  },
  container: {
    backgroundColor: colors.secondary.o50,
    borderRadius: 8,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: DimentionUtils.scale(60),
  },
  dateCol: {
    flex: 0,
    borderRightWidth: 1,
    borderColor: colors.secondary.o300,
    paddingRight: DimentionUtils.scale(12),
  },
  calWorkCol: {
    paddingLeft: DimentionUtils.scale(16),
    width: DimentionUtils.scale(55),
  },
  informationCol: {
    paddingLeft: DimentionUtils.scale(16),
  },
  buttonCol: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  code: {
    marginLeft: DimentionUtils.scale(3),
  },
});
const leaveStyle = StyleSheet.create({
  empty: {
    width: DimentionUtils.scale(110),
  },
  buttonCreate: {
    borderWidth: 1,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    borderRadius: 8,
    borderColor: colors.secondary.o300,
    backgroundColor: colors.secondary.o50,
  },
  icon: {
    marginLeft: DimentionUtils.scale(5),
  },
  dateName: {
    marginBottom: DimentionUtils.scale(3),
  },
  container: {
    borderWidth: 1,
    borderColor: colors.warning.o300,
    backgroundColor: colors.warning.o50,
    borderRadius: 8,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: DimentionUtils.scale(60),
  },
  dateCol: {
    borderRightWidth: 1,
    paddingRight: DimentionUtils.scale(12),
  },
  calWorkCol: {
    paddingLeft: DimentionUtils.scale(16),
    width: DimentionUtils.scale(55),
  },
  informationCol: {
    flex: 1,
    paddingLeft: DimentionUtils.scale(16),
  },
  buttonCol: {
    minWidth: DimentionUtils.scale(80),
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  code: {
    marginLeft: DimentionUtils.scale(3),
  },
});
const notEnoughStyle = StyleSheet.create({
  empty: {
    width: DimentionUtils.scale(110),
  },
  buttonCreate: {
    borderWidth: 1,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    borderRadius: 8,
    borderColor: colors.secondary.o300,
    backgroundColor: colors.secondary.o50,
  },
  icon: {
    marginLeft: DimentionUtils.scale(5),
  },
  dateName: {
    marginBottom: DimentionUtils.scale(3),
  },
  container: {
    borderWidth: 1,
    borderColor: colors.warning.o300,
    backgroundColor: colors.warning.o50,
    borderRadius: 8,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: DimentionUtils.scale(60),
  },
  dateCol: {
    borderRightWidth: 1,
    paddingRight: DimentionUtils.scale(12),
  },
  calWorkCol: {
    paddingLeft: DimentionUtils.scale(16),
    width: DimentionUtils.scale(55),
  },
  informationCol: {
    flex: 1,
    paddingLeft: DimentionUtils.scale(16),
  },
  buttonCol: {
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  code: {
    marginLeft: DimentionUtils.scale(3),
  },
});
const todayStyle = StyleSheet.create({
  empty: {
    width: DimentionUtils.scale(110),
  },
  buttonCreate: {
    borderWidth: 1,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    borderRadius: 8,
    borderColor: colors.secondary.o300,
    backgroundColor: colors.secondary.o50,
  },
  icon: {
    marginLeft: DimentionUtils.scale(5),
  },
  dateName: {
    marginBottom: DimentionUtils.scale(3),
  },
  container: {
    borderWidth: 1,
    borderColor: colors.blue.o300,
    backgroundColor: colors.blue.o50,
    borderRadius: 8,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: DimentionUtils.scale(60),
  },
  dateCol: {
    borderRightWidth: 1,
    paddingRight: DimentionUtils.scale(12),
  },
  calWorkCol: {
    paddingLeft: DimentionUtils.scale(16),
    width: DimentionUtils.scale(55),
  },
  informationCol: {
    flex: 1,
    paddingLeft: DimentionUtils.scale(16),
  },
  buttonCol: {
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  code: {
    marginLeft: DimentionUtils.scale(3),
  },
});

export {completeStyle, leaveStyle, todayStyle, notEnoughStyle, futureStyle};
