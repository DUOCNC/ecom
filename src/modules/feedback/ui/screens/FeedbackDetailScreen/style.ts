import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  body: {
    padding: DimentionUtils.scale(16),
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
    borderRadius: DimentionUtils.scale(12),
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DimentionUtils.scale(8),
  },
  itemBox: {
    marginTop: DimentionUtils.scale(8),
  },
  numberCustomer: {
    alignItems: 'center',
    marginBottom: DimentionUtils.scale(16),
  },
  numberValue: {
    width: DimentionUtils.scale(48),
    height: DimentionUtils.scale(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: DimentionUtils.scale(4),
    alignSelf: 'center',
    height: 28,
  },
  title: {
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
    marginTop: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(8),
  },
  statusContainer: {
    marginVertical: DimentionUtils.scale(27),
  },
  statusElement: {
    borderWidth: 1,
    borderColor: colors.secondary.o300,
    borderRadius: DimentionUtils.scale(40),
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(8),
    marginRight: DimentionUtils.scale(12),
  },
  cardContainer: {},
  assignee: {
    marginTop: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(16),
  },
  reasonItem: {
    marginBottom: DimentionUtils.scale(16),
  },
  mb24: {marginBottom: DimentionUtils.scale(16)},
  reasonBox: {
    flexDirection: 'row',
    borderRadius: DimentionUtils.scale(5),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o200,
    height: DimentionUtils.scale(45),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(16),
  },
  rightTitleContainer: {flex: 1},
  rightTitle: {
    alignSelf: 'flex-end',
  },
  createDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDate: {
    marginLeft: DimentionUtils.scale(8),
  },
});

export default style;
