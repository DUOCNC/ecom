import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import StringUtils from 'common/utils/StringUtils';
import MonthPickerStyle from './style';
import MonthPickerProps from './MonthPickerProps';

const MonthPicker: React.FC<MonthPickerProps> = ({
  monthValue,
  yearValue,
  onValueChange,
}) => {
  const [month, setMonth] = useState<number>(monthValue);
  const [year, setYear] = useState<number>(yearValue);
  useEffect(() => {
    setMonth(monthValue);
  }, [monthValue]);
  useEffect(() => {
    setYear(yearValue);
  }, [yearValue]);
  return (
    <View style={MonthPickerStyle.container}>
      <View style={MonthPickerStyle.pickerContainer}>
        <Picker
          mode="dropdown"
          selectedValue={month}
          onValueChange={itemValue => onValueChange(itemValue, year)}>
          {Array.from(Array(12), (e, i) => (
            <Picker.Item
              fontFamily="Roboto-Regular"
              style={MonthPickerStyle.txtValue}
              key={StringUtils.format('month_{0}', i + 1)}
              label={StringUtils.format('Tháng {0}', i + 1)}
              value={i + 1}
              color="#101828"
            />
          ))}
        </Picker>
      </View>
      <View style={MonthPickerStyle.pickerContainer}>
        <Picker
          mode="dropdown"
          selectedValue={year}
          onValueChange={itemValue => onValueChange(monthValue, itemValue)}>
          {Array.from(Array(1100), (e, i) => (
            <Picker.Item
              fontFamily="Roboto-Regular"
              key={StringUtils.format('year_{0}', i + 1)}
              label={(1100 - i + 1900).toString()}
              value={1100 - i + 1900}
              color="#101828"
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default MonthPicker;
