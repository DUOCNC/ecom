import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {Dimensions, StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const width = Dimensions.get('window').width;
const widthItem = (width - normalize(32) * 2) / 4;

const MyActionStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    paddingHorizontal: normalize(16),
    paddingTop: normalize(16),
    borderRadius: normalize(5),
    paddingBottom: DimentionUtils.scale(16),
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
  },
  btn: {
    paddingTop: normalize(12),
    alignItems: 'center',
    width: widthItem - 1,
  },
  txtName: {
    marginTop: normalize(8),
  },
  displayNone: {
    display: 'none',
  },
  subTitle: {
    paddingHorizontal: DimentionUtils.scale(4),
    paddingVertical: DimentionUtils.scale(4),
    backgroundColor: colors.primary.o50,
    marginTop: DimentionUtils.scale(12),
    borderRadius: DimentionUtils.scale(4),
  },
});

export default MyActionStyle;
