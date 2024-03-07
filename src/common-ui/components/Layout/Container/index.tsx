import {ContainerProps} from 'common-ui/types';
import React from 'react';
import {View} from 'react-native';
import ContainerStyle from './style';

const Container: React.FC<ContainerProps> = ({
  children,
  style,
  backgroundColor,
  alignContent,
  alignSelf,
  alignItems,
  justifyContent,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor,
          alignContent: alignContent,
          alignSelf: alignSelf,
          alignItems: alignItems,
          justifyContent: justifyContent,
        },
        ContainerStyle.default,
        style,
      ]}>
      {children}
    </View>
  );
};

export default Container;
