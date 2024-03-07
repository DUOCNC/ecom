import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  icon: {
    marginLeft: normalize(10),
  },
  empty: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },

  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(22),
  },
});

export default style;
