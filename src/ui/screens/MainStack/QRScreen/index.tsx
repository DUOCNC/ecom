import React, {useEffect, useState} from 'react';
import BarcodeStyle from './styles';
import {CTButtonIcon} from 'components/Button';
import {normalize} from 'utils/DimensionsUtils';
import {icon_flash, icon_off_flash, ic_close_white} from 'assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackScreenProps} from '..';
import CTLayout from 'components/CTLayout';
import {RNCamera} from 'react-native-camera';
import {View} from 'react-native';
import {MainRouteConfig} from 'config/RouteConfig';
import {QRCamera} from 'ui/view/Common';

type Props = MainStackScreenProps<'QR'>;

const QRScreen: React.FC<Props> = ({navigation}) => {
  const [barcodeRead, setBarcodeRead] = useState<string>('');
  const top = useSafeAreaInsets().top;
  const onBarcodeRead = (value: string) => {
    if (barcodeRead !== '') {
      return;
    }
    setBarcodeRead(value);
  };
  const onFlashPress = () => {
    if (flash === RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.torch);
    } else {
      setFlash(RNCamera.Constants.FlashMode.off);
    }
  };
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.torch);
  const icon =
    flash === RNCamera.Constants.FlashMode.off ? icon_flash : icon_off_flash;

  useEffect(() => {
    if (barcodeRead !== '') {
      const parts = barcodeRead.split('/');
      const id = parts[parts.length - 1];
      navigation.navigate(MainRouteConfig.TransferDetail, {id: id});
    }
  }, [barcodeRead, navigation]);

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
      <QRCamera flash={flash} onBarCodeRead={onBarcodeRead} />
    </CTLayout.Container>
  );
};

export default QRScreen;
