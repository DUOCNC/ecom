import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  item: {
    paddingVertical: DimentionUtils.scale(16),
    flexDirection: 'row',
    paddingHorizontal: DimentionUtils.scale(16),
  },
  txtInfo: {
    marginTop: normalize(8),
  },
  txtCode: {marginRight: DimentionUtils.scale(4)},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  product: {
    marginLeft: normalize(18),
  },
  firstRow: {
    minHeight: DimentionUtils.scale(30),
    flexDirection: 'row',
  },
  twoRow: {
    marginTop: normalize(8),
  },
  txtStore: {
    marginLeft: normalize(10),
    color: Colors.SubText,
  },
  threeRow: {
    marginTop: normalize(6),
    justifyContent: 'space-between',
  },
  fourRow: {
    marginTop: normalize(4),
  },
  icon: {
    width: DimentionUtils.scale(20),
    height: DimentionUtils.scale(20),
  },
  viewSubStatus: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(2),
    borderRadius: normalize(30),
    borderWidth: normalize(1),
  },
  txtStatus: {
    lineHeight: normalize(20),
  },
  subMoney: {
    marginLeft: DimentionUtils.scale(6),
    marginTop: DimentionUtils.scale(4),
  },
  textDelivery: {
    marginLeft: DimentionUtils.scale(10),
  },
  rowFour: {
    marginTop: DimentionUtils.scale(8),
    flex: 1,
  },
  value: {
    paddingLeft: DimentionUtils.scale(8),
  },
  imgItem: {
    width: normalize(64),
    height: normalize(90),
    borderRadius: normalize(5),
  },
  itemRight: {
    marginLeft: normalize(12),
    flex: 1,
  },
});

export default style;
