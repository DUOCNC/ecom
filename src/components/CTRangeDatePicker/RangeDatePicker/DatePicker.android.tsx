import React from 'react';
import {View} from 'react-native';
import DatePickerStyle from './style';
import RangeDatePickerProps from './DatePickerProps';
import {DatePicker as WheelDatePicker} from 'react-native-wheel-pick';
import {normalizeText} from 'utils/DimensionsUtils';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const DatePicker: React.FC<RangeDatePickerProps> = ({
  date,
  onValueChange,
  minimumDate,
  maximumDate,
}) => {
  return (
    <View style={DatePickerStyle.container}>
      <WheelDatePicker
        textColor={Colors.Gray900}
        textSize={normalizeText(20)}
        style={DatePickerStyle.picker}
        date={date}
        order="D-M-Y"
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
        minimumDate={minimumDate ? minimumDate : new Date('2023-07-13')}
        maximumDate={maximumDate ? maximumDate : new Date()}
        onDateChange={onValueChange}
      />
    </View>
  );
};

export default DatePicker;
