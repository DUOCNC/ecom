import React, {useCallback, useEffect, useRef, useState} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {Colors} from 'assets/colors';
import AppModal from './modals';
import FlashMessage from 'react-native-flash-message';
import style from './style';
import analytics from '@react-native-firebase/analytics';
import AppStack from './AppStack';
import {Platform, View} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {deviceService} from 'services';
import {useAppDispatch, useAppSelector} from 'hook';
import {ErrorType, Layout, Typography} from 'common-ui';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {colors} from 'assets/v2';

const MainUi: React.FC = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>();
  const onNetworkConnectListener = useCallback((state: NetInfoState) => {
    deviceService.handleNetwork(state);
  }, []);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(onNetworkConnectListener);
    return () => {
      unsubscribe();
    };
  }, [onNetworkConnectListener]);
  const isConnected = useAppSelector(state => state.network.isConnected);
  useEffect(() => {
    if (!firstLoad) {
      setTimeout(() => {
        checkInternet();
      }, 100);
    } else {
      checkInternet();
    }
  }, [firstLoad, isConnected]);

  const checkInternet = () => {
    if (!firstLoad && !isConnected) {
      // Nếu load lần đầu tiên và mất kết nối firstLoad=F isConnect=F
      setFirstLoad(true);
      setErrorType('LostInternet');
    } else if (firstLoad && !isConnected) {
      // Nếu load lần 2 và mất kết nối firstLoad=T isConnect=F
      dispatch(
        showConfirm({
          title: 'Không có internet!',
          message: (
            <View style={style.messageContainer}>
              <Typography
                color={colors.secondary.o500}
                text={'Bạn vui lòng kiểm tra lại kết nối Wi-Fi '}
              />
              <Typography color={colors.secondary.o500} text={'hoặc 3G/4G.'} />
            </View>
          ),
          okText: (
            <Typography
              textType="medium"
              color={colors.primary.o700}
              text={'Thử lại'}
            />
          ),
          isDisableCancelButton: true,
          onOk: () => {
            dispatch(hideModal());
          },
        }),
      );
    }
    if (isConnected) {
      setErrorType(false);
      dispatch(hideModal());
    }
  };
  return (
    <SafeAreaProvider>
      <Layout.Error error={errorType} onReload={checkInternet}>
        <BottomSheetModalProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef.getCurrentRoute()?.name;
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              if (navigationRef.current) {
                const currentRouteName =
                  navigationRef.current.getCurrentRoute()?.name;
                if (previousRouteName !== currentRouteName) {
                  await analytics().logScreenView({
                    screen_name: currentRouteName,
                    screen_class: currentRouteName,
                  });
                }
                // Save the current route name for later comparison
                routeNameRef.current = currentRouteName;
              }
            }}
            theme={{
              colors: {
                primary: Colors.Primary,
                background: Colors.Background,
                border: Colors.Border,
                text: Colors.TextPrimary,
                notification: Colors.White,
                card: Colors.White,
              },
              dark: false,
            }}>
            <AppStack />
          </NavigationContainer>
          <AppModal />
          <FlashMessage
            position={'top'}
            autoHide
            statusBarHeight={Platform.OS === 'android' ? 30 : undefined}
            titleStyle={style.Flash}
            duration={1500}
          />
        </BottomSheetModalProvider>
      </Layout.Error>
    </SafeAreaProvider>
  );
};

export default MainUi;
