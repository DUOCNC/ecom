import {Colors} from 'assets/colors';
import {Text} from '../../core';
import React from 'react';
import {Image, ImageSourcePropType, TouchableHighlight} from 'react-native';
import CTKeyboardStyle from './style';
import {colors} from 'assets/v2';

type Props = {
  keyboard: string | ImageSourcePropType;
  value: string;
  onPress: (value: string) => void;
};

const Numpad: React.FC<Props> = ({keyboard, onPress, value}) => {
  return (
    <TouchableHighlight
      underlayColor={Colors.Gray200}
      onPress={() => onPress(value)}
      style={[CTKeyboardStyle.btnKeyboard]}>
      {typeof keyboard === 'string' ? (
        <Text
          style={CTKeyboardStyle.txtNumPad}
          size={20}
          color={colors.secondary.o500}
          text={keyboard}
        />
      ) : (
        <Image source={keyboard} />
      )}
    </TouchableHighlight>
  );
};

export default Numpad;
