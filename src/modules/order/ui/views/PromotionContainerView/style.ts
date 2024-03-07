import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(12),
    paddingBottom: DimentionUtils.scale(20),
  },
  emptyState: {
    paddingVertical: DimentionUtils.scale(24),
    alignItems: 'center',
  },
  title: {
    paddingBottom: DimentionUtils.scale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconRight: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    backgroundColor: colors.secondary.o200,
    height: DimentionUtils.scale(52),
    borderRadius: DimentionUtils.scale(5),
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(4),
  },
  amountValue: {
    paddingTop: DimentionUtils.scale(4),
  },
  selectInput: {
    marginBottom: DimentionUtils.scale(16),
    height: DimentionUtils.scale(54),
    borderRadius: DimentionUtils.scale(5),
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(4),
    borderColor: colors.secondary.o200,
    borderWidth: DimentionUtils.scale(1),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconArrow: {
    justifyContent: 'center',
  },
  promotionTitle: {
    flex: 1,
    paddingRight: DimentionUtils.scale(16),
  },
  disabled: {
    backgroundColor: colors.secondary.o200,
  },
  promoValue: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: DimentionUtils.scale(4),
  },
  value: {
    marginLeft: DimentionUtils.scale(8),
    backgroundColor: colors.error.o50,
    paddingHorizontal: DimentionUtils.scale(6),
    paddingVertical: DimentionUtils.scale(2),
    borderRadius: DimentionUtils.scale(30),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.error.o200,
  },
});

export default style;
