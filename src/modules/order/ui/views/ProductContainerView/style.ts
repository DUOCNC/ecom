import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    paddingHorizontal: DimentionUtils.scale(16),
    marginVertical: DimentionUtils.scale(12),
  },
  emptyState: {
    paddingVertical: DimentionUtils.scale(24),
    alignItems: 'center',
  },
  emptyView: {
    alignItems: 'center',
  },
  txtEmpty: {
    marginTop: DimentionUtils.scale(16),
  },
  btnAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    height: DimentionUtils.scale(40),
    marginTop: DimentionUtils.scale(4),
  },
  txtAdd: {
    marginLeft: DimentionUtils.scale(8),
  },
  giftProgramLineItemViewContainer: {
    marginBottom: DimentionUtils.scale(16),
  },
});

export default style;
