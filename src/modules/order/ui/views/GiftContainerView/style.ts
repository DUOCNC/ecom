import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  container: {},
  emptyState: {
    paddingVertical: DimentionUtils.scale(24),
    alignItems: 'center',
  },
  title: {
    paddingVertical: DimentionUtils.scale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(16),
  },
  iconRight: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftProgramLineItemViewContainer: {
    marginBottom: DimentionUtils.scale(8),
  },
});

export default style;
