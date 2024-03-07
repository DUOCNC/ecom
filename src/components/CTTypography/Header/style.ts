import {Size} from 'assets/theme';
import {StyleSheet} from 'react-native';

const HeaderStyle = StyleSheet.create({
  h1: {
    lineHeight: Size.H1LineHeight,
  },
  h2: {
    lineHeight: Size.H2LineHeight,
  },
  h3: {
    lineHeight: Size.H3LineHeight,
  },
});

export default HeaderStyle;
