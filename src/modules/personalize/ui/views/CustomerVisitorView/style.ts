import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const CustomerVisitorStyle = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
    borderRadius: normalize(5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    marginTop: normalize(4),
    flex: 1,
  },
  mainStore: {
    height: normalize(40),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: normalize(8),
  },
  viewStore: {
    width: normalize(24),
    height: normalize(24),
    backgroundColor: Colors.Primary,
    padding: normalize(4),
    borderRadius: normalize(12),
  },
  icStore: {
    width: '100%',
    height: '100%',
  },
  txtStore: {
    flex: 1,
    marginHorizontal: normalize(12),
  },
  btnRight: {
    width: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(40),
  },
  controlContainer: {
    marginTop: normalize(8),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  controlLeft: {
    flex: 1,
  },
  controlRight: {
    marginLeft: normalize(16),
  },
  note: {
    marginTop: normalize(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtNote: {
    color: '#667085',
  },
  txtGrow: {
    marginRight: normalize(5),
  },
  txtUp: {
    color: '#027A48',
  },
  txtDown: {
    color: Colors.Error700,
  },
  icGrow: {
    width: normalize(12),
    marginRight: normalize(5),
    height: normalize(12),
  },
  viewLoading: {
    paddingVertical: normalize(24),
  },
  txtTooltip: {
    flexWrap: 'wrap',
  },
  contentStyle: {
    backgroundColor: Colors.White,
    elevation: 2,
  },
  tooltip: {
    maxWidth: normalize(200),
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  arrowStyle: {
    zIndex: 1,
  },
  confirmMess: {textAlign: 'center', marginHorizontal: normalize(16)},
});

export default CustomerVisitorStyle;
