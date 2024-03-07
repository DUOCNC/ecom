import TimePickerIos from './TimePicker.ios';
import TimePickerAndroid from './TimePicker.android';
import {Platform} from 'react-native';

export default Platform.OS === 'ios' ? TimePickerIos : TimePickerAndroid;
