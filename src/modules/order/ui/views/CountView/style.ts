import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const CountStyle = StyleSheet.create({
  container: {
    height: DimentionUtils.scale(24),
    borderColor: Colors.Gray200,
    borderRadius: DimentionUtils.scale(5),
    backgroundColor: Colors.Transparent,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btn: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    borderWidth: DimentionUtils.scale(1),
    borderColor: Colors.Gray200,
    borderRadius: DimentionUtils.scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    paddingHorizontal: DimentionUtils.scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icBtn: {
    width: DimentionUtils.scale(10),
  },
  icPlus: {
    height: DimentionUtils.scale(12),
  },
  iconDisable: {
    tintColor: Colors.Gray200,
  },
  textDisabled: {
    color: Colors.Red,
  },
});

export default CountStyle;
