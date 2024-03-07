import React, {createRef, useMemo} from 'react';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {TypographyType} from 'common-ui/types';
import {colors} from 'assets/v2';

interface Props {
  text: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textType: TypographyType;
  textWeight?: 'regular' | 'medium';
  type: 'primary' | 'success' | 'error' | 'plain';
}

const ButtonActionFeedback: React.FC<Props> = ({
  text,
  onPress,
  containerStyle,
  textType,
  textWeight,
  type,
}) => {
  const color = useMemo(() => {
    switch (type) {
      case 'plain':
        return {
          borderColor: colors.secondary.o300,
          textColor: colors.secondary.o900,
          backgroundColor: colors.secondary.o25,
        };
      case 'primary':
        return {
          borderColor: colors.primary.o500,
          textColor: colors.secondary.o25,
          backgroundColor: colors.primary.o500,
        };
      case 'success':
        return {
          borderColor: colors.success.o500,
          textColor: colors.secondary.o25,
          backgroundColor: colors.success.o500,
        };
      case 'error':
        return {
          borderColor: colors.error.o500,
          textColor: colors.secondary.o25,
          backgroundColor: colors.error.o500,
        };
      default:
        return {
          borderColor: colors.primary.o500,
          textColor: colors.secondary.o25,
          backgroundColor: colors.primary.o500,
        };
    }
  }, [type]);

  return (
    <TouchableOpacity
      style={[
        style.buttonActionContainer,
        containerStyle,
        {
          borderColor: color.borderColor,
          backgroundColor: color.backgroundColor,
        },
      ]}
      onPress={onPress}>
      <Typography
        textType={textWeight}
        type={textType}
        style={style.text}
        text={text}
        color={color.textColor}
      />
    </TouchableOpacity>
  );
};

export default ButtonActionFeedback;
