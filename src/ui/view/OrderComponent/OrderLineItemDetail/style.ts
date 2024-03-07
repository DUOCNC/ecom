import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const OrderItemDetailStyle = StyleSheet.create({
  itemContainer: {
    padding: normalize(16),
    flexDirection: 'row',
  },
  imgItem: {
    width: normalize(64),
    height: normalize(80),
    borderRadius: normalize(5),
  },
  itemRight: {
    marginLeft: normalize(12),
    flex: 1,
  },
  rowSku: {
    marginTop: normalize(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtSubText: {
    color: Colors.SubText2,
  },
  borderItem: {
    flex: 1,
    borderBottomWidth: normalize(1),
    borderBottomColor: Colors.Border,
    marginLeft: normalize(92),
  },
  rowPrice: {
    marginTop: normalize(8),
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  txtPrice: {
    textDecorationLine: 'line-through',
    marginRight: normalize(5),
    color: Colors.SubText2,
  },
  quantity: {
    color: Colors.SubText,
  },
  txtBlue: {
    color: Colors.Blue,
  },
});

export default OrderItemDetailStyle;
