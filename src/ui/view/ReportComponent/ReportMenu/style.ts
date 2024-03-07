import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const ReportMenuStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  left: {
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(4),
    height: normalize(54),
    paddingHorizontal: normalize(16),
    justifyContent: 'space-between',
  },
  itemTitle: {
    color: Colors.Text,
  },
  icon: {
    height: normalize(24),
    width: normalize(24),
  },
  bgDisable: {
    backgroundColor: Colors.Background,
  },
  rowText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  icArrow: {
    tintColor: '#A3A8AF',
  },
  viewIcon: {
    borderRadius: normalize(25),
    backgroundColor: '#F0F5FF',
    height: normalize(30),
    width: normalize(30),
    marginRight: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  developing: {
    color: Colors.Gray400,
  },
});

export {ReportMenuStyle};
