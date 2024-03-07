import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import CTImageStyle from './style';

interface CTImageProps extends FastImageProps {
  placeholder?: any;
}

const CTImage: React.FC<CTImageProps> = (props: CTImageProps) => {
  const {source, style, placeholder, ...rest} = props;
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
          style={[CTImageStyle.placeholder, style]}
        />
      )}
    </View>
  );
};

export default CTImage;
