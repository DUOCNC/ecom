import {normalize} from 'utils/DimensionsUtils';
import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';

const CTButtonTextIconStyle = StyleSheet.create({
  viewButton: {
    marginBottom: normalize(16),
    height: normalize(48),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: normalize(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  btnIcon: {
    width: normalize(24),
    height: normalize(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalize(12),
    marginRight: normalize(8),
  },
  btnText: {
    opacity: 1,
    flex: 1,
  },
  icTail: {
    marginRight: normalize(20),
  },
});

export {CTButtonTextIconStyle};
