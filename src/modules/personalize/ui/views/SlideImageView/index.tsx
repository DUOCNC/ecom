import {ic_placeholder_150182} from 'assets/images';
import {
  DimentionUtils,
  ImageContainerViewer,
  ImageContainerViewerRef,
} from 'common-ui';
import React, {createRef, useEffect, useMemo, useState} from 'react';
import {Dimensions, ImageRequireSource, View} from 'react-native';
import {Source} from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import BannerView from '../BannerView';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';

interface Props {
  imageUrls: Array<string>;
  newsIds: Array<number | null>;
}

const DefaultWidth = Dimensions.get('screen').width - 20;
const DefaultHeight = DimentionUtils.scale(100);
const SlideImageView: React.FC<Props> = ({imageUrls, newsIds}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const viewerRef = createRef<ImageContainerViewerRef>();
  const [urls, setUrls] = useState<Array<Source | ImageRequireSource>>([
    ic_placeholder_150182,
  ]);
  const imageInfos = useMemo(
    () =>
      urls
        .filter(url => typeof url !== 'number')
        .map(url => {
          if (typeof url === 'number') {
            let imageInfo: IImageInfo = {
              url: '',
              props: {
                source: url,
              },
            };
            return imageInfo;
          }
          let imageInfo: IImageInfo = {
            url: url.uri ? url.uri : '',
          };
          return imageInfo;
        }),
    [urls],
  );

  const onItemPress = (position: number) => {
    const newsId = newsIds[position];
    if (newsId && newsId !== null) {
      navigation.navigate(MainRouteConfig.NewsDetail, {
        id: newsId,
      });
      return;
    }
    viewerRef.current?.show(imageInfos, position);
  };
  useEffect(() => {
    const res = imageUrls
      .filter(url => url !== '')
      .map(url => ({uri: url} as Source | ImageRequireSource));
    if (res.length === 0) {
      return;
    }
    setUrls(res);
  }, [imageUrls]);
  return (
    <React.Fragment>
      <View style={{width: DefaultWidth}}>
        <Carousel
          width={DefaultWidth}
          loop={urls.length > 1}
          autoPlayInterval={2000}
          autoPlay
          height={DefaultHeight}
          renderItem={({item, index}) => (
            <BannerView
              key={index}
              bannerUrl={item}
              onPress={() => {
                onItemPress(index);
              }}
            />
          )}
          data={urls}
        />
      </View>
      <ImageContainerViewer ref={viewerRef} />
    </React.Fragment>
  );
};

export default SlideImageView;
