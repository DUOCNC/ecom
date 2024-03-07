import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowLoadMore: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(10),
  },
  searchingView: {
    position: 'absolute',
    alignSelf: 'center',
    top: normalize(60),
    zIndex: 100000,
  },
  emptyView: {
    backgroundColor: Colors.White,
    alignItems: 'center',
    paddingTop: '30%',
    flex: 1,
  },
});

export default styles;
