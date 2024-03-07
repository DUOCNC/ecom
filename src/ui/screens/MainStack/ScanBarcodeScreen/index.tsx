import React, {useEffect, useState} from 'react';
import BarcodeStyle from './styles';
import BaseCamera from 'ui/view/Common/BaseCamera';
import {CTButtonIcon} from 'components/Button';
import {normalize} from 'utils/DimensionsUtils';
import {icon_flash, icon_off_flash, ic_close_white} from 'assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackScreenProps} from '..';
import {MainRouteConfig} from 'config/RouteConfig';
import {getVariantsApi} from 'services/ProductService/ProductApi';
import {getCustomersApi} from 'services/CustomerService/CustomerApi';
import {useAppDispatch} from 'hook/CustomReduxHook';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import CTLayout from 'components/CTLayout';
import {RNCamera} from 'react-native-camera';
import {View} from 'react-native';
import {useAuth} from 'providers/contexts/AuthContext';
import {useConfig} from 'hook';

type Props = MainStackScreenProps<'BarcodeScanner'>;

interface HandleBarcode {
  handling: boolean;
  handled: boolean;
}

const BarcodeScreen: React.FC<Props> = ({navigation}) => {
  const {locationSelected} = useAuth();
  const dispatch = useAppDispatch();
  const [handleVariant, setHandleVariant] = useState<HandleBarcode>({
    handled: false,
    handling: false,
  });
  const [handleCustomer, setHandleCustomer] = useState<HandleBarcode>({
    handled: false,
    handling: false,
  });
  const [finding, setFinding] = useState<boolean>(false);
  const [barcodeRead, setBarcodeRead] = useState<string>('');
  const top = useSafeAreaInsets().top;
  const onBarcodeRead = (value: string) => {
    if (barcodeRead !== '') {
      return;
    }
    setFinding(false);
    setBarcodeRead(value);
  };
  const onFlashPress = () => {
    if (flash === RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.torch);
    } else {
      setFlash(RNCamera.Constants.FlashMode.off);
    }
  };
  const {defaultFlash} = useConfig();
  const [flash, setFlash] = useState(
    defaultFlash
      ? RNCamera.Constants.FlashMode.torch
      : RNCamera.Constants.FlashMode.off,
  );
  const icon =
    flash === RNCamera.Constants.FlashMode.off ? icon_flash : icon_off_flash;
  useEffect(() => {
    if (
      barcodeRead !== '' &&
      !handleVariant.handling &&
      !handleVariant.handled
    ) {
      setHandleVariant({handled: false, handling: true});
      getVariantsApi(
        {
          info: barcodeRead,
          limit: 1,
          page: 1,
        },
        result => {
          if (!finding && result.items.length > 0) {
            setFinding(true);
            navigation.goBack();
            setTimeout(() => {
              navigation.push(MainRouteConfig.VariantDetail, {
                variantId: result.items[0].id,
                productId: result.items[0].productId,
                sku: result.items[0].sku,
              });
            }, 200);
          }
        },
        () => {},
        () => {
          setHandleVariant({
            handled: true,
            handling: false,
          });
        },
      );
    }
  }, [barcodeRead, finding, handleVariant, navigation, locationSelected]);
  useEffect(() => {
    if (
      barcodeRead !== '' &&
      !handleCustomer.handling &&
      !handleCustomer.handled
    ) {
      setHandleCustomer({
        handled: false,
        handling: true,
      });
      getCustomersApi(
        {
          search_type: 'LIST',
          request: barcodeRead,
        },
        data => {
          if (!finding && data.items.length > 0) {
            setFinding(true);
            navigation.goBack();
            setTimeout(() => {
              navigation.push(MainRouteConfig.DetailCustomer, {
                id: data.items[0].id,
                name: data.items[0].fullName,
              });
            }, 200);
          }
        },
        () => {},
        () => {
          setTimeout(
            () =>
              setHandleCustomer({
                handled: true,
                handling: false,
              }),
            2000,
          );
        },
      );
    }
  }, [barcodeRead, finding, handleCustomer, navigation]);
  useEffect(() => {
    if (!finding && handleVariant.handled && handleCustomer.handled) {
      dispatch(
        showConfirm({
          title: 'Không tìm thấy',
          message: 'Không tìm thấy thông tin liên quan đến barcode này',
          okText: 'Thử lại',
          cancelText: 'Thoát',
          onOk: () => {
            dispatch(hideModal());
            setBarcodeRead('');
            setHandleCustomer({handled: false, handling: false});
            setHandleVariant({handled: false, handling: false});
          },
          onCancel: () => {
            dispatch(hideModal());
            navigation.goBack();
          },
        }),
      );
    }
  }, [
    dispatch,
    finding,
    handleCustomer.handled,
    handleVariant.handled,
    navigation,
  ]);
  return (
    <CTLayout.Container disableHideKeyboardOnPress>
      <View style={[{top: top + normalize(16)}, BarcodeStyle.header]}>
        <CTButtonIcon
          onPress={() => navigation.goBack()}
          iconStyle={BarcodeStyle.iconClose}
          icon={ic_close_white}
        />
        <CTButtonIcon onPress={onFlashPress} icon={icon} />
      </View>
      <BaseCamera flash={flash} onBarcodeRead={onBarcodeRead} />
    </CTLayout.Container>
  );
};

export default BarcodeScreen;
