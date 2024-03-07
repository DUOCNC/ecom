import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const RBSheetStyle = StyleSheet.create({
  container: {
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
  },
  draggableIcon: {
    width: normalize(40),
  },
});

export {RBSheetStyle};
