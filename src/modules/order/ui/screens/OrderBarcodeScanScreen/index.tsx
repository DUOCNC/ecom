import {icon_flash, icon_off_flash, ic_close} from 'assets/images';
import {Layout} from 'common-ui';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {BackHandler, Image, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {BarcodeView} from '../../views';
import style from './style';
import {useAppDispatch} from 'hook/CustomReduxHook';
import {
  customerService,
  orderService,
  productService,
} from 'modules/order/services';
import {OrderLineEntity} from 'modules/order/models';
import {MainRouteConfig} from 'config/RouteConfig';
import {useAuth} from 'providers/contexts/AuthContext';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';
import {useConfig} from 'hook';
interface HandleBarcode {
  handling: boolean;
  handled: boolean;
}
type Props = MainStackScreenProps<'OrderBarcodeScan'>;
const OrderBarcodeScanScreen: React.FC<Props> = ({navigation, route}) => {
  const {locationSelected} = useAuth();
  const {defaultFlash} = useConfig();
  const [flash, setFlash] = useState(
    defaultFlash
      ? RNCamera.Constants.FlashMode.torch
      : RNCamera.Constants.FlashMode.off,
  );
  const {link, type, order} = route.params;
  const top = useSafeAreaInsets().top;
  const dispatch = useAppDispatch();
  const [finding, setFinding] = useState<boolean>(false);
  const [barcodeRead, setBarcodeRead] = useState<string>('');
  const [handleVariant, setHandleVariant] = useState<HandleBarcode>({
    handled: false,
    handling: false,
  });
  const [handleCustomer, setHandleCustomer] = useState<HandleBarcode>({
    handled: false,
    handling: false,
  });
  const icon = useMemo(() => {
    if (flash === 'off') {
      return icon_flash;
    }
    return icon_off_flash;
  }, [flash]);

  const onFlashPress = () => {
    if (flash === 'torch') {
      setFlash('off');
      return;
    }
    setFlash('torch');
  };

  const onBackPress = useCallback(() => {
    navigation.navigate(MainRouteConfig.PosCreate);
  }, [navigation]);

  useEffect(() => {
    const event = BackHandler.addEventListener('hardwareBackPress', () => {
      onBackPress();
      return true;
    });
    return () => event.remove();
  }, [onBackPress]);

  const onBarcodeListener = (barcode: string) => {
    if (barcodeRead !== '') {
      return;
    }
    setFinding(false);
    setBarcodeRead(barcode);
  };
  const logAction = () => {
    orderService.logOrderAction(
      {
        function: FunctionLog.ADD_PRODUCT_TO_ORDER,
        screen: ScreenLog.POS_CREATE_SCREEN,
        action: ActionLog.ADD,
        storeId: locationSelected.locationId,
        storeName: locationSelected.locationName,
      },
      () => {},
      () => {},
    );
  };
  useEffect(() => {
    if (
      type === 'variant' &&
      barcodeRead !== '' &&
      !handleVariant.handling &&
      !handleVariant.handled
    ) {
      setHandleVariant({handled: false, handling: true});
      productService.getVariantByBarcode(
        locationSelected,
        {info: barcodeRead, saleable: true},
        variantEntities => {
          setFinding(true);
          let lineItem = OrderLineEntity.create(variantEntities);
          setTimeout(() => {
            logAction();
            navigation.navigate(link, {
              lineItem: {item: lineItem, index: 0, isNew: true},
            });
          }, 200);
          return;
        },
        () => {},
        () => {
          setHandleVariant({handled: true, handling: false});
        },
      );
    }

    if (
      type === 'customer' &&
      barcodeRead !== '' &&
      !handleCustomer.handling &&
      !handleCustomer.handled
    ) {
      setHandleCustomer({handled: false, handling: true});
      customerService.searchCustomerBarcode(
        barcodeRead,
        1,
        () => {},
        customer => {
          setFinding(true);
          setTimeout(() => {
            navigation.navigate(link, {
              customerId: customer.getId(),
            });
          }, 200);
          return;
        },
        () => {},
        () => {
          setHandleCustomer({handled: true, handling: false});
        },
      );
    }
  }, [
    barcodeRead,
    handleCustomer,
    handleVariant,
    link,
    locationSelected,
    navigation,
    order,
    type,
  ]);

  useEffect(() => {
    if (!finding && (handleVariant.handled || handleCustomer.handled)) {
      dispatch(
        showConfirm({
          title: 'Không tìm thấy',
          message: 'Không tìm thấy thông tin liên quan đến barcode này',
          okText: 'Thử lại',
          cancelText: 'Thoát',
          onOk: () => {
            dispatch(hideModal());
            setBarcodeRead('');
            setHandleVariant({handled: false, handling: false});
            setHandleCustomer({handled: false, handling: false});
          },
          onCancel: () => {
            dispatch(hideModal());
            navigation.goBack();
          },
        }),
      );
    }
  }, [dispatch, finding, handleCustomer, handleVariant, navigation]);

  return (
    <Layout.Screen barStyle="light-content">
      <View style={[style.header, {paddingTop: top}]}>
        <View style={style.headerContainer}>
          <TouchableOpacity onPress={onBackPress} style={style.button}>
            <Image style={style.iconClose} source={ic_close} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onFlashPress} style={style.button}>
            <Image resizeMode="contain" style={style.iconFlash} source={icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Layout.Container>
        <BarcodeView onBarcodeListener={onBarcodeListener} flash={flash} />
      </Layout.Container>
    </Layout.Screen>
  );
};

export default OrderBarcodeScanScreen;
