import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {Platform, StyleSheet} from 'react-native';
const timeSheetStyle = StyleSheet.create({
  container: {},
  header: {
    borderTopLeftRadius: DimentionUtils.scale(12),
    borderTopRightRadius: DimentionUtils.scale(12),
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderLeftColor: '#ccc',
    borderLeftWidth: 1,
  },
  weekend: {
    backgroundColor: '#f1f1f1',
  },
  text: {
    fontSize: 16,
  },
  body: {
    borderBottomLeftRadius: DimentionUtils.scale(12),
    borderBottomRightRadius: DimentionUtils.scale(12),
  },

  headerTitle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: -16,
    flex: 1,
  },
  headerText: {
    color: colors.secondary.o900,
    width: DimentionUtils.scale(46),
    borderColor: colors.base.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    marginLeft: DimentionUtils.scale(8),
  },
  headerRight: {
    flexDirection: 'row',
    marginLeft: DimentionUtils.scale(6),
  },
});

const dayStyle = StyleSheet.create({
  boxHeader: {
    width: DimentionUtils.scale(50),
  },
  day: {
    width: DimentionUtils.scale(50),
    height: DimentionUtils.scale(68),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomColor: colors.secondary.o200,
    borderLeftColor: colors.secondary.o200,
    borderRightColor: colors.secondary.o200,
    marginBottom:
      Platform.OS === 'android'
        ? DimentionUtils.scale(-16)
        : DimentionUtils.scale(-14),
  },
  actualWork: {
    width: DimentionUtils.scale(30),
    height: DimentionUtils.scale(24),
    backgroundColor: colors.secondary.o200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: DimentionUtils.scale(4),
    marginTop: DimentionUtils.scale(14),
  },
  today: {
    backgroundColor: colors.blue.o50,
  },
  todayActualWork: {
    backgroundColor: colors.blue.o500,
  },
  todayColor: {
    color: colors.base.white,
  },
  complete: {
    backgroundColor: colors.success.o50,
  },
  completeActualWork: {
    backgroundColor: colors.success.o50,
  },
  leaveActualWork: {
    backgroundColor: colors.error.o50,
  },
  notEnoughActualWork: {
    backgroundColor: colors.warning.o50,
  },
  dayEmpty: {
    borderTopColor: colors.secondary.o200,
    // borderRightColor: colors.base.white,
    borderRightWidth: 0,
  },
  dayEnd: {
    borderRightWidth: 2,
  },
});

export {timeSheetStyle, dayStyle};
