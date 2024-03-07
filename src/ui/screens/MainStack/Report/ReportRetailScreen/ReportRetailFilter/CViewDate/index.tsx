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
import {BaseText} from 'components/Base/Text';
import {Animated, Image, TouchableOpacity, View} from 'react-native';
import {CTCalendarStyle} from './style';
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';
import {ic_rp_calendar} from 'assets/images';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Calendar, DateData} from 'react-native-calendars';
import CTTypography from 'components/CTTypography';

export interface CTInputProps extends BaseText {
  title?: string;
  placeholder?: string;
  error?: string;
  isPassword?: boolean;
  defaultValue?: string;
  value?: Date | null;
  disabled?: boolean;
  onChangeValue: (value: Date) => void;
}
const CViewDate: FC<CTInputProps> = (props: CTInputProps) => {
  const {disabled, title, error, value, placeholder, onChangeValue} = props;
  const [focusable, setFocusable] = useState<boolean>(false);
  const rbRef = createRef<RBSheet>();
  const moveText = useRef(new Animated.Value(0)).current;
  const moveTextTop = useCallback(() => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [moveText]);

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

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  const onPressSelect = () => {
    setFocusable(true);
    rbRef.current?.open();
  };

  const onCloseSelect = () => {
    setFocusable(false);
  };

  const onSelect = (dataSelect: DateData | undefined) => {
    if (dataSelect) {
      onChangeValue(new Date(dataSelect.timestamp));
      rbRef.current?.close();
    }
  };

  const currentDate = useMemo(() => {
    const current = value === null ? new Date() : value;
    return moment(current).format('YYYY-MM-DD');
  }, [value]);

  const valueDisplay = useMemo(() => {
    if (value == null) {
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
      <TouchableOpacity
        disabled={disabled}
        onPress={onPressSelect}
        style={[
          CTCalendarStyle.body,
          {borderColor: borderColor},
          disabled && CTCalendarStyle.disable,
        ]}>
        <Animated.View style={[CTCalendarStyle.animatedStyle, animStyle]}>
          {(focusable || valueDisplay !== '') && (
            <CTTypography.Text
              text={title}
              level="3"
              style={CTCalendarStyle.title}
            />
          )}
        </Animated.View>
        <View style={CTCalendarStyle.input}>
          <CTTypography.Text
            style={[
              CTCalendarStyle.inputDisplay,
              valueDisplay === placeholder && CTCalendarStyle.placeholder,
            ]}
            text={valueDisplay}
            level="2"
          />
        </View>
        <View style={CTCalendarStyle.btnIcon}>
          <Image source={ic_rp_calendar} />
        </View>
      </TouchableOpacity>
      <RBSheet
        height={normalize(384)}
        closeOnDragDown={true}
        dragFromTopOnly
        onClose={onCloseSelect}
        customStyles={{
          container: CTCalendarStyle.containerSelect,
          draggableIcon: CTCalendarStyle.draggableIcon,
        }}
        ref={rbRef}>
        <View>
          <Calendar
            initialDate={currentDate}
            markedDates={{
              [currentDate]: {
                selected: true,
                marked: true,
                selectedColor: Colors.Primary,
              },
            }}
            theme={{
              backgroundColor: Colors.Transparent,
            }}
            onDayPress={date => {
              onSelect(date);
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default CViewDate;
