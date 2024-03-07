import {ic_delete, ic_keyboard_delete} from 'assets/images';
import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import NumberUtils from 'utils/NumberUtils';
import Numpad from './Numpad';
import NumpadUtils from './NumpadUtils';
import CTKeyboardStyle from './style';

export interface KeyboardProps {
  initValue: number;
  title?: string;
  onConfirm?: (state: number) => void;
  max?: number;
}

export type KeyboardRef = {
  open: () => void;
  close: () => void;
};

export type KeyboardType = ForwardRefRenderFunction<KeyboardRef, KeyboardProps>;

const Keyboard: KeyboardType = ({initValue, title, onConfirm, max}, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [state, setState] = useState<number>(0);
  useImperativeHandle(ref, () => ({
    open: open,
    close: close,
  }));
  const open = () => {
    setVisible(true);
  };
  const close = () => {
    setTimeout(() => {
      setVisible(false);
    }, 100);
  };

  const onCancelPress = () => {
    close();
  };
  const display = NumberUtils.formatNumber(state);
  const onPressKeyboard = (value: string) => {
    let newState = NumpadUtils.press(state, value, max);
    setState(newState);
  };
  const onDeleteAll = () => setState(0);
  const titleDisplay = title ? title : 'Nhập số';
  const disabled = state === 0;
  const onConfirmPress = () => {
    onConfirm && onConfirm(state);
  };
  useEffect(() => {
    if (visible) {
      setState(initValue);
    }
  }, [initValue, visible]);
  return (
    <Modal
      useNativeDriverForBackdrop={true}
      animationIn="fadeIn"
      onBackButtonPress={onCancelPress}
      animationOut="fadeOut"
      isVisible={visible}>
      <View style={CTKeyboardStyle.container}>
        <View style={CTKeyboardStyle.header}>
          <CTTypography.Text font={Font.Medium} level="2" text={titleDisplay} />
        </View>
        <View style={CTKeyboardStyle.body}>
          <CTTypography.Header font={Font.Medium} level="3" text={display} />
          <TouchableOpacity
            onPress={onDeleteAll}
            disabled={disabled}
            style={CTKeyboardStyle.btnDeleteAll}>
            <Image
              style={disabled && CTKeyboardStyle.iconDisable}
              source={ic_delete}
            />
          </TouchableOpacity>
        </View>
        <View style={CTKeyboardStyle.keyboard}>
          <View style={CTKeyboardStyle.rowKeyboard}>
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="1"
                keyboard="1"
              />
            </View>
            <View style={CTKeyboardStyle.verticalLine} />
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="2"
                keyboard="2"
              />
            </View>
            <View style={CTKeyboardStyle.verticalLine} />
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="3"
                keyboard="3"
              />
            </View>
          </View>
          <View style={CTKeyboardStyle.hotizontalLine} />
          <View style={CTKeyboardStyle.rowKeyboard}>
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="4"
                keyboard="4"
              />
            </View>
            <View style={CTKeyboardStyle.verticalLine} />
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="5"
                keyboard="5"
              />
            </View>
            <View style={CTKeyboardStyle.verticalLine} />
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="6"
                keyboard="6"
              />
            </View>
          </View>
          <View style={CTKeyboardStyle.hotizontalLine} />
          <View style={CTKeyboardStyle.rowKeyboard}>
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="7"
                keyboard="7"
              />
            </View>
            <View style={CTKeyboardStyle.verticalLine} />
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="8"
                keyboard="8"
              />
            </View>
            <View style={CTKeyboardStyle.verticalLine} />
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="9"
                keyboard="9"
              />
            </View>
          </View>
          <View style={CTKeyboardStyle.hotizontalLine} />
          <View style={CTKeyboardStyle.rowKeyboard}>
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="000"
                keyboard="000"
              />
            </View>
            <View style={CTKeyboardStyle.verticalLine} />
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="0"
                keyboard="0"
              />
            </View>
            <View style={CTKeyboardStyle.verticalLine} />
            <View style={CTKeyboardStyle.viewNumPad}>
              <Numpad
                onPress={value => onPressKeyboard(value)}
                value="del"
                keyboard={ic_keyboard_delete}
              />
            </View>
          </View>
        </View>
        <View style={CTKeyboardStyle.bottom}>
          <TouchableOpacity
            onPress={onCancelPress}
            style={CTKeyboardStyle.btnConfirm}>
            <CTTypography.Text
              style={CTKeyboardStyle.txtConfirm}
              level="2"
              text="Hủy"
            />
          </TouchableOpacity>
          <View style={CTKeyboardStyle.bottomLine} />
          <TouchableOpacity
            onPress={onConfirmPress}
            style={CTKeyboardStyle.btnConfirm}>
            <CTTypography.Text
              style={CTKeyboardStyle.txtConfirm}
              level="2"
              text="Xác nhận"
              font={Font.Medium}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default forwardRef(Keyboard);
