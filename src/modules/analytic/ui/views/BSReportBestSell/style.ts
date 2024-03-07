import {Colors} from 'assets/colors';
import {Platform, StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const bsStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    justifyContent: 'space-between',
  },
  rowAll: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: normalize(8),
    justifyContent: 'space-between',
    paddingLeft: normalize(16),
    borderBottomColor: Colors.Background2,
    borderBottomWidth: normalize(1),
    height: normalize(40),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(8),
    paddingStart: normalize(20),
    height: normalize(50),
  },
  checkboxIconStyle: {
    borderColor: 'transparent',
    borderRadius: 4,
  },
  title: {
    height: normalize(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.Background2,
    borderBottomWidth: normalize(1),
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(16),
  },
  titleText: {
    color: Colors.Gray900,
  },
  rowBottom: {
    flexDirection: 'row',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
    backgroundColor: Colors.White,
    marginTop: normalize(4),
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: '#000000',
    elevation: 4,
    height: Platform.OS === 'ios' ? normalize(80) : undefined,
  },
  flex1: {
    flex: 1,
  },
  content: {
    paddingTop: normalize(10),
  },
});

export {bsStyle};
