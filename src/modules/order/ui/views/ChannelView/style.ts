import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  container: {
    marginTop: DimentionUtils.scale(8),
    backgroundColor: colors.base.white,
    borderRadius: DimentionUtils.scale(5),
    marginHorizontal: DimentionUtils.scale(16),
  },
  header: {
    flexDirection: 'row',
    height: DimentionUtils.scale(48),
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(16),
    borderBottomWidth: DimentionUtils.scale(1),
    borderBottomColor: colors.secondary.o200,
  },
  txtHeader: {
    marginLeft: DimentionUtils.scale(12),
  },
  body: {
    paddingHorizontal: DimentionUtils.scale(16),
  },
  btn: {
    height: DimentionUtils.scale(48),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBorder: {
    borderBottomWidth: DimentionUtils.scale(1),
    borderBottomColor: colors.secondary.o200,
  },
  messageConfirm: {
    alignItems: 'center',
  },
  storeName: {
    paddingTop: DimentionUtils.scale(2),
  },
  newFeature: {
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: colors.success.o50,
    paddingVertical: DimentionUtils.scale(2),
    paddingHorizontal: DimentionUtils.scale(12),
    borderColor: colors.success.o200,
    marginLeft: DimentionUtils.scale(8),
  },
});

export default style;
