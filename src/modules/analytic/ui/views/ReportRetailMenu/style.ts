import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const ReportRetailMenuStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  row: {
    flexDirection: 'row',
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
    alignItems: 'center',
    height: normalize(44),
    marginTop: normalize(8),
  },
});

export {ReportRetailMenuStyle};
