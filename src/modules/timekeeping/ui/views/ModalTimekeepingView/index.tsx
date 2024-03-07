import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';
import {Typography} from 'common-ui';
import {TouchableOpacity, Image, View} from 'react-native';
import Modal from 'react-native-modal';
import style from './style';
import {colors} from 'assets/v2';
import {ic_fail, ic_location, ic_success, ic_time} from 'assets/images';

export interface ModalTimekeepingProps {
  handleCloseSuccess: () => void;
}

export type ModalTimekeepingRef = {
  open: () => void;
  close: () => void;
  setTime: (time: string) => void;
  setAddress: (address: string) => void;
  setIsSuccess: (isSuccess: boolean) => void;
};

export type ModalTimekeepingComponent = ForwardRefRenderFunction<
  ModalTimekeepingRef,
  ModalTimekeepingProps
>;

const ModalTimekeepingView: ModalTimekeepingComponent = (
  {handleCloseSuccess},
  ref,
) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const onOpen = () => {
    setIsShow(true);
  };
  const onClose = () => {
    if (isSuccess) {
      handleCloseSuccess();
    }
    setIsShow(false);
  };
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
    setTime: setTime,
    setAddress: setAddress,
    setIsSuccess: setIsSuccess,
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
          {isSuccess ? (
            <Image source={ic_success} />
          ) : (
            <Image source={ic_fail} />
          )}
        </View>
        <View style={style.title}>
          {isSuccess ? (
            <Typography
              text="Chấm công thành công"
              type="h2"
              color={colors.success.o400}
              textType="medium"
            />
          ) : (
            <Typography
              text="Chấm công thất bại"
              type="h2"
              color={colors.error.o500}
              textType="medium"
            />
          )}
        </View>
        <View>
          {isSuccess && (
            <View style={style.row}>
              <Image
                source={ic_time}
                style={[style.iconTime, {tintColor: colors.secondary.o400}]}
              />
              <Typography
                style={style.time}
                text={time}
                color={colors.secondary.o500}
              />
            </View>
          )}
          <View style={style.row}>
            <Image
              source={ic_location}
              style={[style.iconLocation, {tintColor: colors.secondary.o400}]}
            />
            <View style={style.viewAddress}>
              <Typography
                text={address}
                ellipsizeMode="tail"
                numberOfLines={2}
                color={colors.secondary.o500}
                style={style.address}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={style.btnClose} onPress={onClose}>
          <View style={style.bottom}>
            <Typography
              text="Đóng"
              color={colors.base.white}
              textType="medium"
              type="h3"
            />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default forwardRef(ModalTimekeepingView);
