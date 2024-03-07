import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import {colors} from 'assets/v2';
const style = StyleSheet.create({
  formSearch: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingBottom: DimentionUtils.scale(8),
  },
  container: {
    paddingTop: DimentionUtils.scale(8),
  },
  border: {
    height: DimentionUtils.scale(1),
    backgroundColor: colors.secondary.o200,
  },
  btn: {
    height: DimentionUtils.scale(48),
    paddingHorizontal: DimentionUtils.scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: DimentionUtils.scale(8),
    color: colors.base.white,
  },
  inputDisplay: {
    color: colors.primary.o500,
    marginLeft: DimentionUtils.scale(8),
    flex: 1,
  },
  btnDropdown: {
    height: normalize(35),
    alignItems: 'center',
    justifyContent: 'center',
    tintColor: colors.primary.o500,
  },
});

export default style;
