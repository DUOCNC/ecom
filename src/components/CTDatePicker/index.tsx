import {ic_close, ic_rp_calendar} from 'assets/images';
import CTTypography from 'components/CTTypography';
import React, {createRef, useEffect, useMemo, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import CTDatePickerStyle from './style';
import RBSheet from 'react-native-raw-bottom-sheet';
import MonthPicker from './MonthPicker';
import CTRbSheet from 'components/CTRbSheet';
import {CTButton, CTButtonIcon} from 'components/Button';
import DatePicker from './DatePicker';
import DateUtils from 'common/utils/DateUtilts';
import {DateFormatPattern} from 'common/enums';
import {normalize} from 'utils/DimensionsUtils';
import {Typography} from 'common-ui';

interface CTDatePickerProps {
  type: 'month' | 'year' | 'date';
  value: Date;
  onValueChange: (date: Date) => void;
  headerText?: string;
}

const CTDatePicker: React.FC<CTDatePickerProps> = (
  props: CTDatePickerProps,
) => {
  const pickerRef = createRef<RBSheet>();
  let {value, onValueChange, type, headerText} = props;
  const title = useMemo(() => {
    if (type === 'month') {
      return DateUtils.format(value, DateFormatPattern.MMYYYY);
    }
    if (type === 'date') {
      return DateUtils.format(value, DateFormatPattern.DDMMYYYY);
    }
    return '';
  }, [type, value]);
  const header = useMemo(() => {
    if (headerText) {
      return headerText;
    }
    if (type === 'month') {
      return 'Chọn tháng';
    }
    if (type === 'date') {
      return 'Chọn thời gian';
    }
    return '';
  }, [type, headerText]);
  const onPick = () => {
    pickerRef.current?.close();
    onValueChange(dateValue);
  };
  const onClose = () => pickerRef.current?.close();
  const [dateValue, setDateValue] = useState<Date>(value);
  useEffect(() => {
    setDateValue(value);
  }, [value]);
  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => pickerRef.current?.open()}>
        <View style={CTDatePickerStyle.buttonContainer}>
          <CTTypography.Text style={CTDatePickerStyle.txtValue} text={title} />
          <Image source={ic_rp_calendar} />
        </View>
      </TouchableOpacity>
      <CTRbSheet height={normalize(322)} ref={pickerRef}>
        <View>
          <View style={CTDatePickerStyle.toolbar}>
            <CTButtonIcon
              onPress={onClose}
              style={CTDatePickerStyle.icClose}
              icon={ic_close}
              iconStyle={CTDatePickerStyle.iconClose}
            />
            <Typography textType="medium" type="h3" text={header} />
          </View>
          {type === 'date' && (
            <DatePicker date={dateValue} onValueChange={d => setDateValue(d)} />
          )}
          {type === 'month' && (
            <MonthPicker
              monthValue={dateValue.getMonth() + 1}
              yearValue={dateValue.getFullYear()}
              onValueChange={(month, year) => {
                let date = new Date();
                date.setDate(28);
                date.setMonth(month - 1);
                date.setFullYear(year);
                setDateValue(date);
              }}
            />
          )}

          <CTButton
            onPress={onPick}
            style={CTDatePickerStyle.btnDone}
            text="Chọn xong"
          />
        </View>
      </CTRbSheet>
    </React.Fragment>
  );
};

export default CTDatePicker;
