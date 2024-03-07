import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const DatePickerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: normalize(32),
    height: normalize(220),
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: normalize(5),
  },
  txtValue: {
    fontSize: normalize(12),
    color: '#101828',
  },
  picker: {
    backgroundColor: Colors.White,
    width: '100%',
    height: '100%',
  },
  itemPicker: {},
});

export default DatePickerStyle;
