import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const ExpectedSalaryStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    marginTop: normalize(8),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    paddingTop: '40%',
    alignItems: 'center',
  },
  viewInfo: {
    marginTop: normalize(6),
    paddingVertical: normalize(12),
    alignItems: 'center',
    marginHorizontal: normalize(16),
  },
  avatar: {
    width: normalize(56),
    height: normalize(56),
  },
  txtFullName: {
    marginTop: normalize(16),
  },
  txtPosition: {
    marginTop: normalize(2),
    color: Colors.Gray400,
  },
  viewContent: {
    marginHorizontal: normalize(16),
    backgroundColor: Colors.Background3,
    padding: normalize(16),
    borderRadius: normalize(8),
    marginBottom: normalize(8),
  },
  viewContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: normalize(35),
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
  contentStyle: {
    backgroundColor: Colors.White,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTooltip: {
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  viewContentSalary: {
    marginTop: normalize(8),
  },
  card: {
    borderTopWidth: normalize(1),
    borderTopColor: Colors.Border,
    marginTop: normalize(8),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
  },
  rowDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(16),
  },
  rowDetailRule: {
    paddingBottom: normalize(14),
    borderBottomWidth: normalize(1),
    borderBottomColor: Colors.Gray200,
  },
  txtTitle: {
    color: '#667085',
  },
  txtValue: {
    color: Colors.Primary,
  },
  txtDate: {
    color: '#101828',
  },
  warning: {
    marginHorizontal: normalize(16),
    borderRadius: normalize(7),
    backgroundColor: Colors.Warning25,
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(14),
    marginVertical: normalize(10),
    flexDirection: 'row',
  },
  txtWarning: {
    color: Colors.Warning400,
    flex: 1,
    paddingHorizontal: normalize(10),
    fontSize: normalize(12),
  },
  txtSupport: {
    color: Colors.Primary,
  },
  arrowStyle: {
    zIndex: 1,
  },
  txtHint: {
    color: Colors.Gray500,
  },
});

export default ExpectedSalaryStyle;
