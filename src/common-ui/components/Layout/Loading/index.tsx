import {LoadingProps} from 'common-ui/types';
import React, {useMemo} from 'react';
import {View, ActivityIndicator} from 'react-native';
import style from './style';

const Loading: React.FC<LoadingProps> = ({
  loading,
  children,
  size = 'large',
  position = 'center',
}) => {
  const stylePosition = useMemo(() => {
    return position === 'center' ? style.center : style.top;
  }, [position]);
  return (
    <View style={style.container}>
      {loading === true ? (
        <View style={stylePosition}>
          <ActivityIndicator size={size} />
        </View>
      ) : (
        children
      )}
    </View>
  );
};

export default Loading;
