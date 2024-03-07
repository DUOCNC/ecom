import {ic_close, ic_rp_calendar} from 'assets/images';
import CTTypography from 'components/CTTypography';
import React, {createRef, useEffect, useMemo, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import CTRangeDatePickerStyle from './style';
import RBSheet from 'react-native-raw-bottom-sheet';
import MonthPicker from './MonthPicker';
import CTRbSheet from 'components/CTRbSheet';
import {CTButton, CTButtonIcon} from 'components/Button';
import DatePicker from './RangeDatePicker';
import DateUtils from 'common/utils/DateUtilts';
import {DateFormatPattern} from 'common/enums';
import {normalize} from 'utils/DimensionsUtils';
import {Typography} from 'common-ui';

interface CTRangeDatePickerProps {
  type: 'month' | 'year' | 'date';
  firstValue: Date;
  secondValue: Date;
  onFirstValueChange: (date: Date) => void;
  onSecondValueChange: (date: Date) => void;
  headerText?: string;
}

type Status = 'first' | 'second';

const CTDatePicker: React.FC<CTRangeDatePickerProps> = (
  props: CTRangeDatePickerProps,
) => {
  const pickerRef = createRef<RBSheet>();
  let {firstValue, secondValue, onFirstValueChange, onSecondValueChange, type} =
    props;

  const [firstDateValue, setFirstDateValue] = useState<Date>(firstValue);
  const [secondDateValue, setSecondDateValue] = useState<Date>(secondValue);
  const [status, setStatus] = useState<Status>('first');

  const firstTitle = useMemo(() => {
    if (type === 'month') {
      return DateUtils.format(firstValue, DateFormatPattern.MMYYYY);
    }
    if (type === 'date') {
      return DateUtils.format(firstValue, DateFormatPattern.DDMMYYYY);
    }
    return '';
  }, [type, firstValue]);

  const secondTitle = useMemo(() => {
    if (type === 'month') {
      return DateUtils.format(secondValue, DateFormatPattern.MMYYYY);
    }
    if (type === 'date') {
      return DateUtils.format(secondValue, DateFormatPattern.DDMMYYYY);
    }
    return '';
  }, [type, secondValue]);
  const header = useMemo(() => {
    if (status === 'first') {
      return 'Chọn ngày bắt đầu';
    }
    return 'Chọn ngày kết thúc';
  }, [status]);

  const onPick = () => {
    pickerRef.current?.close();
    if (status === 'first') {
      let copiedFirstDate = new Date(firstDateValue.getTime());
      onFirstValueChange(copiedFirstDate);
    } else {
      let copiedSecondDate = new Date(secondDateValue.getTime());
      if (firstDateValue.getTime() > secondDateValue.getTime()) {
        onFirstValueChange(copiedSecondDate);
      }
      onSecondValueChange(copiedSecondDate);
    }
  };

  const onClose = () => pickerRef.current?.close();

  useEffect(() => {
    setFirstDateValue(firstValue);
  }, [firstValue]);

  useEffect(() => {
    setSecondDateValue(secondValue);
  }, [secondValue]);

  const dateValue = useMemo(() => {
    if (status === 'first') {
      return firstDateValue;
    }
    return secondDateValue;
  }, [firstDateValue, secondDateValue, status]);

  const onPressFirstTitle = () => {
    pickerRef.current?.open();
    setStatus('first');
  };

  const onPressSecondTitle = () => {
    pickerRef.current?.open();
    setStatus('second');
  };

  const onValueDateChange = (date: Date) => {
    if (status === 'first') {
      setFirstDateValue(date);
    } else {
      setSecondDateValue(date);
    }
  };

  const onValueMonthChange = (month: number, year: number) => {
    let date = new Date();
    date.setDate(28);
    date.setMonth(month - 1);
    date.setFullYear(year);
    if (status === 'first') {
      setFirstDateValue(date);
    } else {
      setSecondDateValue(date);
    }
  };

  return (
    <React.Fragment>
      <View style={CTRangeDatePickerStyle.buttonContainer}>
        <TouchableOpacity onPress={onPressFirstTitle}>
          <CTTypography.Text text={firstTitle} />
        </TouchableOpacity>
        <Typography text=" - " />
        <TouchableOpacity onPress={onPressSecondTitle}>
          <CTTypography.Text text={secondTitle} />
        </TouchableOpacity>

        <Image
          source={ic_rp_calendar}
          style={CTRangeDatePickerStyle.iconCalendar}
        />
      </View>
      <CTRbSheet height={normalize(322)} ref={pickerRef}>
        <View>
          <View style={CTRangeDatePickerStyle.toolbar}>
            <CTButtonIcon
              onPress={onClose}
              style={CTRangeDatePickerStyle.icClose}
              icon={ic_close}
              iconStyle={CTRangeDatePickerStyle.iconClose}
            />
            <Typography textType="medium" type="h3" text={header} />
          </View>
          {type === 'date' && (
            <DatePicker
              maximumDate={status === 'first' ? secondDateValue : new Date()}
              date={dateValue}
              onValueChange={onValueDateChange}
            />
          )}
          {type === 'month' && (
            <MonthPicker
              monthValue={dateValue.getMonth() + 1}
              yearValue={dateValue.getFullYear()}
              onValueChange={onValueMonthChange}
            />
          )}

          <CTButton
            onPress={onPick}
            style={CTRangeDatePickerStyle.btnDone}
            text="Chọn xong"
          />
        </View>
      </CTRbSheet>
    </React.Fragment>
  );
};

export default CTDatePicker;
