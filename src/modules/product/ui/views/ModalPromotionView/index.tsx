import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {DimentionUtils, Typography, useBottomSheetBackHandler} from 'common-ui';
import {colors} from 'assets/v2';
import {View} from 'react-native';
import {PromotionEntity, VariantEntity} from 'modules/product/models';
import {ic_close} from 'assets/images';
import {CTButtonIcon} from 'components/Button';
import style from './style';
import PromotionItemView from '../PromotionItemView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ModalPromotionProps {
  promotions: Array<PromotionEntity>;
  variant: VariantEntity;
}

export type ModalPromotionRef = {
  open: () => void;
  close: () => void;
};

export type ModalPromotionView = ForwardRefRenderFunction<
  ModalPromotionRef,
  ModalPromotionProps
>;

const ModalPromotionView: ModalPromotionView = ({promotions, variant}, ref) => {
  const modalRef = createRef<BottomSheetModal>();
  const bottom = useSafeAreaInsets().bottom;
  const onClose = () => {
    modalRef.current?.close();
  };
  const onOpen = () => {
    modalRef.current?.present();
  };
  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);
  useImperativeHandle(ref, () => ({
    close: onClose,
    open: onOpen,
  }));
  return (
    <BottomSheetModal
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
      containerStyle={{backgroundColor: colors.base.tranparents}}
      snapPoints={[DimentionUtils.scale(480)]}
      ref={modalRef}>
      <View style={style.container}>
        <View style={style.header}>
          <CTButtonIcon
            onPress={onClose}
            style={style.icClose}
            icon={ic_close}
            iconStyle={style.iconClose}
          />
          <Typography
            text="Chương trình khuyến mại"
            textType="medium"
            type="h3"
          />
        </View>
        <View style={style.body}>
          <BottomSheetFlatList
            contentContainerStyle={[style.list, {paddingBottom: bottom}]}
            keyExtractor={item => item.getKey()}
            data={promotions}
            renderItem={({item}) => (
              <PromotionItemView vertical variant={variant} promotion={item} />
            )}
          />
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default forwardRef(ModalPromotionView);
