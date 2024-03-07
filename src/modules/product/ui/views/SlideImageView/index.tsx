import {ic_placeholder_150182} from 'assets/images';
import {ImageContainerViewer, ImageContainerViewerRef} from 'common-ui';
import {VariantImageEntity} from 'modules/product/models/entities';
import {productService} from 'modules/product/services';
import React, {createRef, useEffect, useMemo, useState} from 'react';
import {Dimensions, ImageRequireSource, View} from 'react-native';
import {Source} from 'react-native-fast-image';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';
import VariantImageView from '../VariantImageView';

interface Props {
  variantImages: Array<VariantImageEntity>;
}

const DefaultWidth = Dimensions.get('screen').width;

const SlideImageView: React.FC<Props> = ({variantImages}) => {
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
  const disableViewer = useMemo(
    () => urls.filter(url => typeof url === 'number').length > 0,
    [urls],
  );
  const onItemPress = (position: number) => {
    viewerRef.current?.show(imageInfos, position);
  };
  useEffect(() => {
    const res = productService.getImageSources(variantImages);
    if (res.length === 0) {
      return;
    }
    setUrls(res);
  }, [variantImages]);
  return (
    <React.Fragment>
      <View style={{width: DefaultWidth, height: DefaultWidth}}>
      </View>
      <ImageContainerViewer ref={viewerRef} />
    </React.Fragment>
  );
};

export default SlideImageView;
