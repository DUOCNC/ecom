import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  body: {
    padding: DimentionUtils.scale(16),
    flex: 1,
  },
  totalReport: {
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 2,
    shadowColor: colors.base.black,
    backgroundColor: colors.primary.o50,
    padding: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(10),
    borderRadius: DimentionUtils.scale(12),
  },
  row: {
    flexDirection: 'row',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DimentionUtils.scale(8),
  },
  icon: {
    marginLeft: DimentionUtils.scale(4),
    alignSelf: 'center',
    height: 28,
  },
  title: {
    paddingTop: DimentionUtils.scale(5),
    marginBottom: DimentionUtils.scale(8),
  },
  element: {
    flex: 1,
    padding: DimentionUtils.scale(12),
    backgroundColor: colors.base.white,
    borderRadius: DimentionUtils.scale(12),
  },
  descriptionCol: {
    marginLeft: DimentionUtils.scale(8),
  },
  value: {
    marginTop: DimentionUtils.scale(4),
  },
  spaceBox: {
    marginLeft: DimentionUtils.scale(12),
  },
  titleContainer: {
    paddingTop: DimentionUtils.scale(5),
    marginTop: DimentionUtils.scale(18),
  },
  statusContainer: {
    maxHeight: DimentionUtils.scale(58),
    paddingTop: DimentionUtils.scale(8),
  },
  statusElement: {
    borderWidth: 1,
    borderRadius: DimentionUtils.scale(40),
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(8),
    marginRight: DimentionUtils.scale(12),
  },
  cardContainer: {flex: 1},
  emptyShareContainer: {
    paddingTop: '40%',
  },
  filterRow: {
    marginTop: DimentionUtils.scale(11),
    marginBottom: DimentionUtils.scale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icCalendar: {
    marginLeft: DimentionUtils.scale(8),
  },
  behavior: {
    color: colors.success.o500,
  },
});

export default style;
