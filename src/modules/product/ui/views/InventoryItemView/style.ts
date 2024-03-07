import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlight: {
    color: Colors.Gray900,
  },
  text: {
    color: Colors.Gray500,
  },
  value: {
    color: Colors.Gray900,
  },
  highlightValue: {
    color: Colors.Primary,
  },
});
export default Style;
