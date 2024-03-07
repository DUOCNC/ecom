import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';

const style = StyleSheet.create({
  formSearch: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingBottom: DimentionUtils.scale(8),
  },
  toolbar: {
    backgroundColor: colors.base.white,
    top: 0,
    zIndex: 100000,
  },
  btnTab: {
    height: DimentionUtils.scale(44),
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabSelected: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.primary.o500,
    height: DimentionUtils.scale(2),
  },
  txtTab: {
    marginHorizontal: DimentionUtils.scale(16),
  },
});

export default style;
