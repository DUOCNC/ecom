import {bg_search_error} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {ErrorType, Layout, Typography} from 'common-ui';
import CTFLastList from 'components/CTFlatList';
import EmptyState from 'components/CTScreen/EmptyState';
import {AppConfig} from 'config/AppConfig';
import {MainRouteConfig} from 'config/RouteConfig';
import {Metadata} from 'model/base/Metadata';
import {
  OrderFulfillmentLineItemSearchSubDto,
  OrderSearchDto,
} from 'model/dto/OrderService/OrderSearchDto';
import {OrderQuery} from 'model/query/OrderQuery';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FlatList, Keyboard, TouchableOpacity, View} from 'react-native';
import {getOrdersApi} from 'services/OrderService/OrderApi';
import {SearchInput} from 'ui/view/Common';
import {showError} from 'utils/ToastUtils';
import {MainStackScreenProps} from '../../';
import {useAuth} from 'providers/contexts/AuthContext';
import O2OItem from './O2OItem';
import DeliveryDetailPopup, {
  DeliveryDetailPopupRef,
} from './DeliveryDetailPopup';
import orderService from 'services/OrderService/OrderService';
import {OrderSubStatusDto} from 'model/dto/OrderService/OrderDto';
import {PosListStyle} from './style';
import {colors} from 'assets/v2';
import Separator from 'common-ui/components/FlatListItemControl/Separator';

type Props = MainStackScreenProps<'O2OList'>;

const initQuery: OrderQuery = {
  limit: AppConfig.MaxLimit,
  is_online: true,
  channel_codes: 'O2O',
};

type OrderStatus = Partial<OrderSubStatusDto>;

