/*
 * Create By: Ánh Nguyễn
 * Version: 1.0.0
 * Module: Base Component
 */
import React, {
  createRef,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import moment from 'moment';
import {Font} from 'components/Base/Text';
import {
  Animated,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import CTText from 'components/Base/CTText';
import {CTCalendarStyle} from './style';
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';
import {ic_close, ic_rp_calendar} from 'assets/images';
import RBSheet from 'react-native-raw-bottom-sheet';
import CTTypography from 'components/CTTypography';
import {CTInputStyle} from '../CTFormInput/style';
import CTDatePickerStyle from 'components/CTDatePicker/style';
import {CTButton, CTButtonIcon} from 'components/Button';
import {Typography} from 'common-ui';
import DatePicker from 'components/CTDatePicker/DatePicker';
import MonthPicker from 'components/CTDatePicker/MonthPicker';
import CTRbSheet from 'components/CTRbSheet';

export interface CTInputProps extends TouchableWithoutFeedbackProps {
  title?: string;
  placeholder?: string;
  error?: string;
  isPassword?: boolean;
  defaultValue?: string;
  value: Date | null;
  disabled?: boolean;
  onChangeValue: (value: string) => void;
  type: string;
  headerText?: string;
}

const CTFormInput: FC<CTInputProps> = (props: CTInputProps) => {
  const {
    disabled,
    title,
    error,
    value,
    placeholder,
    onChangeValue,
    type,
    headerText,
  } = props;
  const [dateValue, setDateValue] = useState<Date>(
    value?.toJSON() ? value : new Date(),
  );
  const [focusable, setFocusable] = useState<boolean>(false);
  const moveText = useRef(new Animated.Value(0)).current;
  const moveTextTop = useCallback(() => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [moveText]);
  const pickerRef = createRef<RBSheet>();
  const onCloseCalendarBottomSheet = () => {
    setFocusable(false);
  };
  const onClose = () => {
    pickerRef.current?.close();
  };
  const onPick = () => {
    pickerRef.current?.close();
    onChangeValue(dateValue.toJSON());
  };
  const moveTextBottom = useCallback(() => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [moveText]);
  const borderColor = useMemo(() => {
    if (error !== undefined && error !== null && error !== '') {
      return Colors.Error;
    }
    return focusable ? Colors.Blue : Colors.Border;
  }, [error, focusable]);
  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -normalize(14)],
  });
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
  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  const onPressSelect = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      pickerRef.current?.open();
      setFocusable(true);
    }, 100);
  };

  const valueDisplay = useMemo(() => {
    if (!value || !value.toJSON()) {
      return placeholder || '';
    }
    return moment(value).format('DD/MM/YYYY');
  }, [placeholder, value]);

  useEffect(() => {
    if (!focusable) {
      if (valueDisplay !== '') {
        moveTextTop();
        return;
      }
      moveTextBottom();
    }
  }, [focusable, moveTextBottom, moveTextTop, valueDisplay]);
  return (
    <View style={CTCalendarStyle.container}>
      <TouchableWithoutFeedback disabled={disabled} onPress={onPressSelect}>
        <View
          style={[
            CTCalendarStyle.body,
            {borderColor: borderColor},
            disabled && CTCalendarStyle.disable,
          ]}>
          <Animated.View style={[CTCalendarStyle.animatedStyle, animStyle]}>
            {(focusable || valueDisplay !== '') && (
              <CTText
                style={CTCalendarStyle.title}
                font={Font.Regular}
                fontSize={11}
                text={title}
              />
            )}
          </Animated.View>
          <View style={CTCalendarStyle.input}>
            <CTText
              style={[
                CTCalendarStyle.inputDisplay,
                valueDisplay === placeholder && CTCalendarStyle.placeholder,
              ]}
              font={Font.Regular}
              fontSize={15}
              text={valueDisplay}
            />
          </View>
          <View style={CTCalendarStyle.btnPassword}>
            <Image source={ic_rp_calendar} />
          </View>
          {error && error.length > 0 && (
            <View style={CTInputStyle.viewError}>
              <CTTypography.Text
                style={CTInputStyle.error}
                text={error}
                level="2"
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <CTRbSheet
        onClose={onCloseCalendarBottomSheet}
        height={normalize(322)}
        ref={pickerRef}>
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
    </View>
  );
};

export default CTFormInput;
