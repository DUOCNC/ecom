import React, {ReactNode} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from './style';

interface CTHeaderProps {
  children?: ReactNode;
  disableHideKeyboardOnPress?: boolean;
}

const Container: React.FC<CTHeaderProps> = (props: CTHeaderProps) => {
  return (
    <React.Fragment>
      <View style={style.context}>
        <TouchableWithoutFeedback
          disabled={
            props.disableHideKeyboardOnPress
              ? props.disableHideKeyboardOnPress
              : true
          }
          onPress={Keyboard.dismiss}>
          <View style={[style.container]}>{props.children}</View>
        </TouchableWithoutFeedback>
      </View>
      <SafeAreaView edges={['bottom']} style={style.bottom} />
    </React.Fragment>
  );
};

export default Container;