const O2OListScreen: React.FC<Props> = ({navigation}) => {
  const deliveryDetailPopupRef = createRef<DeliveryDetailPopupRef>();
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const {locationSelected} = useAuth();
  const [key, setKey] = useState<string>('');
  const [data, setData] = useState<Array<OrderSearchDto>>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const first = useRef<boolean>(true);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Metadata>({
    page: 1,
    limit: AppConfig.MaxLimit,
    total: 0,
  });
  const [status, setStatus] = useState<Array<OrderStatus>>([
    {
      id: -1,
      subStatus: 'Tất cả',
      code: 'all',
    },
  ]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [firstError, setFirstError] = useState<false | string>(false);
  const onPressOrder = useCallback(
    (id: number, code: string) => {
      navigation.navigate(MainRouteConfig.OrderO2ODetail, {id: id, code: code});
    },
    [navigation],
  );
  const [selectTab, setSelectTab] = useState<OrderStatus>({
    id: -1,
    subStatus: 'Tất cả',
    code: 'all',
  });
  const storeIds = useMemo(() => {
    if (locationSelected.locationId === -1) {
      return undefined;
    }
    return [locationSelected.locationId];
  }, [locationSelected.locationId]);

  const handleError = (errors: Array<string>) => {
    const err = errors[0];
    if (err === 'NotPermission') {
      setErrorType('NotPermission');
      return;
    }
    showError(err);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getOrdersApi(
      {
        ...initQuery,
        page: 1,
        search_term: key,
        store_ids: storeIds,
        sub_status_code: selectTab.code,
      },
      result => {
        setData(result.items);
        setMetadata(result.metadata);
      },
      errors => {
        handleError(errors);
      },
      () => {
        setRefreshing(false);
      },
    );
  };
  const onLoadMore = useCallback(
    (page: number) => {
      setLoadMore(true);
      getOrdersApi(
        {
          ...initQuery,
          page: page,
          search_term: key,
          store_ids: storeIds,
          sub_status_code: selectTab.code,
        },
        result => {
          setData([...data, ...result.items]);
          setMetadata(result.metadata);
        },
        errors => {
          handleError(errors);
        },
        () => {
          setLoadMore(false);
        },
      );
    },
    [data, key, selectTab.code, storeIds],
  );
  const onReload = () => {
    setFirstError(false);
  };

  useEffect(() => {
    if (firstLoad) {
      getOrdersApi(
        {...initQuery, page: 1, store_ids: storeIds},
        result => {
          setData(result.items);
          setMetadata(result.metadata);
        },
        errors => {
          const err = errors[0];
          if (err === 'NotPermission') {
            setErrorType('NotPermission');
            return;
          }
          setFirstError(err);
        },
        () => {
          setFirstLoad(false);
          first.current = false;
        },
      );
    }
  }, [firstLoad, storeIds]);

  useEffect(() => {
    orderService.getSubStatus(res => {
      setStatus(previous => [
        ...previous,
        ...res.map(e => ({
          id: e.id,
          subStatus: e.subStatus,
          code: e.code,
        })),
      ]);
    });
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!first.current) {
      timeout = setTimeout(() => {
        setSearching(true);
        getOrdersApi(
          {
            ...initQuery,
            page: 1,
            search_term: key,
            store_ids: storeIds,
            sub_status_code: selectTab.code,
          },
          result => {
            setData(result.items);
            setMetadata(result.metadata);
          },
          errors => {
            const err = errors[0];
            if (err === 'NotPermission') {
              setErrorType('NotPermission');
              return;
            }
            setFirstError(err);
          },
          () => {
            setSearching(false);
          },
        );
      }, 500);
    }
    return () => {
      timeout !== null && clearTimeout(timeout);
    };
  }, [key, storeIds, selectTab]);

  const handleOpenDetailDelivery = useCallback(
    (fulfillment: OrderFulfillmentLineItemSearchSubDto) => {
      deliveryDetailPopupRef.current?.setFulfillment(fulfillment);
      Keyboard.dismiss();
      deliveryDetailPopupRef.current?.open();
    },
    [deliveryDetailPopupRef],
  );

  const onPressStatus = (selectStatus: OrderStatus) => {
    setSelectTab(selectStatus);
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title="Danh sách đơn O2O"
        error={errorType}
        children={
          <View style={[ThemeStyle.headerSearch]}>
            <SearchInput
              placeholder="ID đơn hàng, tên, sđt KH, mã vận đơn"
              value={key}
              onChangeText={value => setKey(value)}
            />
          </View>
        }
      />
      <Layout.Container>
        <Layout.Error error={errorType}>
          {status && (
            <React.Fragment>
              <FlatList
                style={PosListStyle.statusContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={status}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => onPressStatus(item)}
                      key={index}>
                      <View
                        style={[
                          PosListStyle.statusElement,
                          {
                            borderColor:
                              item.id === selectTab.id
                                ? colors.primary.o500
                                : colors.secondary.o300,
                          },
                        ]}>
                        <Typography
                          textType={
                            item.id === selectTab.id ? 'medium' : 'regular'
                          }
                          text={item.subStatus}
                          color={
                            item.id === selectTab.id
                              ? colors.primary.o500
                              : colors.secondary.o900
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
              <Separator />
            </React.Fragment>
          )}

          <CTFLastList
            searching={searching}
            onReLoad={onReload}
            firstLoading={firstLoad}
            isRefreshing={isRefreshing}
            isLoadMore={isLoadMore}
            style={ThemeStyle.flatList}
            data={data}
            error={firstError}
            onRefresh={onRefresh}
            paging={metadata}
            onLoadMore={onLoadMore}
            keyExtractor={item => item.code}
            keyboardShouldPersistTaps="handled"
            emptyView={
              <EmptyState
                icon={bg_search_error}
                title="Không tìm thấy kết quả"
                subTitle="Có vẻ như bạn đã nhập sai tìm kiếm, vui lòng tìm kiếm với từ khóa khác"
              />
            }
            renderItem={({item, index}) => (
              <O2OItem
                index={index}
                max={data.length}
                onPress={onPressOrder}
                order={item}
                openDetailDelivery={handleOpenDetailDelivery}
              />
            )}
          />
        </Layout.Error>
        <DeliveryDetailPopup ref={deliveryDetailPopupRef} />
      </Layout.Container>
    </Layout.Screen>
  );
};

export default O2OListScreen;
