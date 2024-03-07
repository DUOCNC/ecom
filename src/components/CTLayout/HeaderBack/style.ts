import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {Size} from 'assets/theme';

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
  btnBack: {
    width: Size.DefaultToolbarHeight,
    height: Size.DefaultToolbarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Size.DefaultToolbarHeight,
    paddingHorizontal: normalize(16),
    alignItems: 'center',
  },
  rowTitle: {
    height: normalize(50),
    flex: 1,
    paddingHorizontal: normalize(15),
    alignItems: 'center',
    flexDirection: 'row',
  },
  edge: {
    flex: 1,
  },
  center: {
    width: '60%',
    marginHorizontal: normalize(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;
