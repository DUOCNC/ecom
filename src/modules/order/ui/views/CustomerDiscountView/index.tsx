import {ic_copy} from 'assets/images';
import {Font} from 'components/Base/Text';
import {CTButton} from 'components/Button';
import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, Keyboard, View} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {
  DimentionUtils,
  Layout,
  Typography,
  useBottomSheetBackHandler,
} from 'common-ui';
import Style from './style';
import {colors} from 'assets/v2';
import ScreenBottom from 'common-ui/components/Layout/ScreenBottom';
import {CustomerDiscountEntity} from 'modules/order/models/entities';
import CustomerDiscountItemView from '../CustomerDiscountItemView';

export interface CustomerDiscountProps {}

export type CustomerDiscountRef = {
  open: () => void;
  close: () => void;
  setCustomerDiscounts: (discounts: Array<CustomerDiscountEntity>) => void;
};

export type CustomerDiscountComponent = ForwardRefRenderFunction<
  CustomerDiscountRef,
  CustomerDiscountProps
>;

export interface TimeLineProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CustomerDiscountView: CustomerDiscountComponent = ({}, ref) => {
  const modalRef = createRef<BottomSheetModal>();
  const [customerDiscounts, setCustomerDiscounts] = useState<
    Array<CustomerDiscountEntity>
  >([]);
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
    setCustomerDiscounts: setCustomerDiscounts,
  }));


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
      onDismiss={Keyboard.dismiss}
      snapPoints={[DimentionUtils.scale(450)]}
      ref={modalRef}>
      <Layout.SafeAreaContainer edges={['bottom']}>
        <View style={Style.container}>
          <View style={Style.header}>
            <View>
              <Typography
                text="Mã khuyến mại của khách hàng"
                textType="medium"
                type="h3"
              />
            </View>
          </View>
          <View style={[Style.body]}>
            {customerDiscounts.length === 0 ? (
              <View style={[Style.row, Style.rowOne]}>
                <Typography
                  text="Không tìm thấy chương trình nào."
                  color={colors.secondary.o500}
                />
              </View>
            ) : (
              <View style={[Style.row, Style.rowOne]}>
                <Typography text="Bấm " color={colors.secondary.o400} />
                <Image
                  source={ic_copy}
                  style={{tintColor: colors.secondary.o400}}
                />
                <Typography
                  text=" để sao chép mã"
                  color={colors.secondary.o400}
                />
              </View>
            )}

            <BottomSheetFlatList
              keyboardShouldPersistTaps="handled"
              renderItem={({item, index}) => (
                <CustomerDiscountItemView discount={item} key={index} />
              )}
              keyExtractor={item => item.getCode().toString()}
              data={customerDiscounts}
            />
          </View>
        </View>
        <ScreenBottom>
          <View style={Style.viewBottom}>
            <CTButton onPress={onClose} text="Xong" font={Font.Medium} />
          </View>
        </ScreenBottom>
      </Layout.SafeAreaContainer>
    </BottomSheetModal>
  );
};

export default forwardRef(CustomerDiscountView);
