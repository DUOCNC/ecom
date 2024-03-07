import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {DimentionUtils, Layout, StatusBar, Typography} from 'common-ui';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import style from './style';
import {ic_pos} from 'assets/images';
import {colors} from 'assets/v2';
import {useAppDispatch, useConfig} from 'hook';
import {channelService, orderService} from 'modules/order/services';
import {ChannelEntity} from 'modules/order/models';
import {ChannelView} from '../../views';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {useAuth} from 'providers/contexts/AuthContext';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {StringUtils} from 'common';
import {useStoreFeatureHook} from 'hook/useStoreFeatureHook';
import logService from 'modules/personalize/services/LogService';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';

type Props = MainStackScreenProps<'Main'>;

const TabOrder: React.FC<Props> = ({navigation}) => {
  const isFocus = useIsFocused();
  const [channels, setChannels] = useState<Array<ChannelEntity>>([]);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const top = useSafeAreaInsets().top;
  const config = useConfig();
  const {locationSelected} = useAuth();
  const dispatch = useAppDispatch();
  const useYoScan = useStoreFeatureHook('storeUseYoscan');

  const onOkModal = useCallback(() => {
    dispatch(hideModal());
    logService.saveLog({
      function: FunctionLog.ADD_YOSCAN_ORDER,
      screen: ScreenLog.ORDER_SCREEN,
      action: ActionLog.CLICK,
      storeId: locationSelected.locationId,
      storeName: locationSelected.locationName,
    });
    navigation.navigate(MainRouteConfig.AccountStore, {
      link: MainRouteConfig.PosCreate,
      requireStoreId: true,
    });
  }, [dispatch, locationSelected, navigation]);

  const okChooseStore = useCallback(() => {
    setConfirmed(true);
    dispatch(hideModal());
    if (!useYoScan) {
      navigation.navigate(MainRouteConfig.Feature);
      return;
    }
    logService.saveLog({
      function: FunctionLog.ADD_YOSCAN_ORDER,
      screen: ScreenLog.ORDER_SCREEN,
      action: ActionLog.CLICK,
      storeId: locationSelected.locationId,
      storeName: locationSelected.locationName,
    });
    navigation.navigate(MainRouteConfig.PosCreate);
  }, [dispatch, locationSelected, navigation, useYoScan]);

  const confirmStore = useCallback(() => {
    if (!confirmed) {
      dispatch(
        showConfirm({
          title: 'Xác nhận tạo đơn',
          okText: 'Xác nhận',
          cancelText: 'Hủy',
          message: (
            <View style={style.messageConfirm}>
              <Typography text="Bạn tạo đơn hàng cho cửa hàng " />
              <Typography
                style={style.storeName}
                text={StringUtils.format('{0}?', locationSelected.locationName)}
                textType="medium"
              />
            </View>
          ),
          buttonType: 'default',
          cancelButtonType: 'destruction',
          onOk: okChooseStore,
        }),
      );
      return;
    }
    logService.saveLog({
      function: FunctionLog.ADD_YOSCAN_ORDER,
      screen: ScreenLog.ORDER_SCREEN,
      action: ActionLog.CLICK,
      storeId: locationSelected.locationId,
      storeName: locationSelected.locationName,
    });
    navigation.navigate(MainRouteConfig.PosCreate);
  }, [confirmed, dispatch, locationSelected, navigation, okChooseStore]);

  const warningStore = useCallback(() => {
    dispatch(
      showConfirm({
        title: 'Vui lòng chọn cửa hàng',
        okText: 'Xác nhận',
        cancelText: 'Đóng',
        message: 'Bạn cần chọn cửa hàng mặc định cụ thể để tạo đơn',
        buttonType: 'default',
        cancelButtonType: 'destruction',
        onOk: () => onOkModal(),
      }),
    );
  }, [dispatch, onOkModal]);

  const onPressPos = () => {
    if (locationSelected.locationId === -1) {
      warningStore();
      return;
    }
    confirmStore();
  };

  useEffect(() => {
    setChannels(channelService.getChannels(config.hideFeatureFunction));
  }, [config.hideFeatureFunction]);
  useEffect(() => {
    orderService.getOrderConfig();
  }, []);
  return (
    <Layout.Container>
      {isFocus && <StatusBar barStyle="dark-content" />}
      <View
        style={[
          {
            paddingTop: top,
            height: DimentionUtils.scale(44) + top,
          },
          style.header,
        ]}>
        <Typography text="Đơn hàng" type="h3" textType="medium" />
      </View>
      <Layout.Container>
        <ScrollView
          contentContainerStyle={style.contentContainer}
          style={style.container}>
          <View style={style.viewCreate}>
            <TouchableOpacity onPress={onPressPos} style={[style.btnCreate]}>
              <Image style={style.imgCreate} source={ic_pos} />
              <Typography
                type="h3"
                color={colors.primary.o500}
                textType="medium"
                text="Tạo đơn Yoscan"
              />
            </TouchableOpacity>
          </View>
          {channels.map(channel => (
            <ChannelView
              onConfirm={() => setConfirmed(true)}
              confirmed={confirmed}
              key={channel.getKey()}
              channel={channel}
            />
          ))}
        </ScrollView>
      </Layout.Container>
    </Layout.Container>
  );
};

export default TabOrder;
