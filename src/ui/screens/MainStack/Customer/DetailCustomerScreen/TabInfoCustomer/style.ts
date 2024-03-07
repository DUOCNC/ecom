import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const TabInfoCustomerStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInfo: {
    marginTop: normalize(8),
    backgroundColor: Colors.White,
    margin: normalize(16),
    borderRadius: DimentionUtils.scale(8),
  },
  icPeople: {
    width: normalize(48),
    height: normalize(48),
  },
  customerCard: {
    width: normalize(343),
    height: normalize(176),
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowInfoRight: {
    marginLeft: normalize(8),
    flex: 1,
  },
  rowPoint: {
    marginTop: normalize(4),
    flexDirection: 'row',
  },
  txtTitlePoint: {
    color: Colors.SubText,
  },
  txtValuePoint: {
    marginLeft: normalize(4),
  },
  customerCardContainer: {
    flex: 1,
    padding: normalize(16),
  },
  rowLevel: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginTop: normalize(12),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    flex: 1,
    borderRadius: normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLevel: {
    flexDirection: 'row',
    marginTop: normalize(4),
  },
  progress: {
    marginTop: normalize(4),
  },
  txtInfoLevelUp: {
    marginLeft: normalize(4),
    color: Colors.SubText,
  },
  txtLevelUp: {
    color: Colors.Blue,
  },
  rowInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: normalize(12),
  },
  txtTitleCard: {
    color: Colors.SubText2,
  },
  txtValueCard: {
    maxWidth: '55%',
    textAlign: 'right',
  },
  cardReport: {
    marginTop: normalize(8),
  },
  errorLoyalty: {
    flexDirection: 'row',
  },
  btnReLoad: {
    marginLeft: normalize(5),
  },
  txtReload: {
    color: Colors.Blue,
  },
  flex: {
    flex: 1,
  },
});
const style = StyleSheet.create({
  card: {
    marginHorizontal: DimentionUtils.scale(8),
    marginTop: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(8),
    backgroundColor: colors.base.white,
    padding: DimentionUtils.scale(16),
  },
  fullName: {width: DimentionUtils.scale(220)},
  promotion: {
    marginHorizontal: DimentionUtils.scale(8),
    marginTop: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(8),
    backgroundColor: colors.base.white,
  },
  promotionHeight: {
    height: DimentionUtils.scale(316),
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DimentionUtils.scale(8),
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.secondary.o300,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(10),
    paddingVertical: DimentionUtils.scale(4),
  },
  ml4: {marginLeft: DimentionUtils.scale(4)},
  groupText: {
    marginBottom: DimentionUtils.scale(8),
  },
  havingCode: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(4),
  },
  row: {
    flexDirection: 'row',
  },
  showMore: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.Primary,
    paddingBottom: DimentionUtils.scale(8),
    paddingTop: DimentionUtils.scale(8),
    borderRadius: DimentionUtils.scale(8),
    color: Colors.White,
  },
  optionTransparent: {
    backgroundColor: 'transparent',
  },
  rowOption: {
    backgroundColor: Colors.Gray200,
    borderRadius: DimentionUtils.scale(8),
    marginHorizontal: DimentionUtils.scale(16),
    marginTop: DimentionUtils.scale(16),
    display: 'none',
  },
  empty: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export {TabInfoCustomerStyle, style};
