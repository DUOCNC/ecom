import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  container: {
    marginBottom: DimentionUtils.scale(16),
  },
  headerLeft: {
    flex: 1,
  },
  textTotal: {
    paddingTop: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: DimentionUtils.scale(16),
  },
  description: {
    marginTop: DimentionUtils.scale(8),
  },
  icGrow: {
    width: normalize(12),
    marginRight: normalize(5),
    height: normalize(12),
  },
  text: {
    flex: 1,
  },
  count: {
    flex: 1,
  },
});

export default style;
