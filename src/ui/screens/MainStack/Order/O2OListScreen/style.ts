import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const PosListStyle = StyleSheet.create({
  icon: {
    marginLeft: normalize(10),
  },
  empty: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },
  statusContainer: {
    maxHeight: DimentionUtils.scale(66),
    paddingTop: DimentionUtils.scale(16),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  statusElement: {
    borderWidth: 1,
    borderRadius: DimentionUtils.scale(40),
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(8),
    marginRight: DimentionUtils.scale(12),
  },
});

export {PosListStyle};
