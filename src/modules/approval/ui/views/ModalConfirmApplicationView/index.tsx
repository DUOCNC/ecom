import {colors} from 'assets/v2';
import {DimentionUtils, Typography} from 'common-ui';
import {Font} from 'components/Base/Text';
import {CTButton} from 'components/Button';
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  title: string;
  subTitle: string;
  icon: ImageSourcePropType;
  onConfirm: () => void;
}

export type ModalConfirmApplicationRef = {
  open: () => void;
  close: () => void;
};

export type ModalTimekeepingComponent = ForwardRefRenderFunction<
  ModalConfirmApplicationRef,
  Props
>;
const ModalConfirmApplicationView: ModalTimekeepingComponent = (
  {title, subTitle, icon, onConfirm},
  ref,
) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const onOpen = () => {
    setIsShow(true);
  };
  const onClose = () => {
    setIsShow(false);
  };
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
  }));

  return (
    <Modal
      isVisible={isShow}
      useNativeDriverForBackdrop
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackButtonPress={onClose}>
      <View style={style.container}>
        <View style={style.icon}>
          <Image source={icon} />
        </View>
        <View style={[style.row, style.title]}>
          <Typography
            text={title}
            color={title !== 'Duyệt đơn' ? colors.error.o500 : colors.blue.o500}
            type="h3"
            textType="medium"
          />
        </View>
        <View style={[style.row, style.subTitle]}>
          <Typography text={subTitle} />
        </View>
        <View style={[style.row, style.action]}>
          <CTButton
            font={Font.Medium}
            style={style.cancel}
            text="Xem xét lại"
            type="grey"
            onPress={() => {
              setIsShow(false);
            }}
          />
          <CTButton
            font={Font.Medium}
            style={{flex: 1}}
            text="Xác nhận"
            onPress={onConfirm}
          />
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: DimentionUtils.scale(8),
    backgroundColor: colors.base.white,
    padding: DimentionUtils.scale(16),
  },
  icon: {alignItems: 'center', marginTop: DimentionUtils.scale(8)},
  row: {flexDirection: 'row', paddingTop: DimentionUtils.scale(16)},
  text: {},
  title: {justifyContent: 'center'},
  subTitle: {justifyContent: 'center'},
  action: {
    height: DimentionUtils.scale(64),
    justifyContent: 'space-between',
  },
  cancel: {
    marginRight: DimentionUtils.scale(16),
    flex: 1,
  },
});
export default forwardRef(ModalConfirmApplicationView);
