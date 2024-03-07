import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container: {
    flex: DimentionUtils.scale(1),
  },
  header: {
    padding: DimentionUtils.scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.secondary.o200,
    borderBottomWidth: DimentionUtils.scale(1),
  },
  body: {
    paddingTop: DimentionUtils.scale(20),
    flex: DimentionUtils.scale(1),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  icClose: {
    position: 'absolute',
    left: DimentionUtils.scale(16),
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
  },
  iconClose: {
    width: DimentionUtils.scale(13),
    height: DimentionUtils.scale(13),
  },
  contact: {
    position: 'absolute',
    right: DimentionUtils.scale(16),
  },
  contactText: {
    color: Colors.Primary,
  },
  contactDisable: {
    color: Colors.Gray400,
  },
  itemDetail: {
    flex: 1,
    height: DimentionUtils.scale(40),
    justifyContent: 'space-between',
    paddingHorizontal: DimentionUtils.scale(24),
  },
  row: {
    flexDirection: 'row',
  },
  rowOne: {
    marginBottom: DimentionUtils.scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    height: DimentionUtils.scale(20),
  },
  copy: {
    height: DimentionUtils.scale(22),
    width: DimentionUtils.scale(74),
    borderRadius: DimentionUtils.scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o300,
    backgroundColor: colors.secondary.o100,
  },
  rowTimeline: {
    paddingTop: DimentionUtils.scale(28),
    flex: 1,
  },
  iconCheck: {
    tintColor: colors.primary.o500,
    backgroundColor: colors.base.white,
  },
  timeLineDetail: {
    minHeight: DimentionUtils.scale(60),
    marginTop: DimentionUtils.scale(-10),
  },
  row1: {},
  row2: {paddingTop: DimentionUtils.scale(4)},
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
  },
});

export default Style;
