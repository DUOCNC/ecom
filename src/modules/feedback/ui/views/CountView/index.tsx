import {ic_minus, ic_plus_primary} from 'assets/images';
import {Keyboard, KeyboardRef, Typography} from 'common-ui';
import React, {createRef} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CountStyle from './style';
import NumberUtils from 'utils/NumberUtils';
import {TypographyType} from 'common-ui/types';

interface Props {
  count: number;
  onPlus: (newCount: number) => void;
  onMinus: (newCount: number) => void;
  onPreviousOpenKeyBoard?: () => void;
  onKeyboardPress: (count: number) => void;
  title: string;
  type?: TypographyType | undefined;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<ViewStyle>;
  numberMax?: number;
}

const CountView: React.FC<Props> = ({
  count,
  onPlus,
  onMinus,
  title,
  onKeyboardPress,
  type = 'h2',
  style,
  styleText,
  numberMax,
}) => {
  const keyboardRef = createRef<KeyboardRef>();
  const onMinusPress = () => {
    onMinus(count - 1);
  };
  const onPlusPress = () => {
    onPlus(count + 1);
  };

  const onConfirmValue = (state: number) => {
    keyboardRef.current?.close();
    setTimeout(() => onKeyboardPress(state), 500);
  };
  const countValue = NumberUtils.formatNumber(count);
  const disableMinus = count === 0;
  const disableMax = count === (numberMax ? numberMax : 99999);
  return (
    <React.Fragment>
      <View style={CountStyle.container}>
        <TouchableOpacity
          disabled={disableMinus}
          onPress={onMinusPress}
          style={[CountStyle.btn, style]}>
          <Image
            style={[CountStyle.icBtn, disableMinus && CountStyle.iconDisable]}
            source={ic_minus}
          />
        </TouchableOpacity>
        <View style={[CountStyle.count, styleText]}>
          <Typography textType="medium" type={type} text={countValue} />
        </View>
        <TouchableOpacity
          disabled={disableMax}
          onPress={onPlusPress}
          style={[CountStyle.btn, style]}>
          <Image
            style={[CountStyle.icBtn, disableMax && CountStyle.iconDisable]}
            source={ic_plus_primary}
          />
        </TouchableOpacity>
      </View>
      <Keyboard
        onConfirm={onConfirmValue}
        title={title}
        initValue={count}
        ref={keyboardRef}
        max={5}
      />
    </React.Fragment>
  );
};

export default CountView;
