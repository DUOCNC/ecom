import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  formSearch: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingBottom: DimentionUtils.scale(8),
  },
  button: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rule: {
    height: DimentionUtils.scale(1),
    backgroundColor: colors.secondary.o200,
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(22),
  },
  container: {
    flex: 1,
  },
  totalPriceContainer: {
    marginBottom: DimentionUtils.scale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalPriceTitle: {
    alignSelf: 'center',
  },
  awareScrollView: {
    flex: 1,
  },
  tabView: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default style;
