import {ic_pegasus_bot_mess} from 'assets/images';
import {ReactNode} from 'react';
import {Image, View} from 'react-native';
import {Style} from './style';
import React from 'react';

interface Props {
  type: 'bot' | 'answer' | 'custom';
  component: ReactNode;
}
const MessageItemView: React.FC<Props> = (props: Props) => {
  const {component, type} = props;
  if (type === 'bot') {
    return (
      <View style={[Style.container]}>
        <Image source={ic_pegasus_bot_mess} style={Style.icon} />
        <View style={[Style.message, Style.bot]}>{component}</View>
      </View>
    );
  }
  if (type === 'custom') {
    return <View>{component}</View>;
  }
  return (
    <View style={[Style.container, Style.answer]}>
      <View style={[Style.message, Style.answerContent]}>{component}</View>
    </View>
  );
};

export default MessageItemView;
