import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
const style = StyleSheet.create({
  timeNow: {
    borderWidth: DimentionUtils.scale(1),
    borderRadius: DimentionUtils.scale(8),
    borderColor: colors.secondary.o200,
    backgroundColor: colors.secondary.o50,
    padding: DimentionUtils.scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    width: DimentionUtils.scale(80),
  },
  textTimeNow: {},
  locate: {
    alignItems: 'center',
    paddingVertical: DimentionUtils.scale(16),
    height: DimentionUtils.scale(200),
  },
});

export {style};
