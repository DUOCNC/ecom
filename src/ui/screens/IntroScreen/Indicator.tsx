import React, {FC} from 'react';
import {View} from 'react-native';
import {IndicatorStyle} from './style';

type IndicatorProps = {
  active: boolean;
};

const Indicator: FC<IndicatorProps> = (props: IndicatorProps) => {
  return (
    <View
      style={[IndicatorStyle.container, props.active && IndicatorStyle.active]}
    />
  );
};

export default Indicator;
