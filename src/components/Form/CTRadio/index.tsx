import React from 'react';
import {View} from 'react-native';
import {style} from './stlye';

interface CTRadioProps {
  selected: boolean;
}

const CTRadio: React.FC<CTRadioProps> = (props: CTRadioProps) => {
  return (
    <View style={[style.container, props.selected && style.ctSelected]}>
      {props.selected && <View style={style.selected} />}
    </View>
  );
};

export default CTRadio;
