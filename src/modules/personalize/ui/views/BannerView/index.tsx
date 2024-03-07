import React from 'react';
import {
  Dimensions,
  ImageRequireSource,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './style';
import {ic_placeholder_6080} from 'assets/images';
import {DimentionUtils, ImageLoader} from 'common-ui';
import {Source} from 'react-native-fast-image';

interface Props {
  bannerUrl: Source | ImageRequireSource;
  onPress: () => void;
}
const WIDTH = Dimensions.get('screen').width - 32;
const HEIGHT = DimentionUtils.scale(100);
const BannerView: React.FC<Props> = ({bannerUrl, onPress}) => {
  return (
    <View style={style.banner}>
      <TouchableOpacity onPress={onPress}>
        <ImageLoader
          placeholder={ic_placeholder_6080}
          style={[
            {
              width: WIDTH,
              height: HEIGHT,
            },
            style.image,
          ]}
          source={bannerUrl}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BannerView;
