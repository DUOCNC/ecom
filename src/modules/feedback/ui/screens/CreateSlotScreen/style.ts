import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  body: {
    padding: DimentionUtils.scale(16),
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
  },

  title: {
    marginBottom: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(3),
  },
  container: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(24),
    flex: 1,
  },
  warning: {
    backgroundColor: colors.warning.o50,
    flexDirection: 'row',
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(32),
    borderRadius: 8,
  },
  icWarning: {
    marginRight: DimentionUtils.scale(8)
  }
});

export default style;
