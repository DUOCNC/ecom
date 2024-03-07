import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  bottom: {
    zIndex: 100000,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 10,
  },
});

export default style;
