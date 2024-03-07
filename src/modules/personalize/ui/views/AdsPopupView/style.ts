import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    //flex: 1,
    // backgroundColor: 'red',
  },
  container: {
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
    height: 444,
    width: 296,
    borderRadius: 8,
  },
  button: {
    borderRadius: 8,
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: 48,
  },
  iconClose: {
    position: 'absolute',
    left: 8,
    top: 8,
  },
});

export default styles;
