import React from 'react';
import {View} from 'react-native';
import DatePickerStyle from './style';
import DatePickerProps from './DatePickerProps';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onValueChange,
  minimumDate,
  maximumDate,
}) => {
  return (
    <View style={DatePickerStyle.container}>
      <DateTimePicker
        locale="vi-Vi"
        display="spinner"
        value={date}
        mode="date"
        themeVariant="light"
        minimumDate={minimumDate ? minimumDate : new Date('2023-07-13')}
        maximumDate={maximumDate ? maximumDate : new Date()}
        onChange={(event, d) => onValueChange(d ? d : date)}
      />
    </View>
  );
};

export default DatePicker;
