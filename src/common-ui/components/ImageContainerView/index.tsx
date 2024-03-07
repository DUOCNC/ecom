import {ic_close} from 'assets/images';
import {colors} from 'assets/v2';
import {StatusBar} from 'common-ui/core';
import {ImageContainerViewerRef} from 'common-ui/types';
import {StringUtils} from 'common/utils';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Typography from '../Typography';
import style from './style';

interface Props {}

export type IImageContainerViewer = ForwardRefRenderFunction<
  ImageContainerViewerRef,
  Props
>;

const ImageContainerViewer: IImageContainerViewer = ({}, ref) => {
  const [imageUrls, setImageUrls] = useState<Array<IImageInfo>>([]);
  const [visible, setVisibe] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(-1);
  const top = useSafeAreaInsets().top;
  const onShow = (urls: Array<IImageInfo>, p: number) => {
    if (urls.length === 0) {
      console.warn('urls length > 0');
      return;
    }
    if (p < 0) {
      console.warn('position >= 0');
      return;
    }
    setImageUrls(urls);
    setPosition(p);
    setVisibe(true);
  };
  const onClose = useCallback(() => setVisibe(false), []);
  useImperativeHandle(ref, () => ({
    show: onShow,
  }));
  const onSwipeDown = () => {
    setVisibe(false);
  };
  return (
    <Modal
      statusBarTranslucent
      onBackButtonPress={onClose}
      style={style.modal}
      isVisible={visible}>
      <StatusBar barStyle="light-content" />
      <View style={[style.container]}>
        <ImageViewer
          index={position}
          enableSwipeDown={true}
          onSwipeDown={onSwipeDown}
          enablePreload={true}
          imageUrls={imageUrls}
          enableImageZoom
          renderIndicator={(currentIndex, length) => (
            <View style={[style.indicator, {top: top}]}>
              <Typography
                color={colors.base.white}
                type="h3"
                textType="medium"
                text={StringUtils.format('{0} / {1}', currentIndex, length)}
              />
              <TouchableOpacity onPress={onClose} style={[style.buttonClose]}>
                <Image style={style.icClose} source={ic_close} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

export default forwardRef(ImageContainerViewer);
