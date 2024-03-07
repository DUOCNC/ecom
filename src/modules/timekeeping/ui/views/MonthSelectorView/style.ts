import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
const style = StyleSheet.create({
  monthItem: {
    flexDirection: 'row',
    height: DimentionUtils.scale(34),
    width: DimentionUtils.scale(78),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: DimentionUtils.scale(24),
    backgroundColor: colors.secondary.o100,
    marginHorizontal: DimentionUtils.scale(4),
  },
  monthSelected: {
    borderRadius: DimentionUtils.scale(24),
    backgroundColor: colors.base.white,
    borderWidth: 1,
    borderColor: colors.primary.o500,
    alignItems: 'center',
  },
});

export default style;
