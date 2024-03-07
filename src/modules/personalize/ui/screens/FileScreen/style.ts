import {DimentionUtils} from 'common-ui';
import {Dimensions, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  pdf: {flex: 1},
  video: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2,
  },
  image: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  zoomed: {
    transform: [{scale: 2}], // Phóng to ảnh bằng cách áp dụng scale
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default style;
