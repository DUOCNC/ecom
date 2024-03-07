import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    paddingTop: DimentionUtils.scale(16),
    flex: 1,
    paddingHorizontal: DimentionUtils.scale(16),
  },
  header: {
    marginTop: DimentionUtils.scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: DimentionUtils.scale(16),
  },
  rowTitle: {
    marginTop: DimentionUtils.scale(16),
    paddingHorizontal: DimentionUtils.scale(16),
    alignItems: 'center',
  },
  rowValueTitle: {
    marginTop: DimentionUtils.scale(4),
    paddingHorizontal: DimentionUtils.scale(16),
    alignItems: 'center',
  },
  rowSubValue: {
    marginTop: DimentionUtils.scale(8),
    paddingHorizontal: DimentionUtils.scale(16),
    alignItems: 'center',
  },
  view: {
    paddingHorizontal: DimentionUtils.scale(16),
    marginTop: DimentionUtils.scale(16),
  },
  scroll: {
    paddingBottom: DimentionUtils.scale(80),
  },
  notify: {
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(20),
    marginHorizontal: DimentionUtils.scale(16),
    paddingHorizontal: DimentionUtils.scale(16),
    backgroundColor: colors.primary.o50,
    borderRadius: DimentionUtils.scale(8),
    paddingVertical: DimentionUtils.scale(12),
    alignItems: 'center',
  },
  txtAttention: {
    marginLeft: DimentionUtils.scale(8),
    flex: 1,
  },
});

export default style;
