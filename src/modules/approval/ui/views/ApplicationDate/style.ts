import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {Platform, StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const CTDatePickerStyle = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: DimentionUtils.scale(8),
    paddingHorizontal: DimentionUtils.scale(10),
    borderColor: Colors.Gray300,
    height:
      Platform.OS === 'ios'
        ? DimentionUtils.scale(40)
        : DimentionUtils.scale(36),
  },
  txtValue: {
    marginRight: normalize(8),
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
