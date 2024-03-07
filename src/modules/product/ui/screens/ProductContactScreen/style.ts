import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const ContactStyle = StyleSheet.create({
  container: {
    paddingTop: DimentionUtils.scale(8),
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: DimentionUtils.scale(16),
    marginVertical: DimentionUtils.scale(8),
    paddingVertical: DimentionUtils.scale(12),
  },
  icon: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    tintColor: Colors.Gray400,
  },
  btnText: {marginLeft: DimentionUtils.scale(10)},
});
export default ContactStyle;
