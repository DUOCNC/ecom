import React from 'react';
import {DataIntro} from './data';
import {Image, View} from 'react-native';
import {PagerStyle} from './style';

interface IProps {
  data: DataIntro;
  index: number;
}

const PagerIntro: React.FC<IProps> = (props: IProps) => {
  const {data} = props;
  return (
    <View style={PagerStyle.container}>
      <Image resizeMode="contain" style={PagerStyle.img} source={data.image} />
    </View>
  );
};

export default PagerIntro;
