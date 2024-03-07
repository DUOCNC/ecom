import {normalize} from 'utils/DimensionsUtils';
import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';
import {Size} from 'assets/theme';

const DetailOrderReturnStyle = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  card: {
    marginTop: normalize(8),
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(24),
    marginBottom: normalize(12),
  },
  txtTitle: {
    color: Colors.SubText2,
  },
  txtValue: {
    maxWidth: '55%',
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
  bgPaid: {
    backgroundColor: '#F3FCF9',
    borderColor: '#B1F0D8',
  },
  txtPaid: {
    color: '#0DB473',
  },
  bgCustomerLevel: {
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
  },
  txtLevel: {
    color: '#E6A114',
  },
  rowNote: {
    paddingHorizontal: Size.DefaultHorizontal,
    marginBottom: normalize(12),
    flex: 1,
    color: Colors.Red,
  },
  otherCardRow: {
    paddingLeft: normalize(16),
  },
  viewInfo: {
    paddingTop: normalize(16),
    paddingBottom: 0,
  },
  txtNote: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

export {DetailOrderReturnStyle};
