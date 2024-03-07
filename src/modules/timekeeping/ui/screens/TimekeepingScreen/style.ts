import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  scrollScontainer: {
    flex: 1,
  },
  title: {
    paddingTop: DimentionUtils.scale(2),
  },
  txtValue: {
    maxWidth: '55%',
    textAlign: 'right',
  },
  headerTile: {
    flex: 1,
  },
  viewImage: {
    marginHorizontal: DimentionUtils.scale(8),
    width: DimentionUtils.scale(24),
    alignItems: 'center',
  },
  viewInfo: {
    marginTop: DimentionUtils.scale(8),
  },
  btnEdit: {
    width: DimentionUtils.scale(40),
    height: DimentionUtils.scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: DimentionUtils.scale(8),
  },
  body: {
    marginTop: DimentionUtils.scale(20),
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: DimentionUtils.scale(32),
    marginBottom: DimentionUtils.scale(12),
    alignItems: 'flex-start',
  },
  btnMenu: {
    marginTop: DimentionUtils.scale(8),
    backgroundColor: colors.base.white,
    height: DimentionUtils.scale(48),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(8),
    shadowColor: '#A8A8A8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  btnTitle: {
    flex: 1,
  },
  viewRight: {
    width: DimentionUtils.scale(40),
    height: DimentionUtils.scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: DimentionUtils.scale(8),
  },
  row: {
    paddingHorizontal: DimentionUtils.scale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTimeNow: {
    justifyContent: 'space-between',
  },
  timeNow: {
    borderWidth: DimentionUtils.scale(1),
    borderRadius: DimentionUtils.scale(8),
    borderColor: colors.secondary.o200,
    backgroundColor: colors.secondary.o50,
    padding: DimentionUtils.scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    width: DimentionUtils.scale(80),
  },
  textTimeNow: {},
  locate: {
    alignItems: 'center',
    marginVertical: DimentionUtils.scale(16),
    maxHeight: DimentionUtils.scale(200),
  },
  btnTimekeeping: {
    marginHorizontal: DimentionUtils.scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.o500,
    borderRadius: DimentionUtils.scale(8),
    height: DimentionUtils.scale(48),
  },
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
  timeSheet: {
    height: DimentionUtils.scale(36),
    marginTop: DimentionUtils.scale(20),
  },
  btnTimeSheet: {
    justifyContent: 'space-between',
    height: DimentionUtils.scale(48),
    backgroundColor: colors.base.white,
    borderRadius: DimentionUtils.scale(12),
    shadowColor: '#A8A8A8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  btnTimeSheetShadow: {
    marginHorizontal: DimentionUtils.scale(16),
    marginBottom: DimentionUtils.scale(16),
    height: DimentionUtils.scale(48),
  },
});

export default style;
