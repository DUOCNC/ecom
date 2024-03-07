import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const OrderLineItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  variant: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(16),
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
  },
  bottomRemove: {
    backgroundColor: colors.error.o700,
  },
});

export {OrderLineItemStyle};
