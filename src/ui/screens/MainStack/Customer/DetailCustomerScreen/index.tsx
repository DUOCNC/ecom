import React, {useCallback, useMemo} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabInfoCustomer from './TabInfoCustomer';
import TabHistoryCustomer from './TabHistoryCustomer';
import {DetailCustomerStyle, style} from './style';
import {Colors} from 'assets/colors';
import {ThemeStyle} from 'assets/theme';
import {MainStackScreenProps} from '../..';
import {ParamListBase} from '@react-navigation/native';
import {normalize} from 'utils/DimensionsUtils';
import TabHistoryActionCustomer from './TabHistoryActionCustomer';
import TabCharacteristic from './TabCharacteristic';
import {Layout} from 'common-ui';
import {View} from 'react-native';
import {CTButton} from 'components/Button';
import {Font} from 'components/Base/Text';
import {MainRouteConfig} from 'config/RouteConfig';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {useAppDispatch} from 'hook';
import {useAuth} from 'providers/contexts/AuthContext';
import ScreenBottom from 'common-ui/components/Layout/ScreenBottom';
import logService from 'modules/personalize/services/LogService';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';

export interface TabDetailCustomerParams extends ParamListBase {
  Profile: {customerId: number} | undefined;
  Characteristic: {id: number} | undefined;
  History: {id: number} | undefined;
  HistoryAction: {id: number} | undefined;
}

const Tab = createMaterialTopTabNavigator<TabDetailCustomerParams>();
type Props = MainStackScreenProps<'DetailCustomer'>;

const DetailCustomerScreen: React.FC<Props> = ({navigation, route}) => {
  const {id, action} = route.params;
  const dispatch = useAppDispatch();
  const {locationSelected} = useAuth();

  const onOkModal = useCallback(() => {
    dispatch(hideModal());
    navigation.navigate(MainRouteConfig.AccountStore, {
      link: MainRouteConfig.PosCreate,
      requireStoreId: true,
      screenFrom: MainRouteConfig.DetailCustomer,
    });
  }, [dispatch, navigation]);

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

  const bottomAction = useMemo(() => {
    if (action === 'edit') {
      return (
        <CTButton
          onPress={() => {
            navigation.goBack();
          }}
          text="Tiếp tục lên đơn"
          font={Font.Medium}
        />
      );
    }
    return (
      <CTButton
        onPress={() => {
          if (locationSelected.locationId === -1) {
            warningStore();
            return;
          }
          logService.saveLog({
            function: FunctionLog.ADD_YOSCAN_FROM_360,
            screen: ScreenLog.CUSTOMER_DETAIL_SCREEN,
            action: ActionLog.ADD,
            storeId: locationSelected.locationId,
            storeName: locationSelected.locationName,
          });
          navigation.replace(MainRouteConfig.PosCreate, {customerId: id});
        }}
        text="Tạo đơn Yoscan"
        font={Font.Medium}
      />
    );
  }, [action, id, locationSelected, navigation, warningStore]);
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Khách hàng 360" />
      <Layout.SafeAreaContainer edges={['bottom']}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: DetailCustomerStyle.label,
            tabBarActiveTintColor: Colors.Primary,
            tabBarInactiveTintColor: Colors.SubText,
            tabBarStyle: {height: normalize(44), ...ThemeStyle.shadowHeader},
            tabBarScrollEnabled: true,
          }}>
          <Tab.Screen
            name="Profile"
            navigationKey="Profile"
            initialParams={{customerId: id}}
            options={{
              title: 'Thông tin cơ bản',
            }}
            component={TabInfoCustomer}
          />
          <Tab.Screen
            navigationKey="Characteristic"
            options={{
              title: 'Đặc điểm mua hàng',
              tabBarLabelStyle: DetailCustomerStyle.label,
            }}
            name="Characteristic"
            initialParams={{id: id}}
            component={TabCharacteristic}
          />
          <Tab.Screen
            navigationKey="History"
            options={{
              title: 'Lịch sử mua hàng',
            }}
            name="History"
            initialParams={{id: id}}
            component={TabHistoryCustomer}
          />
          <Tab.Screen
            navigationKey="HistoryAction"
            options={{
              title: 'Lịch sử tương tác',
            }}
            name="HistoryAction"
            initialParams={{id: id}}
            component={TabHistoryActionCustomer}
          />
        </Tab.Navigator>
        <ScreenBottom>
          <View style={style.viewBottom}>{bottomAction}</View>
        </ScreenBottom>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default DetailCustomerScreen;
