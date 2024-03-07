import {FirstLoadingView} from 'components/Base';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import style from './style';

interface LoadingViewProps {
  children?: ReactNode;
  firstLoading?: boolean;
  disableFirstLoading?: boolean;
  position?: 'top' | 'center';
}

const LoadingView: React.FC<LoadingViewProps> = (props: LoadingViewProps) => {
  return (
    <View style={[style.container]}>
      {props.firstLoading && !props.disableFirstLoading ? (
        <FirstLoadingView position={props.position} />
      ) : (
        props.children
      )}
    </View>
  );
};

export default LoadingView;
