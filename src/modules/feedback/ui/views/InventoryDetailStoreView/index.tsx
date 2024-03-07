import {ic_close} from 'assets/images';
import {Font} from 'components/Base/Text';
import {CTButtonIcon} from 'components/Button';
import CTTypography from 'components/CTTypography';
import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {DimentionUtils, useBottomSheetBackHandler} from 'common-ui';
import Style from './style';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/AuthenticationStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {StoreEntity} from 'modules/product/models/entities';
import InventoryItemView from '../ReasonItemView';

export interface InventoryDetailProps {}

export type InventoryDetailPopupRef = {
  open: () => void;
  close: () => void;
  setStore: (store: StoreEntity) => void;
};

export type InventoryDetailStoreComponent = ForwardRefRenderFunction<
  InventoryDetailPopupRef,
  InventoryDetailProps
>;

const InventoryDetailStoreView: InventoryDetailStoreComponent = ({}, ref) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const modalRef = createRef<BottomSheetModal>();
  const onOpen = () => {
    modalRef.current?.present();
  };
  const onClose = () => {
    modalRef.current?.dismiss();
  };
  const [storeEntity, setStoreEntity] = useState<StoreEntity | null>(null);
  const onStore = (s: StoreEntity) => {
    setStoreEntity(s);
  };
  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
    setStore: onStore,
  }));
  const data = useMemo(() => {
    if (!storeEntity) {
      return [];
    }
    return storeEntity.getStoreInventoryDetailPopup();
  }, [storeEntity]);

  const handleClickContact = () => {
    onClose();
    if (!storeEntity) {
      return;
    }
    navigation.navigate(MainRouteConfig.ProductContact, {
      storeId: storeEntity.getId(),
    });
  };

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
      {storeEntity && (
        <View style={Style.container}>
          <View style={Style.header}>
            <CTButtonIcon
              onPress={onClose}
              style={Style.icClose}
              icon={ic_close}
              iconStyle={Style.iconClose}
            />
            <View>
              <CTTypography.Text
                font={Font.Medium}
                level="2"
                text={storeEntity.getName()}
              />
            </View>
            <TouchableOpacity
              style={Style.contact}
              onPress={handleClickContact}>
              <CTTypography.Text
                disabled={!storeEntity.getHotLine()}
                text="Liên hệ"
                font={Font.Medium}
                style={[
                  Style.contactText,
                  !storeEntity.getHotLine() && Style.contactDisable,
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={[Style.body]}>
            <BottomSheetFlatList
              keyboardShouldPersistTaps="handled"
              renderItem={({item}) => (
                <View style={Style.itemDetail}>
                  <InventoryItemView
                    title={item.getName()}
                    value={item.getValueDisplay()}
                    highlight={item.isHighLight()}
                  />
                </View>
              )}
              keyExtractor={item => item.getKey()}
              data={data}
            />
          </View>
        </View>
      )}
    </BottomSheetModal>
  );
};

export default forwardRef(InventoryDetailStoreView);
