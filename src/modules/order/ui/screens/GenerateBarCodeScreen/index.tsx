import {DimentionUtils, Layout, Typography} from 'common-ui';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Animated,
  BackHandler,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import style from './style';
import {CTButton} from 'components/Button';
import ScreenBottom from 'common-ui/components/Layout/ScreenBottom';
import {bg_ticket, ic_scan_barcode_yoscan, ic_timer} from 'assets/images';
import {colors} from 'assets/v2';
import BarcodeGen from '@kichiyaki/react-native-barcode-generator';
import {useFocusEffect} from '@react-navigation/native';
import {useCountdown} from 'hook/countDown';
import {NumberUtils} from 'common';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {useAppDispatch} from 'hook';
import {BlurView} from '@react-native-community/blur';
import {Font} from 'components/Base/Text';

type Props = MainStackScreenProps<'GenerateBarCode'>;

const {ScrollView} = Animated;
const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;

const GenerateBarcodeScreen: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const [now, setNow] = useState(new Date().getTime());
  const [minutes, seconds] = useCountdown(now + FIFTEEN_MINUTES_IN_MS);
  const onBackButtonPress = () => {
    dispatch(hideModal());
    navigation.goBack();
  };
  let oderCode = useMemo(() => {
    return route.params.orderCode;
  }, [route.params]);
  let totalPrice = useMemo(() => {
    if (route.params && route.params.totalPrice) {
      return route.params.totalPrice;
    }
    return NumberUtils.formatCurrency(0);
  }, [route.params]);
  useEffect(() => {
    if (minutes + seconds === 0) {
      dispatch(
        showConfirm({
          onBackButtonPress,
          okText: 'Xác nhận',
          cancelText: 'Hủy',
          cancelButtonType: 'destruction',
          buttonType: 'default',
          isDisableCancelButton: true,
          message: 'Mã của bạn đã hết hạn, vui lòng tạo \n đơn mới',
          title: 'Mã hết hạn',
          onOk: () => {
            dispatch(hideModal());
            navigation.goBack();
          },
        }),
      );
    }
  }, [minutes, seconds]);
  useFocusEffect(
    React.useCallback(() => {
      setNow(new Date().getTime());
    }, []),
  );

  const handleBack = useCallback(() => {
    if (minutes + seconds > 0) {
      dispatch(
        showConfirm({
          onBackButtonPress,
          okText: 'Xác nhận',
          cancelText: 'Hủy',
          cancelButtonType: 'destruction',
          buttonType: 'default',
          message:
            'Hãy đảm bảo bạn đã hoàn tất quá trình bạn mong muốn. Khi ấn Tạo đơn khác, thông tin đơn hàng sẽ bị xoá.',
          title: 'Xác nhận tạo đơn khác',
          onOk: () => {
            dispatch(hideModal());
            navigation.goBack();
          },
        }),
      );
    }
    return true;
  }, [dispatch, minutes, navigation, seconds]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );

    return () => backHandler.remove();
  }, [handleBack]);

  const onPressOtherOrder = () => {
    if (minutes + seconds > 0) {
      dispatch(
        showConfirm({
          onBackButtonPress,
          okText: 'Xác nhận',
          cancelText: 'Hủy',
          cancelButtonType: 'destruction',
          buttonType: 'default',
          message:
            'Hãy đảm bảo bạn đã hoàn tất quá trình bạn mong muốn. Khi ấn Tạo đơn khác, thông tin đơn hàng sẽ bị xoá.',
          title: 'Xác nhận tạo đơn khác',
          onOk: () => {
            dispatch(hideModal());
            navigation.goBack();
          },
        }),
      );
    } else {
      dispatch(hideModal());
      navigation.goBack();
    }
  };
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title={oderCode}
        onBackPress={onPressOtherOrder}
      />
      <Layout.Container>
        <ScrollView>
          <ImageBackground source={bg_ticket} style={style.image}>
            <View style={style.container}>
              <View>
                <Typography
                  style={[style.selfCenter, style.titleBarcode]}
                  type="h3"
                  color={colors.secondary.o900}
                  text="Đưa mã này cho thu ngân"
                />
                <Typography
                  style={style.selfCenter}
                  type="h4"
                  color={colors.secondary.o500}
                  text="Thời gian còn lại để thực hiện thanh toán"
                />
                <Typography
                  style={[
                    style.selfCenter,
                    {paddingTop: DimentionUtils.scale(5)},
                  ]}
                  type="h3"
                  color={colors.primary.o500}
                  text={
                    minutes + seconds > 0
                      ? `${minutes} phút ${seconds} giây`
                      : 'HẾT HẠN'
                  }
                />
                <View style={style.viewBarCode}>
                  <BarcodeGen
                    format="CODE128"
                    value={oderCode}
                    width={2.4}
                    height={65}
                  />
                  {minutes + seconds <= 0 && (
                    <BlurView
                      style={{
                        height: 95,
                        position: 'absolute',
                        top: -15,
                        left: -15,
                        bottom: -15,
                        right: -15,
                      }}
                      blurType="light"
                      blurAmount={5}
                      reducedTransparencyFallbackColor="white"
                    />
                  )}
                </View>
              </View>
              <View style={style.footer}>
                <View>
                  <Typography
                    type="h3"
                    color={colors.secondary.o500}
                    text="Tổng khách cần trả"
                  />
                  <Typography
                    style={style.price}
                    type="h3"
                    textType="medium"
                    color={colors.primary.o500}
                    text={totalPrice}
                  />
                </View>
                <CTButton
                  disabled={true}
                  text={'Thanh toán'}
                  style={style.button}
                />
              </View>
            </View>
          </ImageBackground>
          <View style={style.elementContainer}>
            <Image source={ic_scan_barcode_yoscan} />
            <View style={style.description}>
              <Typography
                type="h4"
                color={colors.secondary.o900}
                textType="medium"
                text="Thanh toán cực tiện với mã barcode"
              />
              <Typography
                style={{marginTop: DimentionUtils.scale(4)}}
                type="h5"
                color={colors.secondary.o500}
                text="Mã barcode là mã chứa thông tin đơn hàng bạn vừa tạo"
              />
            </View>
          </View>
          <View style={style.elementContainer}>
            <Image source={ic_timer} />
            <View style={style.description}>
              <Typography
                type="h4"
                textType="medium"
                color={colors.secondary.o900}
                text="Hãy đưa thu ngân thanh toán trong vòng 15 phút"
              />
              <Typography
                style={{marginTop: DimentionUtils.scale(4)}}
                type="h5"
                color={colors.secondary.o500}
                text="Nếu không thực hiện thanh toán bởi thu ngân sau 15 phút kể từ lúc ấn Tạo đơn, thông tin đơn hàng sẽ bị xóa."
              />
            </View>
          </View>
        </ScrollView>
        <ScreenBottom>
          <View style={[style.viewBottom]}>
            <CTButton
              font={Font.Medium}
              onPress={onPressOtherOrder}
              text="Tạo đơn khác"
            />
          </View>
        </ScreenBottom>
      </Layout.Container>
    </Layout.Screen>
  );
};

export default GenerateBarcodeScreen;
