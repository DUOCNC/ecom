import {ContainerProps} from 'common-ui/types';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ContainerStyle from './style';

const SafeAreaContainer: React.FC<ContainerProps> = ({
  children,
  style,
  edges,
  backgroundColor,
}) => {
  return (
    <SafeAreaView
      edges={edges}
      style={[
        {
          backgroundColor: backgroundColor,
        },
        ContainerStyle.default,
        style,
      ]}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaContainer;
