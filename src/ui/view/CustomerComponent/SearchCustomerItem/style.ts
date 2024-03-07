import {normalize} from 'utils/DimensionsUtils';
import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';

const SearchCustomerItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: normalize(48),
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    backgroundColor: Colors.White,
  },
  result: {
    flex: 1,
    marginLeft: normalize(10),
  },
});

const CustomerItemStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    padding: normalize(16),
  },
  body: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(4),
  },
  txtLevel: {
    color: Colors.Secondary,
  },
  viewLevel: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(2),
    marginLeft: normalize(24),
    height: normalize(22),
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    borderRadius: normalize(30),
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
    borderWidth: normalize(1),
  },
  txtFullName: {
    color: Colors.Blue,
  },
  view: {
    marginHorizontal: normalize(8),
    width: normalize(2),
    backgroundColor: Colors.Border,
    height: '100%',
  },
  justify: {
    justifyContent: 'space-between',
  },
});

export {SearchCustomerItemStyle, CustomerItemStyle};
