import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(12),
  },
  data: {
    flex: 1,
    borderBottomWidth: DimentionUtils.scale(1),
    borderBottomColor: colors.secondary.o200,
    paddingBottom: DimentionUtils.scale(4),
  },
  title: {
    flex: 1,
    marginBottom: DimentionUtils.scale(12),
    paddingTop: DimentionUtils.scale(2),
  },
  subTitle: {
    width: '30%',
  },
  value: {
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  rowData: {
    flex: 1,
    marginBottom: DimentionUtils.scale(8),
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default style;
