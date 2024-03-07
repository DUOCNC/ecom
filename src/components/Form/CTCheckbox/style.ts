import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const CTCheckStyle = StyleSheet.create({
  checkboxIconStyle: {
    borderColor: 'transparent',
    borderRadius: 4,
  },
  label: {
    marginLeft: DimentionUtils.scale(8),
  },
  row: {
    flexDirection: 'row',
  },
});

export default CTCheckStyle;
