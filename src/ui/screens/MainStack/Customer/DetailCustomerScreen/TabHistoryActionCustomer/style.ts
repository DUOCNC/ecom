import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const TabHistoryStyle = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  rowLoading: {
    marginTop: normalize(24),
  },
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: normalize(16),
  },
  btnEmpty: {
    width: normalize(248),
  },
  txtCreate: {
    color: '#1656F1',
  },
  viewInput: {
    flexDirection: 'row',
    backgroundColor: '#F2F3F5',
    marginHorizontal: normalize(24),
    paddingHorizontal: normalize(12),
    height: normalize(40),
    borderRadius: normalize(12),
    marginVertical: normalize(12),
    alignItems: 'center',
  },
  input: {
    marginLeft: normalize(8),
    flex: 1,
  },
  headerSearch: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    backgroundColor: Colors.White,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  viewLoading: {
    position: 'absolute',
    alignSelf: 'center',
    top: normalize(60),
    zIndex: 100000,
  },
  emptyView: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
  },
});

export {TabHistoryStyle};
