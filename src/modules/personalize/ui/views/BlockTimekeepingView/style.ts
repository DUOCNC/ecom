import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  container: {
    paddingTop: DimentionUtils.scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.base.white,
    paddingHorizontal: DimentionUtils.scale(20),
    marginHorizontal: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(8),
  },
  row3: {marginTop: DimentionUtils.scale(16)},
  row4: {
    marginTop: DimentionUtils.scale(16),
    width: '100%',
    lineHeight: 22,
  },
  row5: {marginTop: DimentionUtils.scale(4), lineHeight: 22},
  row6: {
    marginTop: DimentionUtils.scale(20),
    width: '100%',
  },
  row7: {
    width: '100%',
  },
  bottomClose: {
    height: DimentionUtils.scale(48),
    marginVertical: DimentionUtils.scale(20),
    paddingVertical: DimentionUtils.scale(10),
    borderRadius: DimentionUtils.scale(8),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
