import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  header: {
    backgroundColor: colors.base.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: DimentionUtils.scale(8),
  },
  viewCreate: {
    paddingHorizontal: DimentionUtils.scale(16),
  },
  btnCreate: {
    backgroundColor: colors.base.white,
    height: DimentionUtils.scale(132),
    borderRadius: DimentionUtils.scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCreate: {
    marginBottom: DimentionUtils.scale(20),
  },
  messageConfirm: {
    alignItems: 'center',
  },
  storeName: {
    paddingTop: DimentionUtils.scale(2),
  },
});

export default style;
