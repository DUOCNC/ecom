import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';
import {ic_arrow} from 'assets/images';
import CTTypography from 'components/CTTypography';
import {CTInputStyle} from '../CTFormInput/style';
import style from './style';
import {DistrictEntity} from 'model';
import GenderEntity from 'model/entities/GenderEntity';
import AssigneeEntity from 'model/entities/AssigneeEntity';
import WardEntity from 'model/entities/WardEntity';

export interface DataSelectCreateCustomer {
  itemClick: DistrictEntity;
  itemGender: GenderEntity;
  itemAssignee: AssigneeEntity;
  itemWard: WardEntity;
  barcode: {
    type: string;
    value: string;
  };
}

export interface CTInputProps extends TouchableWithoutFeedbackProps {
  title?: string;
  placeholder?: string;
  error?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  onChangeValue?: (value: Date) => void;
  type?: string;
  headerText?: string;
  onPress?: () => void;
}

const CTFormInput: FC<CTInputProps> = (props: CTInputProps) => {
  const {disabled, title, error, value, placeholder, onPress} = props;
  const [focusable, setFocusable] = useState<boolean>(false);
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
    Keyboard.dismiss();
    setFocusable(true);
    onPress();
  };

  const valueDisplay = useMemo(() => {
    if (!value) {
      return placeholder || '';
    }
    return value;
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
    <View style={style.container}>
      <TouchableWithoutFeedback disabled={disabled} onPress={onPressSelect}>
        <View
          style={[
            style.body,
            {borderColor: Colors.Border},
            disabled && style.disable,
          ]}>
          <Animated.View style={[style.animatedStyle, animStyle]}>
            {value !== '' && (
              <CTText
                style={style.title}
                font={Font.Regular}
                fontSize={11}
                text={title}
              />
            )}
          </Animated.View>
          <View style={style.input}>
            <CTText
              numberOfLines={1}
              style={[
                style.inputDisplay,
                valueDisplay === placeholder && style.placeholder,
              ]}
              font={Font.Regular}
              fontSize={15}
              text={valueDisplay}
            />
          </View>
          <View style={style.btnPassword}>
            <Image source={ic_arrow} />
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
    </View>
  );
};

export default CTFormInput;
