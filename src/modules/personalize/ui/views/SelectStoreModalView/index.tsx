import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {Image, View} from 'react-native';
import {DimentionUtils, Typography, useBottomSheetBackHandler} from 'common-ui';
import {ic_close, ic_store, ic_support_store} from 'assets/images';
import {CTButtonIcon} from 'components/Button';
import style from './style';
import {colors} from 'assets/v2';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LocationSelectedProvider} from 'model/providers';

export interface SelectStoreModalProps {
  onPressStore: (isSupport: boolean) => void;
  locationSelected: LocationSelectedProvider;
}

export type SelectStoreModalRef = {
  open: () => void;
  close: () => void;
};

export type SelectStoreModal = ForwardRefRenderFunction<
  SelectStoreModalRef,
  SelectStoreModalProps
>;

const SelectStoreModalView: SelectStoreModal = (
  {onPressStore, locationSelected},
  ref,
) => {
  const modalRef = createRef<BottomSheetModal>();
  const bottom = useSafeAreaInsets().bottom;
  const onOpen = () => {
    modalRef.current?.present();
  };
  const onClose = () => {
    modalRef.current?.dismiss();
  };
  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
  }));
  const height = useMemo(() => DimentionUtils.scale(168) + bottom, [bottom]);
  return (
    <BottomSheetModal
      index={0}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.4}
          pressBehavior="close"
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
      onChange={handleSheetPositionChange}
      handleComponent={null}
      snapPoints={[height]}
      ref={modalRef}>
      <View style={style.container}>
        <View style={style.header}>
          <CTButtonIcon
            onPress={onClose}
            style={style.icClose}
            icon={ic_close}
            iconStyle={style.iconClose}
          />
          <Typography text="Chọn loại cửa hàng" textType="medium" type="h3" />
        </View>
        <View style={style.body}>
          <View
            style={[style.row, !locationSelected.supported && style.active]}>
            <TouchableOpacity
              onPress={() => onPressStore(false)}
              style={style.btn}>
              <View style={style.iconContainer}>
                <Image style={style.icon} source={ic_store} />
              </View>
              <Typography
                style={style.title}
                color={colors.secondary.o900}
                type="h4"
                text="Chọn cửa hàng mặc định"
              />
            </TouchableOpacity>
          </View>
          <View style={[style.row, locationSelected.supported && style.active]}>
            <TouchableOpacity
              onPress={() => onPressStore(true)}
              style={style.btn}>
              <View style={style.iconContainer}>
                <Image style={style.icon} source={ic_support_store} />
              </View>
              <Typography
                style={style.title}
                color={colors.secondary.o900}
                type="h4"
                text="Chọn cửa hàng đi hỗ trợ"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default forwardRef(SelectStoreModalView);
