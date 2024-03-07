import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const style = StyleSheet.create({
  active: {
    borderBottomWidth: normalize(2),
    borderBottomColor: Colors.Blue,
  },
  text: {color: Colors.SubText},
  textActive: {
    color: Colors.Blue,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(10),
  },
});
export {style};
