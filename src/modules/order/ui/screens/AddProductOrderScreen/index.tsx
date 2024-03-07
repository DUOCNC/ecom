import {ic_scan_barcode} from 'assets/images';
import {ErrorType, FlatListItemControl, Layout, SearchInput} from 'common-ui';
import {MainRouteConfig} from 'config/RouteConfig';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Animated,
  RefreshControl,
} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import style from './style';
import {OrderLineEntity, VariantEntity} from 'modules/order/models';
import {ProductItemView} from '../../views';
import {orderService, productService} from 'modules/order/services';
import {showError} from 'utils/ToastUtils';
import {ThemeStyle} from 'assets/theme';
import {useAuth} from 'providers/contexts/AuthContext';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';

type Props = MainStackScreenProps<'AddProductOrder'>;

const {FlatList} = Animated;

const AddProductOrderScreen: React.FC<Props> = ({navigation, route}) => {
  const {link, order} = route.params;
  const [keyword, setKeyword] = useState<string>('');
  const [variants, setVariants] = useState<Array<VariantEntity>>([]);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<ErrorType | false>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const {locationSelected, locations} = useAuth();
  const storeIds = useMemo(() => {
    let temps = locations.map(store => store.id);
    if (locationSelected.locationId !== -1) {
      temps = [locationSelected.locationId];
    }
    return temps;
  }, [locationSelected.locationId, locations]);
  const onRefresh = () => {
    if (refreshing || isLoadMore || loading) {
      return;
    }
    productService.getVariants(
      storeIds,
      {
        page: 1,
        limit: 10,
        info: keyword,
        saleable: true,
      },
      () => setRefreshing(true),
      (rsCustomers, rsPage: number, rsCanLoadMore) => {
        setErrorType(false);
        setVariants(rsCustomers);
        setPage(rsPage);
        setCanLoadMore(rsCanLoadMore);
      },
      (rsCode, rsMsg) => {
        showError(rsMsg);
      },
      () => setRefreshing(false),
    );
  };

  const onLoadMore = () => {
    if (refreshing || isLoadMore || !canLoadMore || loading) {
      return;
    }
    productService.getVariants(
      storeIds,
      {
        page: page + 1,
        limit: 10,
        info: keyword,
        saleable: true,
      },
      () => setLoadMore(true),
      (rsCustomers, rsPage: number, rsCanLoadMore) => {
        setErrorType(false);
        setVariants([...variants, ...rsCustomers]);
        setPage(rsPage);
        setCanLoadMore(rsCanLoadMore);
      },
      (rsCode, rsMsg) => {
        showError(rsMsg);
      },
      () => setLoadMore(false),
    );
  };
  const onProductBarcodePress = () => {
    navigation.navigate(MainRouteConfig.OrderBarcodeScan, {
      type: 'variant',
      link: MainRouteConfig.PosCreate,
      order: order,
    });
  };
  useEffect(() => {
    let timeOut = setTimeout(() => {
      productService.getVariants(
        storeIds,
        {
          page: 1,
          limit: 10,
          info: keyword,
          saleable: true,
        },
        () => setLoading(true),
        (rsCustomers, rsPage: number, rsCanLoadMore) => {
          setErrorType(false);
          setVariants(rsCustomers);
          setPage(rsPage);
          setCanLoadMore(rsCanLoadMore);
        },
        (rsCode, rsMsg) => {
          setErrorType(rsCode);
          setErrorMsg(rsMsg);
        },
        () => setLoading(false),
      );
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [keyword, storeIds]);

  const logAction = () => {
    orderService.logOrderAction(
      {
        function: FunctionLog.ADD_PRODUCT_TO_ORDER,
        screen: ScreenLog.POS_CREATE_SCREEN,
        action: ActionLog.ADD,
        storeId: locationSelected.locationId,
        storeName: locationSelected.locationName,
      },
      () => {},
      () => {},
    );
  };
  const handlePickProduct = (variant: VariantEntity) => {
    logAction();
    let lineItem = OrderLineEntity.create(variant);
    if (!lineItem.getSellableInventory(order)) {
      showError('Không còn hàng trong kho');
      return;
    }
    if (!lineItem) {
      return;
    }
    navigation.navigate(MainRouteConfig.PosCreate, {
      lineItem: {item: lineItem, index: 0, isNew: true},
    });
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Chọn sản phẩm">
        <View style={style.formSearch}>
          <SearchInput
            autoFocus
            value={keyword}
            onValueChange={txt => setKeyword(txt)}
            placeholder="Tìm và thêm sản phẩm"
            right={
              <TouchableOpacity
                style={style.button}
                onPress={onProductBarcodePress}>
                <Image source={ic_scan_barcode} />
              </TouchableOpacity>
            }
          />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.Container>
        <Layout.Loading position="top" loading={loading}>
          <Layout.Error error={errorType} subTitle={errorMsg}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              bounces={true}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.getKey()}
              data={variants}
              onEndReachedThreshold={0.8}
              onEndReached={onLoadMore}
              ItemSeparatorComponent={() => (
                <View style={ThemeStyle.separator16} />
              )}
              ListFooterComponent={
                <FlatListItemControl.LoadMore isLoadMore={isLoadMore} />
              }
              renderItem={({item}) => (
                <ProductItemView variant={item} onPress={handlePickProduct} />
              )}
            />
          </Layout.Error>
        </Layout.Loading>
      </Layout.Container>
    </Layout.Screen>
  );
};

export default AddProductOrderScreen;
