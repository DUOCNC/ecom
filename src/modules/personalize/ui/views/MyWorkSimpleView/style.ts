import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width;
const widthItem = (width - normalize(32) * 2) / 4;

const MyActionStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    paddingHorizontal: normalize(16),
    paddingTop: normalize(16),
    borderRadius: normalize(5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtTitle: {
    color: Colors.Blue,
  },
  btnReport: {
    flexDirection: 'row',
  },
  txtReport: {
    color: Colors.Blue,
    marginRight: normalize(5),
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: normalize(8),
  },
  btn: {
    paddingBottom: normalize(16),
    alignItems: 'center',
    width: widthItem - 1,
  },
  txtName: {
    marginTop: normalize(8),
  },
  displayNone: {
    display: 'none',
  },
});

export default MyActionStyle;
