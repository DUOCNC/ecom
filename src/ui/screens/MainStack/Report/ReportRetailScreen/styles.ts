import {Platform, StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';

const detailReportStyles = StyleSheet.create({
  row: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(8),
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: normalize(44),
    paddingHorizontal: normalize(16),
  },
  navBar: {
    backgroundColor: Colors.White,
    paddingStart: normalize(8),
    paddingEnd: normalize(16),
    paddingTop: normalize(8),
    paddingBottom: normalize(16),
  },
  shadow: {
    height: normalize(1),
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  middleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 24,
    color: Colors.Black,
    fontWeight: '600',
    alignItems: 'center',
    marginStart: normalize(8),
    marginEnd: normalize(8),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: normalize(16),
  },
  timePicker: {
    flex: 1,
    flexDirection: 'row',
    marginStart: normalize(8),
  },
  timeTitle: {
    fontSize: normalize(14),
    alignSelf: 'center',
    color: 'blue',
    marginEnd: normalize(4),
  },
  timeImage: {
    alignSelf: 'center',
    tintColor: 'blue',
  },
  storePicker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  storeTitle: {
    fontSize: normalize(14),
    color: Colors.Text,
    alignSelf: 'center',
    marginEnd: normalize(4),
  },
  storeImage: {
    alignSelf: 'center',
  },
  body: {
    backgroundColor: Colors.White,
  },
  tabContainer: {
    paddingHorizontal: normalize(16),
    backgroundColor: Colors.White,
  },
  tab: {
    borderColor: Colors.Transparent,
    backgroundColor: Colors.White,
  },
  activeTab: {
    backgroundColor: Colors.White,
    borderBottomColor: 'blue',
  },
  tabText: {
    color: '#8f8f8f',
  },
  activeTabText: {
    color: 'blue',
  },
  tabButton: {
    height: normalize(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  divider: {
    height: normalize(8),
    backgroundColor: Colors.White,
  },
  rowNavigationBar: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(14),
    backgroundColor: Colors.White,
    marginTop: normalize(1),
  },
  param: {
    flexDirection: 'row',
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(16),
  },
  keyDriver: {
    paddingVertical: normalize(16),
  },
  chart: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: normalize(200),
    marginTop: normalize(20),
  },
  notDataChart: {
    height: normalize(100),
  },
});

const generalInfoStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: normalize(16),
  },
  item: {
    flex: 1,
  },
  backgroundImage: {
    justifyContent: 'center',
    height: normalize(90),
  },
  itemBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  itemValue: {
    fontWeight: '500',
    color: Colors.Blue,
    letterSpacing: 0.5,
  },
  itemTitle: {
    textAlign: 'center',
    color: Colors.Text,
  },
});

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

export {detailReportStyles, generalInfoStyles, bsStyle};
