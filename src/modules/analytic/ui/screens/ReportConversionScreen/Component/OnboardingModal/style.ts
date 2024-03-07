import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  onboardingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    paddingTop: DimentionUtils.scale(60),
    paddingHorizontal: DimentionUtils.scale(20),
    paddingBottom: DimentionUtils.scale(60),
  },
  container: {flex: 1},
  page: {
    borderRadius: DimentionUtils.scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClose: {
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(20),
    backgroundColor: colors.primary.o500,
    height: DimentionUtils.scale(48),
    borderRadius: DimentionUtils.scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: DimentionUtils.scale(16),
  },
  dot: {
    width: DimentionUtils.scale(16),
    height: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(25),
    marginHorizontal: DimentionUtils.scale(5),
    borderWidth: 1,
    borderColor: colors.primary.o700,
    backgroundColor: colors.base.white,
    alignContent: 'center',
    justifyContent: 'center',
  },
  dotActive: {
    borderWidth: 0,
    borderRadius: DimentionUtils.scale(25),
    margin: DimentionUtils.scale(2),
    backgroundColor: colors.primary.o700,
    flex: 1,
  },
  viewDot: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export {style};
