import DatePickerIos from './DatePicker.ios';
import DatePickerAndroid from './DatePicker.android';
import {Platform} from 'react-native';

export default Platform.OS === 'ios' ? DatePickerIos : DatePickerAndroid;
