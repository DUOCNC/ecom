import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(16),
    backgroundColor: Colors.White,
  },
  txtCode: {
    color: Colors.Blue,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  product: {
    marginLeft: normalize(18),
  },
  firstRow: {
    justifyContent: 'space-between',
  },
  twoRow: {
    marginTop: normalize(4),
  },
  txtStore: {
    marginLeft: normalize(10),
    color: Colors.SubText,
  },
  threeRow: {
    marginTop: normalize(4),
  },
  icon: {
    tintColor: Colors.Icon,
    width: normalize(15),
  },
  viewSubStatus: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(2),
    borderRadius: normalize(30),
    borderWidth: normalize(1),
  },
  txtStatus: {
    lineHeight: normalize(20),
  },
  createDate: {
    marginLeft: DimentionUtils.scale(4),
  },
});

export default style;