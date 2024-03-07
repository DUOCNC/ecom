import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const Styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(12),
  },
  icon: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(16),
  },
  icon1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(16),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    color: Colors.Text,
    flex: 1,
    textAlign: 'left',
  },
  right: {
    flexDirection: 'row',
  },
  rightText: {
    color: Colors.Blue,
  },
  item: {
    marginVertical: normalize(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sub: {},
  subItem: {
    marginTop: normalize(-4),
    paddingLeft: normalize(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(4),
    paddingRight: normalize(34),
  },
  subItemText: {
    color: Colors.Gray500,
  },
  iconText: {
    color: Colors.White,
  },
  iconText1: {
    color: Colors.Gray500,
  },
  line: {
    borderTopColor: '#E8EAEB',
    borderTopWidth: normalize(1),
    marginLeft: normalize(48),
  },
  empty: {
    paddingTop: '10%',
  },
  text: {
    color: Colors.Gray900,
  },
  subText: {
    paddingTop: normalize(2),
    color: Colors.Gray500,
  },
  transformArrow: {
    transform: [{rotate: '180deg'}],
    paddingTop: normalize(0),
  },
  iconArrowSku: {
    width: normalize(24),
    height: normalize(24),
    marginLeft: normalize(10),
  },
  iconTop: {width: normalize(30), height: normalize(30)},
});

export {Styles};
