import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {LoadMoreProps} from 'common-ui/types';
import style from './style';

const LoadMore: React.FC<LoadMoreProps> = ({isLoadMore}) => {
  return (
    <View>
      {isLoadMore && (
        <View style={style.container}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default LoadMore;
