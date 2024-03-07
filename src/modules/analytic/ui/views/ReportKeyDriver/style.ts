import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const ScrollKeyDriverStyle = StyleSheet.create({
  active: {
    borderBottomWidth: DimentionUtils.scale(2),
    borderBottomColor: Colors.Blue,
  },
  text: {color: Colors.Text},
  textActive: {
    color: Colors.Blue,
  },
  button: {
    paddingVertical: DimentionUtils.scale(10),
    minWidth: DimentionUtils.scale(200),
    height: DimentionUtils.scale(80),
    backgroundColor: Colors.Background3,
    marginHorizontal: DimentionUtils.scale(4),
    borderRadius: DimentionUtils.scale(8),
    padding: DimentionUtils.scale(16),
  },
  subText: {
    flexDirection: 'row',
    paddingTop: DimentionUtils.scale(8),
    justifyContent: 'space-between',
    flex: 1,
  },
  rate: {
    color: Colors.Blue,
    flex: 1,
  },
  growthRate: {
    color: Colors.Success700,
  },
  downRate: {
    color: Colors.Warning700,
  },
  tag: {
    flexDirection: 'row',
    paddingHorizontal: DimentionUtils.scale(8),
    borderRadius: DimentionUtils.scale(16),
    alignContent: 'center',
    alignItems: 'center',
    iconTag: {
      marginRight: DimentionUtils.scale(6),
    },
    tagUp: {
      backgroundColor: Colors.Success50,
    },
    tagDown: {
      backgroundColor: Colors.Error50,
    },
    red: {
      color: Colors.Error700,
    },
  },
});
export {ScrollKeyDriverStyle};
