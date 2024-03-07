import {Colors} from 'assets/colors';
import {Size} from 'assets/theme';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    paddingHorizontal: Size.DefaultHorizontal,
    marginTop: Size.DefaultVertical,
    borderColor: Colors.Border,
    flexDirection: 'row',
    flex: 1,
  },
});

export default style;
