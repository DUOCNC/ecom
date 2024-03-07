import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {Picker} from 'react-native-wheel-pick';
import StringUtils from 'common/utils/StringUtils';
import MonthPickerStyle from './style';
import MonthPickerProps from './MonthPickerProps';
import {normalizeText} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';

const monthData = Array.from(Array(12), (v, k) => k + 1);
const yearData = Array.from(Array(1100), (v, k) => 1100 - k + 1900);

const MonthPickerAndroid: React.FC<MonthPickerProps> = ({
  monthValue,
  yearValue,
  onValueChange,
}) => {
  const [month, setMonth] = useState<number>(monthValue);
  const [year, setYear] = useState<number>(yearValue);
  const monthSources = useMemo(
    () =>
      monthData.map(value => ({
        value: value,
        label: StringUtils.format('Tháng {0}', value),
      })),
    [],
  );
  const yearSources = useMemo(
    () =>
      yearData.map(value => ({
        value: value,
        label: StringUtils.format('{0}', value),
      })),
    [],
  );
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
          style={MonthPickerStyle.picker}
          selectedValue={month}
          itemStyle={MonthPickerStyle.itemPicker}
          pickerData={monthSources}
          textColor={Colors.Gray900}
          textSize={normalizeText(20)}
          onValueChange={itemValue => {
            onValueChange(itemValue, year);
          }}
        />
      </View>
      <View style={MonthPickerStyle.pickerContainer}>
        <Picker
          style={MonthPickerStyle.picker}
          selectedValue={year}
          pickerData={yearSources}
          itemStyle={MonthPickerStyle.itemPicker}
          textSize={normalizeText(20)}
          onValueChange={itemValue => onValueChange(month, itemValue)}
        />
      </View>
    </View>
  );
};

export default MonthPickerAndroid;
