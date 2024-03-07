import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const CountStyle = StyleSheet.create({
  container: {
    height: normalize(48),
    width: '100%',
    borderWidth: normalize(1),
    borderColor: Colors.Gray200,
    borderRadius: normalize(5),
    backgroundColor: Colors.Transparent,
    paddingHorizontal: normalize(16),
    alignItems: 'center',
    flexDirection: 'row',
  },
  btn: {
    width: normalize(24),
    height: normalize(24),
    borderWidth: normalize(1),
    borderColor: Colors.Gray200,
    borderRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    flex: 1,
    paddingHorizontal: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icBtn: {
    width: normalize(14),
  },
  iconDisable: {
    tintColor: Colors.Gray200,
  },
});

export default CountStyle;
