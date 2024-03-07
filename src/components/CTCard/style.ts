import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: Colors.Transparent,
    height: normalize(48),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: normalize(18),
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: normalize(10),
  },
  headerText: {
    marginRight: normalize(10),
  },
  headerSubText: {
    color: Colors.SubText2,
  },
  headerLine: {
    borderBottomWidth: normalize(1),
    borderBottomColor: Colors.Border,
  },
  body: {
    marginTop: normalize(4),
  },
});

export {style};
