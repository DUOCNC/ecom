import MonthPickerIos from './MonthPicker.ios';
import MonthPickerAndroid from './MonthPicker.android';
import {Platform} from 'react-native';

export default Platform.OS === 'ios' ? MonthPickerIos : MonthPickerAndroid;
