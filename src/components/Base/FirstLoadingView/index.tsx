import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import ViewFeatureStyle from './style';

interface FirstLoadingViewProps {
  position?: 'top' | 'center';
}

const FirstLoadingView: React.FC<FirstLoadingViewProps> = ({position}) => {
  return (
    <View
      style={[
        ViewFeatureStyle.container,
        position && position === 'center' && ViewFeatureStyle.center,
      ]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default FirstLoadingView;
