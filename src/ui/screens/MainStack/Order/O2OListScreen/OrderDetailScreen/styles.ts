import {normalize} from 'utils/DimensionsUtils';
import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';
import {Size} from 'assets/theme';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const OrderDetailStyle = StyleSheet.create({
  card: {},
  scrollView: {
    flex: 1,
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(12),
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: normalize(18),
    paddingLeft: normalize(48),
  },
  txtTitle: {
    color: colors.secondary.o500,
  },
  paymentMethod: {
    maxWidth: '55%',
  },
  txtValue: {
    maxWidth: '45%',
    textAlign: 'right',
  },
  txtBlue: {
    color: Colors.Blue,
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
  rowNote: {
    paddingHorizontal: Size.DefaultHorizontal,
    paddingLeft: DimentionUtils.scale(44),
    marginBottom: DimentionUtils.scale(16),
  },
  otherCardRow: {
    paddingLeft: normalize(16),
  },
  bottom: {
    backgroundColor: Colors.White,
  },
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
  quality: {
    color: Colors.SubText,
  },
  viewInfo: {
    paddingTop: normalize(16),
    paddingBottom: 0,
  },
  bgCustomerLevel: {
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
  },
  txtLevel: {
    color: '#E6A114',
  },
  pb8: {marginBottom: DimentionUtils.scale(12)},
  iconCheck: {
    tintColor: colors.primary.o500,
    backgroundColor: colors.base.white,
  },
  timeline: {
    paddingTop: DimentionUtils.scale(16),
    paddingBottom: DimentionUtils.scale(8),
    paddingRight: DimentionUtils.scale(16),
    paddingLeft: DimentionUtils.scale(36),
  },
  timeLineDetail: {
    marginTop: DimentionUtils.scale(-10),
  },
  row1: {},
  row2: {paddingTop: DimentionUtils.scale(4)},
  row1Address: {
    marginBottom: DimentionUtils.scale(4),
  },
  separator: {
    height: DimentionUtils.scale(8),
    backgroundColor: Colors.Gray200,
  },
  trackingCode: {
    maxHeight: DimentionUtils.scale(24),
    maxWidth: '55%',
  },
});

export {OrderDetailStyle};
