import {DimentionUtils} from 'common-ui';
import {Dimensions, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  pdf: {
    width: DimentionUtils.scale(300),
    height: DimentionUtils.scale(350),
  },
  video: {
    width: DimentionUtils.scale(300),
    height: DimentionUtils.scale(280),
  },
  image: {
    width: DimentionUtils.scale(300),
    height: DimentionUtils.scale(300),
  },

  webview: {
    // flex: 1,
    // width: '100%',
    // height: '100%',
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
  viewFull: {
    width: Dimensions.get('screen').width - 32,
  },
});

export default style;
