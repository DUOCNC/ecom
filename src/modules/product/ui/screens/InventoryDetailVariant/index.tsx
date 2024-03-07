import React, {createRef, useEffect, useMemo, useState} from 'react';
import {ErrorType, ErrorView, Layout, SearchInput, Typography} from 'common-ui';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {View, TouchableOpacity, Image, FlatList, Keyboard} from 'react-native';
import style from './style';
import {colors} from 'assets/v2';
import {
  InventoryDetailStoreView,
  InventoryStoreItemView,
} from 'modules/product/ui/views';
import {bg_can_find_store, ic_arrow, ic_location} from 'assets/images';
import {Colors} from 'assets/colors';
import {StoreEntity} from 'modules/product/models';
import {inventoryService} from 'modules/product/services';
import StringUtils from 'utils/StringUtils';
import {MainRouteConfig} from 'config/RouteConfig';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {InventoryDetailPopupRef} from '../../views/InventoryDetailStoreView';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'InventoryDetailVariant'>;
const InventoryDetailVariant: React.FC<Props> = ({navigation, route}) => {
  const inventoryDetailPopupRef = createRef<InventoryDetailPopupRef>();
  let {city, cityId} = route.params;
  const [errorType, setErrorType] = useState<ErrorType | false>(false);
  const [storesInventory, setStoreInventory] = useState<StoreEntity[]>([]);
  const [variantId, setVariantId] = useState<number>(-1);
  const [keySearch, setKeySearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {allLocations} = useAuth();
  const bottom = useSafeAreaInsets().bottom;
  const resultSearch = useMemo(() => {
    if (keySearch === '') {
      return storesInventory;
    }
    return storesInventory.filter(storeEntity => {
      let nameStore = String(storeEntity.getName());
      return StringUtils.fullTextSearch(keySearch, nameStore);
    });
  }, [keySearch, storesInventory]);

  const onSelectCity = () => {
    navigation.navigate(MainRouteConfig.Cities, {
      returnLink: MainRouteConfig.InventoryDetailVariant,
      countryId: 233,
      cityId: cityId,
    });
  };
  useEffect(() => {
    if (route.params.variantId) {
      setVariantId(route.params.variantId);
    }
  }, [route.params.variantId]);
  useEffect(() => {
    if (variantId === -1) {
      return;
    }
    inventoryService.searchWithCity(
      cityId,
      variantId,
      allLocations,
      result => {
        setStoreInventory(result);
      },
      () => setLoading(true),
      code => setErrorType(code),
      () => setLoading(false),
    );
  }, [allLocations, variantId, cityId]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Tồn toàn hệ thống">
        <View style={style.formSearch}>
          <SearchInput
            value={keySearch}
            onValueChange={v => setKeySearch(v)}
            placeholder="Tìm kiếm cửa hàng"
          />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.Container backgroundColor={colors.base.white}>
        <TouchableOpacity onPress={onSelectCity} style={style.btn}>
          <Image source={ic_location} />
          <Typography
            numberOfLines={1}
            ellipsizeMode="tail"
            text={city ? city : 'Chọn khu vực tìm kiếm'}
            textType="medium"
            color={colors.primary.o500}
            type="h3"
            style={style.inputDisplay}
          />
          <Image source={ic_arrow} style={{tintColor: Colors.Blue}} />
        </TouchableOpacity>

        <View style={style.border} />
        <Layout.Loading position="top" loading={loading}>
          <Layout.Error error={errorType}>
            {resultSearch.length === 0 ? (
              <View>
                <ErrorView
                  image={bg_can_find_store}
                  title="Không tìm thấy cửa hàng"
                  subTitle={
                    keySearch.trim().length > 0
                      ? 'Có vẻ như bạn đã nhập sai tìm kiếm, vui lòng tìm kiếm với từ khóa khác'
                      : 'Sản phẩm đang xem hiện tại không còn tồn trên toàn hệ thống'
                  }
                />
              </View>
            ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={[
                  style.container,
                  {paddingBottom: bottom},
                ]}
                data={resultSearch}
                renderItem={({item}) => {
                  return (
                    <InventoryStoreItemView
                      key={item.getId()}
                      onPress={() => {
                        Keyboard.dismiss();
                        inventoryDetailPopupRef.current?.setStore(item);
                        inventoryDetailPopupRef.current?.open();
                      }}
                      storeInventoryEntity={item}
                    />
                  );
                }}
              />
            )}
          </Layout.Error>
        </Layout.Loading>
        <InventoryDetailStoreView ref={inventoryDetailPopupRef} />
      </Layout.Container>
    </Layout.Screen>
  );
};

export default InventoryDetailVariant;
