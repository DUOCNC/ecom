import {ic_close} from 'assets/images';
import {CTButtonIcon} from 'components/Button';
import React from 'react';
import {Text, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ImageViewerStyle} from './style';

export interface ImageViewerProps {
  position: number;
  imageUrls: Array<IImageInfo>;
  onClose: () => void;
}

const ImageViewerModal: React.FC<ImageViewerProps> = (
  props: ImageViewerProps,
) => {
  const top = useSafeAreaInsets().top;
  let {position, imageUrls, onClose} = props;
  const onSwipeDown = () => {
    onClose();
  };

  return (
    <View style={ImageViewerStyle.container}>
      {imageUrls.length > 0 && (
        <ImageViewer
          index={position}
          enableSwipeDown={true}
          onSwipeDown={onSwipeDown}
          enablePreload={true}
          imageUrls={imageUrls}
          renderIndicator={(currentIndex, allSize) => {
            return (
              <View style={ImageViewerStyle.index}>
                <Text style={ImageViewerStyle.indexText}>
                  {currentIndex} / {allSize}
                </Text>
              </View>
            );
          }}
        />
      )}
      <CTButtonIcon
        onPress={() => onClose()}
        style={[ImageViewerStyle.btnClose, {top: top}]}
        icon={ic_close}
        iconStyle={ImageViewerStyle.iconClose}
      />
    </View>
  );
};

export default ImageViewerModal;
