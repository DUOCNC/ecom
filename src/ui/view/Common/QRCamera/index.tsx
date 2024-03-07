import React from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {BaseCameraStyle, FocusStyle} from './style';

type Props = {
  onBarCodeRead: (value: string) => void;
  flash: any;
};

const QRCamera: React.FC<Props> = ({onBarCodeRead, flash}: Props) => {
  return (
    <View style={BaseCameraStyle.container}>
      <RNCamera
        style={BaseCameraStyle.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={flash}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onBarCodeRead={result => {
          onBarCodeRead(result.data);
        }}
      />
      {
        <View style={FocusStyle.body}>
          <View style={FocusStyle.maskOuter}>
            <View
              style={[FocusStyle.maskRow, FocusStyle.applyMaskFrameStyle]}
            />
            <View style={[FocusStyle.maskCenter]}>
              <View style={[FocusStyle.applyMaskFrameStyle]} />
              <View style={[FocusStyle.maskInner]}>
                <View
                  style={FocusStyle.finder}
                  // onLayout={this._onFinderLayoutMeasured}
                >
                  <View style={[FocusStyle.defaultStyle, FocusStyle.topLeft]} />
                  <View
                    style={[FocusStyle.defaultStyle, FocusStyle.topRight]}
                  />
                  <View
                    style={[FocusStyle.defaultStyle, FocusStyle.bottomLeft]}
                  />
                  <View
                    style={[FocusStyle.defaultStyle, FocusStyle.bottomRight]}
                  />
                  {/* {showAnimatedLine && (
      <Animated.View style={[styles.animatedLine, animatedLineStyle]} />
    )} */}
                </View>
              </View>
              <View style={[FocusStyle.applyMaskFrameStyle]} />
            </View>
            <View
              style={[
                FocusStyle.maskRow,
                FocusStyle.applyMaskFrameStyle,
                FocusStyle.bottom,
              ]}
            />
          </View>
        </View>
      }
    </View>
  );
};

export default QRCamera;
