import {back} from 'assets/images';
import Typography from '../../Typography';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import ScreenHeader from '../ScreenHeader';
import style from './style';
import {ScreenHeaderBackProps} from 'common-ui/types';
import {useNavigation} from '@react-navigation/native';

const ScreenHeaderBack: React.FC<ScreenHeaderBackProps> = ({
  title,
  right,
  children,
  onBackPress,
  error,
}) => {
  const navigation = useNavigation();
  const onPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <ScreenHeader>
      <View style={style.container}>
        <View style={style.containerLeft}>
          <TouchableOpacity onPress={onPress} style={style.btnBack}>
            <Image source={back} />
          </TouchableOpacity>
        </View>
        <View style={style.containerCenter}>
          <Typography type="h3" textType="medium" text={title} />
        </View>
        <View style={style.containerRight}>{right}</View>
      </View>
      {!error && children}
    </ScreenHeader>
  );
};

export default ScreenHeaderBack;
