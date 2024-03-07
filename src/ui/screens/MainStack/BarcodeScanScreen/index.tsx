import {icon_flash, icon_off_flash, ic_close} from 'assets/images';
import {Layout} from 'common-ui';
import React, {useMemo, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {BarcodeView} from 'ui/view';
import style from './style';
import {useConfig} from 'hook';

type Props = MainStackScreenProps<'BarcodeScan'>;

const BarcodeScanScreen: React.FC<Props> = ({navigation, route}) => {
  const {defaultFlash} = useConfig();
  const [flash, setFlash] = useState(
    defaultFlash
      ? RNCamera.Constants.FlashMode.torch
      : RNCamera.Constants.FlashMode.off,
  );
  const {link, type, data} = route.params;
  let dataRoute = useMemo(() => {
    if (!data) {
      return {};
    }
    return data;
  }, [data]);
  const top = useSafeAreaInsets().top;
  const icon = useMemo(() => {
    if (flash === 'torch') {
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

  const onBackPress = () => {
    navigation.goBack();
  };

  const onBarcodeListener = (barcode: string) => {
    if (route.params.returnLink) {
      navigation.navigate(link, {
        link: route.params.returnLink,
        barcode: {
          type: type,
          value: barcode,
        },
      });
      return;
    }
    navigation.navigate(link, {
      ...dataRoute,
      barcode: {
        type: type,
        value: barcode,
      },
    });
  };

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

export default BarcodeScanScreen;
