import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  container: {
    marginTop: DimentionUtils.scale(8),
    borderBottomWidth: DimentionUtils.scale(1),
    borderBottomColor: colors.secondary.o200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: DimentionUtils.scale(12),
    paddingBottom: DimentionUtils.scale(4),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  title: {
    flex: 1,
  },
  btnRight: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginBottom: DimentionUtils.scale(8),
  },
  notFoundText: {
    paddingHorizontal: 16,
  },
});

export default style;
