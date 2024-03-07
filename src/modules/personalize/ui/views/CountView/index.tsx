import {ic_minus, ic_plus_primary} from 'assets/images';
import {Keyboard, KeyboardRef, Typography} from 'common-ui';
import React, {createRef} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import CountStyle from './style';
import NumberUtils from 'utils/NumberUtils';

interface Props {
  count: number;
  onPlus: (newCount: number) => void;
  onMinus: (newCount: number) => void;
  onPreviousOpenKeyBoard?: () => void;
  onKeyboardPress: (count: number) => void;
  title: string;
}

const CountView: React.FC<Props> = ({
  count,
  onPlus,
  onMinus,
  title,
  onKeyboardPress,
  onPreviousOpenKeyBoard,
}) => {
  const keyboardRef = createRef<KeyboardRef>();
  const onMinusPress = () => {
    onMinus(count - 1);
  };
  const onPlusPress = () => {
    onPlus(count + 1);
  };
  const onOpenKeyBoard = () => {
    let next = onPreviousOpenKeyBoard ? onPreviousOpenKeyBoard() : true;
    if (!next) {
      return;
    }
    keyboardRef.current?.open();
  };
  const onConfirmValue = (state: number) => {
    keyboardRef.current?.close();
    setTimeout(() => onKeyboardPress(state), 500);
  };
  const countValue = NumberUtils.formatNumber(count);
  const disableMinus = count === 0;
  const disableMax = count === 99999;
  return (
    <React.Fragment>
      <View style={CountStyle.container}>
        <TouchableOpacity
          disabled={disableMinus}
          onPress={onMinusPress}
          style={[CountStyle.btn]}>
          <Image
            style={[CountStyle.icBtn, disableMinus && CountStyle.iconDisable]}
            source={ic_minus}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onOpenKeyBoard} style={CountStyle.count}>
          <Typography textType="medium" type="h2" text={countValue} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disableMax}
          onPress={onPlusPress}
          style={[CountStyle.btn]}>
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
