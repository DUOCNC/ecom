import React, {ReactNode} from 'react';
import {View} from 'react-native';
import style from './style';

interface BodyProps {
  children?: ReactNode;
}

const Body: React.FC<BodyProps> = (props: BodyProps) => {
  return <View style={[style.container]}>{props.children}</View>;
};

export default Body;
