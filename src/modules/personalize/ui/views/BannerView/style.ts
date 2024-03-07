import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  banner: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: DimentionUtils.scale(12),
    marginHorizontal: DimentionUtils.scale(16),
  },
  image: {
    resizeMode: 'contain',
    marginRight: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(5),
  },
});

export default style;
