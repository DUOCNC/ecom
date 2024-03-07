import React from 'react';
import {TouchableOpacity, ImageRequireSource} from 'react-native';
import {ImageLoader} from 'common-ui';
import {ic_placeholder_150182} from 'assets/images';
import {Source} from 'react-native-fast-image';
import style from './style';

interface Props {
  url: Source | ImageRequireSource;
  position: number;
  disableViewer: boolean;
  onItemPress: (position: number) => void;
}

const VariantImageView: React.FC<Props> = ({
  url,
  position,
  onItemPress,
  disableViewer,
}) => {
  const onPress = () => {
    onItemPress(position);
  };
  return (
    <TouchableOpacity disabled={disableViewer} onPress={onPress}>
      <ImageLoader
        style={style.container}
        source={url}
        resizeMode="cover"
        placeholder={ic_placeholder_150182}
      />
    </TouchableOpacity>
  );
};

export default VariantImageView;
