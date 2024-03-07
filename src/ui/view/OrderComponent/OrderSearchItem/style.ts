import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const OrderSearchItemStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  btn: {
    padding: normalize(16),
  },
  txtInfo: {
    marginTop: normalize(4),
  },
  txtCode: {
    color: Colors.Blue,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  product: {
    marginLeft: normalize(18),
  },
  firstRow: {
    justifyContent: 'space-between',
  },
  twoRow: {
    marginTop: normalize(8),
  },
  txtStore: {
    marginLeft: normalize(10),
    color: Colors.SubText,
  },
  threeRow: {
    marginTop: normalize(8),
  },
  icon: {
    tintColor: Colors.Icon,
    width: normalize(15),
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
});

export default OrderSearchItemStyle;
