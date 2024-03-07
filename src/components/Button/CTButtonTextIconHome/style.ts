import {normalize} from 'utils/DimensionsUtils';
import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';

export const CTButtonTextIconHomeStyle = StyleSheet.create({
  viewButton: {
    position: 'absolute',
    right: 0,
    top: 4,
    zIndex: 99999,
    flex: 1,
    // marginBottom: normalize(16),
    width: 94,
    // height: normalize(48),
    padding: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Blue,
    borderRadius: normalize(8),
  },
  btnIcon: {
    width: normalize(24),
    height: normalize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    textAlignVertical: 'center',
    color: Colors.White,
    opacity: 1,
    // flex: 1,
  },
  icTail: {
    marginLeft: normalize(9),
  },
});
