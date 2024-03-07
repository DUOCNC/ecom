import React from 'react';
import {View} from 'react-native';
import {BarCodeReadEvent, FlashMode, RNCamera} from 'react-native-camera';
import style from './style';

interface Props {
  flash: keyof FlashMode;
  onBarcodeListener: (data: string) => void;
}

const BarcodeView: React.FC<Props> = ({flash, onBarcodeListener}) => {
  const onBarCodeRead = (result: BarCodeReadEvent) => {
    onBarcodeListener(result.data);
  };

  return (
    <View style={style.container}>
      <RNCamera
        style={style.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={flash}
        barCodeTypes={[
          RNCamera.Constants.BarCodeType.ean13,
          RNCamera.Constants.BarCodeType.ean8,
          RNCamera.Constants.BarCodeType.code128,
        ]}
        onBarCodeRead={onBarCodeRead}
      />
      <View style={style.body}>
        <View style={style.maskOuter}>
          <View style={[style.maskRow, style.applyMaskFrameStyle]} />
          <View style={[style.maskCenter]}>
            <View style={[style.applyMaskFrameStyle]} />
            <View style={[style.maskInner]}>
              <View style={style.finder}>
                <View style={[style.defaultStyle, style.topLeft]} />
                <View style={[style.defaultStyle, style.topRight]} />
                <View style={[style.defaultStyle, style.bottomLeft]} />
                <View style={[style.defaultStyle, style.bottomRight]} />
              </View>
            </View>
            <View style={[style.applyMaskFrameStyle]} />
          </View>
          <View
            style={[style.maskRow, style.applyMaskFrameStyle, style.bottom]}
          />
        </View>
      </View>
    </View>
  );
};

export default BarcodeView;
