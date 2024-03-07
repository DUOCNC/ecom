import { colors } from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: DimentionUtils.scale(16)},
  row: {flexDirection: 'row'},
  title: {
    paddingTop: DimentionUtils.scale(16),
    paddingBottom: DimentionUtils.scale(8),
  },
  body: {
    marginTop: DimentionUtils.scale(16),
    flex: 1,
  },
  option: {
    paddingVertical: DimentionUtils.scale(12),
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: DimentionUtils.scale(4),
    paddingRight: DimentionUtils.scale(8),
  },
  optionContent: {
    paddingLeft: DimentionUtils.scale(8),
    marginRight: DimentionUtils.scale(8),
    paddingRight: DimentionUtils.scale(8),
  },
  question: {
    paddingTop: DimentionUtils.scale(8),
  },
  countdown: {
    paddingVertical: DimentionUtils.scale(8),
    flexDirection: 'row',
  },
  pr50: {
    paddingRight: DimentionUtils.scale(54),
  },
  titleText: {
    lineHeight: 22,
    fontWeight: '500',
    fontSize: DimentionUtils.scale(14),
    color: colors.secondary.o900,
  },
  avoidingView: {
    flex: 1,
  },
});
export default style;
