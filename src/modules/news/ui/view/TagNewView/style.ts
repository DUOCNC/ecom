import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {},
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.warning.o50,
    width: DimentionUtils.scale(38),
  },
  text: {},
});

export default style;
