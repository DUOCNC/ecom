import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(16),
    backgroundColor: colors.secondary.o50,
  },
  item: {
    marginVertical: DimentionUtils.scale(8),
  },
});

export default style;
