import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';
import {CareLabelEntity} from 'modules/product/models';
import Modal from 'react-native-modal';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';

interface ModalCareProps {
  cares: Array<CareLabelEntity>;
}

export type ModalCareRef = {
  open: () => void;
  close: () => void;
};

export type ModalCareView = ForwardRefRenderFunction<
  ModalCareRef,
  ModalCareProps
>;

const ModalCareView: ModalCareView = ({cares}, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
  }));
  return (
    <Modal
      useNativeDriverForBackdrop
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackButtonPress={onClose}
      isVisible={visible}>
      <View style={style.container}>
        <View style={style.header}>
          <Typography textType="medium" type="h3" text="Thông tin bảo quản" />
        </View>
        <View style={style.content}>
          {cares.map(care => (
            <View style={style.item} key={care.getId()}>
              <Image style={style.itemImage} source={care.getImage()} />
              <Typography
                style={style.itemTxt}
                textType="regular"
                type="h4"
                text={care.getName()}
              />
            </View>
          ))}
        </View>
        <View style={style.bottom}>
          <TouchableOpacity onPress={onClose} style={style.button}>
            <Typography
              color={colors.primary.o500}
              textType="medium"
              type="h3"
              text="Đóng"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default forwardRef(ModalCareView);
