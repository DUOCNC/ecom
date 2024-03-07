import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const CTDatePickerStyle = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCalendar: {
    marginLeft: normalize(8),
  },
  btnDone: {
    marginHorizontal: normalize(16),
  },
  toolbar: {
    marginHorizontal: normalize(16),
    height: normalize(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icClose: {
    position: 'absolute',
    left: normalize(0),
  },
  iconClose: {
    width: normalize(13),
    height: normalize(13),
  },
});

export default CTDatePickerStyle;
