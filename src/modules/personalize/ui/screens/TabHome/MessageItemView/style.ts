import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(16),
  },
  bot: {
    backgroundColor: colors.warning.o50,
    marginRight: DimentionUtils.scale(60),
    paddingVertical: DimentionUtils.scale(8),
    paddingHorizontal: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(12),
  },
  answer: {
    flexDirection: 'row-reverse',
    marginRight: DimentionUtils.scale(60),
  },
  answerContent: {
    borderRadius: DimentionUtils.scale(12),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.primary.o100,
    paddingVertical: DimentionUtils.scale(8),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  icon: {
    height: DimentionUtils.scale(30),
    width: DimentionUtils.scale(24),
  },
  message: {
    marginLeft: DimentionUtils.scale(12),
  },
});

export {Style};
