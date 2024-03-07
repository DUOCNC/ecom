import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary.o50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '57%',
    height: '57%',
  },
  title: {
    marginTop: DimentionUtils.scale(8),
  },
});

export default style;
