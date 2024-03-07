import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  rowBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: normalize(50),
    paddingHorizontal: normalize(15),
    alignItems: 'center',
  },
  rowTitle: {
    height: normalize(50),
    flex: 1,
    paddingHorizontal: normalize(15),
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default style;
