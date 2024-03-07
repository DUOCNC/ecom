import {colors} from 'assets/v2';
import {FlatListItemControl, Layout, SearchInput} from 'common-ui';
import {useAppDispatch} from 'hook';
import {homeService} from 'modules/personalize/services';
import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Keyboard,
  Platform,
  BackHandler,
  Animated,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StoreItemView} from '../../views';
import style from './style';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {showConfirm, hideModal} from 'reduxs/Modals/ModalReducer';
import {StringUtils} from 'common';
import {useAuth} from 'providers/contexts/AuthContext';
import {Location, LocationSelectedProvider} from 'model/providers';
import {MainRouteConfig} from 'config/RouteConfig';
import logService from 'modules/personalize/services/LogService';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';

const {FlatList} = Animated;

type Props = MainStackScreenProps<'AccountStore'>;

const AccountStoreScreen: React.FC<Props> = ({navigation, route}) => {
  const params = route.params;
  const dispatch = useAppDispatch();
  const {locationSelected, locations, setLocationSelected} = useAuth();
  const [locationFilter, setLocationFilter] = useState<Array<Location>>([]);
  const [keyword, setKeyword] = useState<string>('');
  const onSelectStore = useCallback(
    (locationSelectedProvider: LocationSelectedProvider) => {
      setLocationSelected(locationSelectedProvider);
      setTimeout(() => {
        //bổ sung timeout do phát sinh lỗi chưa gán được store đã replace
        if (params && params.link) {
          if (params.link === MainRouteConfig.PosCreate) {
            let screen = ScreenLog.HOMEPAGE_ORDER_SCREEN;
            let func = FunctionLog.ADD_YOSCAN_ORDER_HOMEPAGE;
            if (params.screenFrom === MainRouteConfig.DetailCustomer) {
              screen = ScreenLog.CUSTOMER_DETAIL_SCREEN;
              func = FunctionLog.ADD_YOSCAN_FROM_360;
            }
            logService.saveLog({
              function: func,
              screen: screen,
              action: ActionLog.ADD,
              storeId: locationSelectedProvider.locationId,
              storeName: locationSelectedProvider.locationName,
            });
          }
          navigation.replace(params.link);
          return;
        }
        navigation.goBack();
      }, 300);
    },
    [navigation, params, setLocationSelected],
  );
  const onOk = useCallback(
    (newLocationSelected: LocationSelectedProvider) => {
      dispatch(hideModal());
      onSelectStore(newLocationSelected);
    },
    [dispatch, onSelectStore],
  );

  const onSelect = useCallback(
    (locationSelect: Location) => {
      Keyboard.dismiss();
      dispatch(
        showConfirm({
          buttonType: 'default',
          cancelButtonType: 'destruction',
          message: StringUtils.format(
            'Chọn cửa hàng mặc định là {0}. Xác nhận chọn?',
            locationSelect.name,
          ),
          onOk: () => {
            let newStoreActive: LocationSelectedProvider =
              LocationSelectedProvider.create(locationSelect);
            onOk(newStoreActive);
          },
        }),
      );
    },
    [dispatch, onOk],
  );

  const onBackPress = useCallback(() => {
    if (locationSelected.selected) {
      navigation.goBack();
      return;
    }
    dispatch(
      showConfirm({
        buttonType: 'default',
        cancelButtonType: 'destruction',
        message:
          'Nếu quay lại, cửa hàng mặc định của bạn là tất cả cửa hàng. Xác nhận thoát',
        onOk: () => {
          let newStoreActive = LocationSelectedProvider.createSelectedAll();
          onOk(newStoreActive);
        },
      }),
    );
  }, [dispatch, locationSelected.selected, navigation, onOk]);

  useEffect(() => {
    const event = BackHandler.addEventListener('hardwareBackPress', () => {
      onBackPress();
      return true;
    });
    return () => event.remove();
  }, [onBackPress]);
  const {bottom} = useSafeAreaInsets();
  useEffect(() => {
    let requireStoreId = false;
    if (params && params.requireStoreId) {
      requireStoreId = params.requireStoreId;
    }
    setLocationFilter(
      homeService.getStoreEntities(locations, keyword, requireStoreId),
    );
  }, [keyword, locations, params]);
  return (
    <Layout.Screen barStyle="dark-content">
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.container}>
        <Layout.ScreenHeaderBack
          onBackPress={onBackPress}
          title="Chọn cửa hàng mặc định">
          <View style={style.viewSearch}>
            <SearchInput
              value={keyword}
              onValueChange={txt => {
                setKeyword(txt);
              }}
              placeholder="Tìm kiếm cửa hàng"
              themeStyle="dark"
            />
          </View>
        </Layout.ScreenHeaderBack>
        <Layout.SafeAreaContainer
          backgroundColor={colors.base.white}
          edges={['bottom', 'left', 'right']}>
          <FlatList
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            data={locationFilter}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
            renderItem={({item}) => (
              <StoreItemView
                locationSelected={locationSelected}
                onSelect={onSelect}
                location={item}
              />
            )}
          />
        </Layout.SafeAreaContainer>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default AccountStoreScreen;
