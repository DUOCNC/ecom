import {ic_minus, ic_plus_primary} from 'assets/images';
import {Keyboard, KeyboardRef, Typography} from 'common-ui';
import React, {createRef, useMemo} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import CountStyle from './style';
import NumberUtils from 'utils/NumberUtils';
import {OrderLineEntity} from 'modules/order/models';

interface Props {
  count: number;
  onPlus: (newCount: number) => void;
  onMinus: (newCount: number) => void;
  onPreviousOpenKeyBoard?: () => void;
  onKeyboardPress: (count: number) => void;
  title: string;
  disabled?: boolean;
}

const CountView: React.FC<Props> = ({
  count,
  onPlus,
  onMinus,
  title,
  onKeyboardPress,
  onPreviousOpenKeyBoard,
  disabled,
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
  const disableMinus = useMemo(() => {
    if (disabled) {
      return true;
    }
    if (count === 0) {
      return true;
    }
    return false;
  }, [count, disabled]);

  const disableMax = useMemo(() => {
    if (disabled) {
      return true;
    }
    if (count === OrderLineEntity.max) {
      return true;
    }
    return false;
  }, [count, disabled]);
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
        <TouchableOpacity
          onPress={onOpenKeyBoard}
          style={CountStyle.count}
          disabled={disabled}>
          <Typography
            disabled={disabled}
            type="h3"
            text={NumberUtils.formatNumber(count)}
            fontWeight="400"
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disableMax}
          onPress={onPlusPress}
          style={[CountStyle.btn]}>
          <Image
            style={[
              CountStyle.icBtn,
              CountStyle.icPlus,
              disableMax && CountStyle.iconDisable,
            ]}
            source={ic_plus_primary}
          />
        </TouchableOpacity>
      </View>
      <Keyboard
        onConfirm={onConfirmValue}
        title={title}
        initValue={count}
        ref={keyboardRef}
        max={4}
      />
    </React.Fragment>
  );
};

export default CountView;
