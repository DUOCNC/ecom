import React, {useState} from 'react';
import BarcodeStyle from './styles';
import BaseCamera from 'ui/view/Common/BaseCamera';
import {CTButtonIcon} from 'components/Button';
import {normalize} from 'utils/DimensionsUtils';
import {icon_flash, icon_off_flash, ic_close_white} from 'assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CTLayout from 'components/CTLayout';
import {RNCamera} from 'react-native-camera';
import {View} from 'react-native';
import {useConfig} from 'hook';
import {MainStackScreenProps} from '..';

type Props = MainStackScreenProps<'BarcodeScanner'>;

const BarcodeScreen: React.FC<Props> = ({navigation}) => {
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
  const {defaultFlash} = useConfig();

  const [flash, setFlash] = useState(
    defaultFlash
      ? RNCamera.Constants.FlashMode.torch
      : RNCamera.Constants.FlashMode.off,
  );
  const icon =
    flash === RNCamera.Constants.FlashMode.off ? icon_flash : icon_off_flash;

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
