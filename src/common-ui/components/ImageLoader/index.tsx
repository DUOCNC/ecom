import {ImageLoaderProps} from 'common-ui/types';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import DefaultStyle from './style';

const ImageLoader: React.FC<ImageLoaderProps> = ({
  source,
  style,
  placeholder,
  ...rest
}) => {
  const [isLoad, setLoad] = useState<boolean>(true);
  const getSource = useMemo(() => {
    if (typeof source === 'number') {
      return source;
    }
    if (source === undefined) {
      return placeholder;
    }
    return source.uri === undefined || source.uri === null || source.uri === ''
      ? placeholder
      : source;
  }, [placeholder, source]);
  return (
    <View style={style}>
      <FastImage
        style={style}
        onLoad={() => {
          setLoad(true);
        }}
        onLoadEnd={() => {
          setLoad(false);
        }}
        source={getSource}
        {...rest}
      />
      {isLoad && (
        <FastImage
          source={placeholder}
          style={[DefaultStyle.placeholder, style]}
        />
      )}
    </View>
  );
};

export default ImageLoader;
