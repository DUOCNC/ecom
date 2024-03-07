import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const BestSalerStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  icon: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(8),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    color: Colors.Text,
    flex: 1,
    textAlign: 'left',
  },
  right: {
    minWidth: 90,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    textAlign: 'right',
    backgroundColor: 'red',
    position: 'relative',
  },
  rightText: {
    position: 'absolute',
    right: 0,
  },
  item: {
    paddingVertical: normalize(8),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    height: normalize(48),
    alignItems: 'center',
    textAlign: 'center',
  },
  sub: {},
  subItem: {
    paddingLeft: normalize(38),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(4),
  },
  subItemText: {
    color: Colors.SubText2,
  },
  iconText: {
    color: Colors.White,
  },
  line: {
    borderTopColor: '#E8EAEB',
    borderTopWidth: normalize(1),
    paddingHorizontal: normalize(16),
  },
  empty: {
    paddingTop: '10%',
  },
  text: {
    color: Colors.Text,
  },
  subText: {
    paddingTop: normalize(2),
    color: Colors.SubText2,
  },
});

export {BestSalerStyle};
