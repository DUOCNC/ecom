import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const CustomerItemStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    padding: normalize(16),
  },
  body: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(4),
  },
  txtLevel: {
    color: Colors.Secondary,
  },
  viewLevel: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(2),
    marginLeft: normalize(24),
    height: normalize(22),
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    borderRadius: normalize(30),
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
    borderWidth: normalize(1),
  },
  txtFullName: {
    color: Colors.Blue,
  },
  view: {
    marginHorizontal: normalize(8),
    width: normalize(2),
    backgroundColor: Colors.Border,
    height: '100%',
  },
  justify: {
    justifyContent: 'space-between',
  },
});

export {CustomerItemStyle};
