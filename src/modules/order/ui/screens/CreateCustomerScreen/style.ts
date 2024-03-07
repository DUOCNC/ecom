import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  row: {
    marginTop: normalize(16),
    paddingHorizontal: normalize(18),
  },
  container: {
    flex: 1,
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(22),
  },
});

export default style;
