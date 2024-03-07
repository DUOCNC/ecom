import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const SearchCustomerStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnFeedBack: {
    flex: 1,
  },
  toolbar: {
    paddingHorizontal: normalize(24),
    height: normalize(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: normalize(8),
  },
  headerSearch: {
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(8),
    backgroundColor: Colors.White,
    flexDirection: 'row',
    marginBottom: 1,
  },
  viewInput: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    height: normalize(40),
    backgroundColor: '#F2F3F5',
    borderRadius: normalize(8),
    color: Colors.Black,
    paddingLeft: normalize(40),
    paddingRight: normalize(8),
    flex: 1,
  },
  iconSearch: {
    position: 'absolute',
    left: normalize(10),
    tintColor: 'rgb(194, 194, 194)',
  },
  buttonBarcode: {
    flexDirection: 'row',
    height: normalize(40),
    marginLeft: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF0FF',
    borderRadius: normalize(8),
    paddingHorizontal: normalize(8),
  },
  textBarcode: {
    color: '#0056F1',
    marginLeft: normalize(8),
  },
  body: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: normalize(24),
    width: '100%',
    zIndex: 10000,
  },
  bodySearch: {
    flex: 1,
  },
});

const CustomerHistoryStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    marginTop: normalize(8),
  },
  header: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
  },
  txtTitle: {
    color: Colors.SubText2,
  },
  txtEmpty: {
    width: '100%',
    marginVertical: normalize(12),
    marginHorizontal: normalize(24),
  },
  bottomButton: {
    height: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  containerSearch: {
    backgroundColor: Colors.White,
  },
});

export {SearchCustomerStyle, CustomerHistoryStyle};
