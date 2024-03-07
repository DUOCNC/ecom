import {colors} from 'assets/v2';
import {Typography} from 'common-ui';
import {ChannelDetailEntity, ChannelEntity} from 'modules/order/models';
import {channelService} from 'modules/order/services';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {useAppDispatch, useConfig} from 'hook';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {MainRouteConfig} from 'config/RouteConfig';
import {StringUtils} from 'common';
import {useAuth} from 'providers/contexts/AuthContext';
import {useStoreFeatureHook} from 'hook/useStoreFeatureHook';
import logService from 'modules/personalize/services/LogService';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';

interface ChannelProps {
  channel: ChannelEntity;
  confirmed: boolean;
  onConfirm: () => void;
}

const ChannelView: React.FC<ChannelProps> = ({
  channel,
  confirmed,
  onConfirm,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [channelActions, setChannelActions] = useState<
    Array<ChannelDetailEntity>
  >([]);
  const config = useConfig();
  const {locationSelected} = useAuth();
  const useYoScan = useStoreFeatureHook('storeUseYoscan');
  const onOkModal = useCallback(
    (link: string) => {
      dispatch(hideModal());
      logService.saveLog({
        function: FunctionLog.ADD_YOSCAN_ORDER,
        screen: ScreenLog.ORDER_SCREEN,
        action: ActionLog.CLICK,
        storeId: locationSelected.locationId,
        storeName: locationSelected.locationName,
      });
      navigation.navigate(MainRouteConfig.AccountStore, {
        link: link,
        requireStoreId: true,
      });
    },
    [dispatch, locationSelected, navigation],
  );
  const warningStore = useCallback(
    (link: string) => {
      dispatch(
        showConfirm({
          title: 'Vui lòng chọn cửa hàng',
          okText: 'Xác nhận',
          cancelText: 'Đóng',
          message: 'Bạn cần chọn cửa hàng mặc định cụ thể để tạo đơn',
          buttonType: 'default',
          cancelButtonType: 'destruction',
          onOk: () => onOkModal(link),
        }),
      );
    },
    [dispatch, onOkModal],
  );

  const confirmStore = useCallback(
    (link: string) => {
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
                  text={StringUtils.format(
                    '{0}?',
                    locationSelected.locationName,
                  )}
                  textType="medium"
                />
              </View>
            ),
            buttonType: 'default',
            cancelButtonType: 'destruction',
            onOk: () => {
              dispatch(hideModal());
              onConfirm();
              logService.saveLog({
                function: FunctionLog.ADD_YOSCAN_ORDER,
                screen: ScreenLog.ORDER_SCREEN,
                action: ActionLog.CLICK,
                storeId: locationSelected.locationId,
                storeName: locationSelected.locationName,
              });
              navigation.navigate(link);
            },
          }),
        );
        return;
      }
      if (link === MainRouteConfig.PosCreate) {
        logService.saveLog({
          function: FunctionLog.ADD_YOSCAN_ORDER,
          screen: ScreenLog.ORDER_SCREEN,
          action: ActionLog.CLICK,
          storeId: locationSelected.locationId,
          storeName: locationSelected.locationName,
        });
      }
      navigation.navigate(link);
    },
    [confirmed, dispatch, navigation, onConfirm, locationSelected],
  );
  const onFunctionPress = useCallback(
    (channelAction: ChannelDetailEntity) => {
      if (channelAction.isFeature()) {
        navigation.navigate(MainRouteConfig.Feature);
        return;
      }
      if (
        channelAction.isRequireStore() &&
        locationSelected.locationId === -1
      ) {
        warningStore(channelAction.getLink());
        return;
      }
      if (channelAction.isConfirm()) {
        confirmStore(channelAction.getLink());
        return;
      }
      if (channelAction.getLink() === MainRouteConfig.PosCreate) {
        logService.saveLog({
          function: FunctionLog.ADD_YOSCAN_ORDER,
          screen: ScreenLog.ORDER_SCREEN,
          action: ActionLog.CLICK,
          storeId: locationSelected.locationId,
          storeName: locationSelected.locationName,
        });
      }
      navigation.navigate(channelAction.getLink());
    },
    [locationSelected, navigation, warningStore, confirmStore],
  );
  useEffect(() => {
    let actions = channelService.getChannelDetail(
      channel.getId(),
      config.hideFeatureFunction,
    );

    actions = actions.filter(e => {
      if (e.getLink() === MainRouteConfig.PosCreate) {
        if (!useYoScan) {
          e.setFeature(true);
        } else {
          e.setFeature(false);
        }
      }
      return e;
    });
    setChannelActions(actions);
  }, [channel, config.hideFeatureFunction, useYoScan]);
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image source={channel.getIcon()} />
        <Typography
          style={style.txtHeader}
          type="h3"
          textType="medium"
          color={colors.primary.o500}
          text={channel.getName()}
        />
      </View>
      <View style={style.body}>
        {channelActions.map((channelAction, index) => (
          <TouchableOpacity
            onPress={() => onFunctionPress(channelAction)}
            style={[
              style.btn,
              index !== channelActions.length - 1 && style.btnBorder,
            ]}
            key={channelAction.getKey()}>
            <Typography type="h3" text={channelAction.getName()} />
            {channelAction.getCode() === 'listYoscan' && (
              <View style={style.newFeature}>
                <Typography type="h5" text="New" color={colors.success.o500} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ChannelView;
