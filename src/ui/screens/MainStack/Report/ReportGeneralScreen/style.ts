import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const ReportGeneralStyle = StyleSheet.create({
  body: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  itemMenu: {
    flexDirection: 'row',
    height: normalize(48),
    width: '100%',
    paddingHorizontal: normalize(18),
    alignItems: 'center',
  },
  txtMenu: {
    marginHorizontal: normalize(12),
    flex: 1,
    color: Colors.Text,
  },
  icon: {
    width: normalize(20),
    height: normalize(20),
  },
});
export {ReportGeneralStyle};
