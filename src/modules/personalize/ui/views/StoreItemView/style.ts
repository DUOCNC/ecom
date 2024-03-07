import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    height: DimentionUtils.scale(48),
    flexDirection: 'row',
    paddingHorizontal: DimentionUtils.scale(16),
    alignItems: 'center',
  },
  selected: {
    backgroundColor: colors.primary.o10,
    marginVertical: DimentionUtils.scale(-1),
  },
});

export default style;
