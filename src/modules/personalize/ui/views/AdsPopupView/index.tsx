import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import Modal from 'react-native-modal';
import {ImageContainerViewerRef, ImageLoader} from 'common-ui';
import {Font} from 'components/Base/Text';
import {CTButton} from 'components/Button';
import {ic_placeholder_6080, ic_x_close_circle} from 'assets/images';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {useConfig} from 'hook';
interface Props {}

export type AdsPopupView = ForwardRefRenderFunction<
  ImageContainerViewerRef,
  Props
>;

const AdsPopupView: AdsPopupView = ({}, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const config = useConfig();
  const onShow = () => {
    setTimeout(() => {
      setVisible(true);
    }, 1500);
  };
  const onClose = useCallback(() => setVisible(false), []);
  useImperativeHandle(ref, () => ({
    show: onShow,
  }));
  const onClickMore = () => {
    onClose();
    navigation.navigate('MaterialStory');
  };
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.4}
      useNativeDriverForBackdrop={true}
      statusBarTranslucent
      style={style.modal}
      deviceHeight={3000}
      isVisible={visible}>
      <View style={style.container}>
        <ImageLoader
          placeholder={ic_placeholder_6080}
          source={{
            uri: config.popupUrl,
          }}
          style={style.image}
        />
        <CTButton
          onPress={onClickMore}
          font={Font.Medium}
          level="2"
          style={style.button}
          text="Khám phá"
        />
        <TouchableOpacity onPress={onClose} style={style.iconClose}>
          <Image source={ic_x_close_circle} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default forwardRef(AdsPopupView);
