import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const style = StyleSheet.create({
  btn: {
    flex: 1,
    alignItems: 'center',
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.primary.o500,
    borderRadius: DimentionUtils.scale(5),
    justifyContent: 'center',
    height: DimentionUtils.scale(44),
    marginHorizontal: DimentionUtils.scale(16),
  },
  btnPrimary: {
    backgroundColor: colors.primary.o500,
    marginLeft: DimentionUtils.scale(0),
  },
  bottom: {
    paddingTop: normalize(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#A8A8A8',
    backgroundColor: colors.base.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  txt: {
    margin: DimentionUtils.scale(16),
  },
});

export default style;
