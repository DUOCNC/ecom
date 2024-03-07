import React, {useCallback, useEffect, useRef, useState} from 'react';
import BarcodeStyle from './styles';
import BaseCamera from 'ui/view/Common/BaseCamera';
import {CTButton, CTButtonIcon} from 'components/Button';
import {normalize} from 'utils/DimensionsUtils';
import {icon_flash, icon_off_flash, ic_close_white} from 'assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch} from 'hook/CustomReduxHook';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {RNCamera} from 'react-native-camera';
import {Animated, View, BackHandler} from 'react-native';
import {useAuth} from 'providers/contexts/AuthContext';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {inventoryService} from 'modules/product/services';
import BinLocationEntity from 'modules/product/models/entities/BinLocationEntity';
import {showError, showSuccess} from 'utils/ToastUtils';
import {StringUtils} from 'common';
import {MainRouteConfig} from 'config/RouteConfig';
import {Layout} from 'common-ui';
import {Font} from 'components/Base/Text';

type Props = MainStackScreenProps<'ProductPositioningBarCode'>;

interface HandleBarcode {
  handling: boolean;
  handled: boolean;
}
const ProductPositioningBarCodeScreen: React.FC<Props> = ({navigation}) => {
  const {locationSelected} = useAuth();
  const dispatch = useAppDispatch();
  const locationId = locationSelected.locationId;
  const [handleVariant, setHandleVariant] = useState<HandleBarcode>({
    handled: false,
    handling: false,
  });
  const [finding, setFinding] = useState<boolean>(false);
  const [barcodeRead, setBarcodeRead] = useState<string>('');
  const [binItems, setBinItems] = useState<BinLocationEntity[]>([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const icon =
    flash === RNCamera.Constants.FlashMode.off ? icon_flash : icon_off_flash;
  useEffect(() => {
    if (
      barcodeRead !== '' &&
      !handleVariant.handling &&
      !handleVariant.handled
    ) {
      setHandleVariant({handled: false, handling: true});
      // Tạo hiệu ứng nháy màn hình
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      inventoryService.getVariantsByBinLocation(
        barcodeRead,
        locationId,
        rsSuggestion => {
          if (rsSuggestion.length > 0) {
            setBinItems(e => [...e, rsSuggestion[0]]);
            showSuccess(
              StringUtils.format(
                'Đã thêm sản phẩm {0}',
                rsSuggestion[0].getSku(),
              ),
            );
            // navigation.navigate(MainRouteConfig.ProductPositioning, {
            //   keyword: '',
            //   item: rsSuggestion[0],
            // });
          } else {
            showError(
              StringUtils.format(
                'Không tìm thấy sản phẩm với barocde là: {0}',
                barcodeRead,
              ),
            );
          }
        },
      );
    }
  }, [
    barcodeRead,
    finding,
    handleVariant,
    navigation,
    locationSelected,
    locationId,
    fadeAnim,
  ]);

  useEffect(() => {
    if (!finding && handleVariant.handled) {
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
          },
          onCancel: () => {
            dispatch(hideModal());
            navigation.goBack();
          },
        }),
      );
    }
  }, [dispatch, finding, handleVariant.handled, navigation]);

  const handleClose = useCallback(() => {
    navigation.navigate(MainRouteConfig.ProductPositioning, {
      keyword: '',
      items: binItems,
    });
    return true;
  }, [binItems, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleClose,
    );

    return () => backHandler.remove();
  }, [handleClose]);

  return (
    <Layout.Screen barStyle="default">
      <Layout.SafeAreaContainer edges={['bottom']}>
        <Animated.View style={{opacity: fadeAnim, flex: 1}}>
          <View style={[{top: top + normalize(16)}, BarcodeStyle.header]}>
            <CTButtonIcon
              onPress={handleClose}
              iconStyle={BarcodeStyle.iconClose}
              icon={ic_close_white}
            />
            <CTButtonIcon onPress={onFlashPress} icon={icon} />
          </View>
          <BaseCamera flash={flash} onBarcodeRead={onBarcodeRead} />
          <View style={BarcodeStyle.screenBottom}>
            <CTButton
              type="secondary"
              onPress={() => {
                setBarcodeRead('');
                setHandleVariant({handled: false, handling: false});
              }}
              disabled={barcodeRead === ''}
              text={StringUtils.format('Tiếp tục ({0})', binItems.length)}
              font={Font.Medium}
              style={BarcodeStyle.buttonView}
            />
          </View>
        </Animated.View>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default ProductPositioningBarCodeScreen;
