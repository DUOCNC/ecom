import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const ReportItemStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(4),
    marginHorizontal: normalize(16),
    height: normalize(80),
    paddingHorizontal: normalize(16),
    borderWidth: normalize(1),
    borderStyle: 'dashed',
    borderColor: Colors.Blue50,
    borderRadius: normalize(5),
    backgroundColor: Colors.Background3,
  },
  title: {
    height: normalize(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.Background2,
    borderBottomWidth: normalize(1),
    paddingHorizontal: normalize(16),
    marginBottom: normalize(8),
  },
  itemTitle: {
    color: Colors.Text,
  },
  icon: {
    height: normalize(48),
    width: normalize(48),
    marginRight: normalize(12),
  },
  bgDisable: {
    backgroundColor: Colors.Background,
  },
  rowText: {
    // backgroundColor: 'red',
  },
  subText: {
    paddingTop: normalize(8),
  },
});

export {ReportItemStyle};
