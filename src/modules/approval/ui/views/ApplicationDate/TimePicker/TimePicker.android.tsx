import React from 'react';
import {View} from 'react-native';
import DatePickerStyle from './style';
import DatePickerProps from './TimePickerProps';
import {DatePicker as WheelDatePicker} from 'react-native-wheel-pick';
import {normalizeText} from 'utils/DimensionsUtils';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const DatePicker: React.FC<DatePickerProps> = ({date, onValueChange}) => {
  return (
    <View style={DatePickerStyle.container}>
      <WheelDatePicker
        textColor={Colors.Gray900}
        textSize={normalizeText(20)}
        style={DatePickerStyle.picker}
        date={date}
        order="D-M-Y"
        mode="time"
        labelUnit={{
          month: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
          ],
          date: '',
          year: '',
        }}
        minimumDate={new Date('1900-01-01')}
        maximumDate={new Date('3000-01-01')}
        onDateChange={onValueChange}
      />
    </View>
  );
};

export default DatePicker;
