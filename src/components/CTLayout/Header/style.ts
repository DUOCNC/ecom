import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    zIndex: 100000,
    shadowColor: '#A8A8A8',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
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
