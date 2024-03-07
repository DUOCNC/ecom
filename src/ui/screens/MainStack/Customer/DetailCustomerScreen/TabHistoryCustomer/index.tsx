import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {bg_search_error} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import CTFLastList from 'components/CTFlatList';
import CTLayout from 'components/CTLayout';
import EmptyState from 'components/CTScreen/EmptyState';
import {MainRouteConfig} from 'config/RouteConfig';
import {Metadata} from 'model/base/Metadata';
import {OrderHistoryDto} from 'model/dto/OrderService/OrderHistoryDto';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {getOrderHistoriesApi} from 'services/OrderService/OrderApi';
import SearchInput from 'ui/view/Common/SearchInput';
import {OrderHistoryItem} from 'ui/view/CustomerComponent';
import {TabDetailCustomerParams} from '..';
import {TabHistoryStyle} from './style';
import {colors} from 'assets/v2';
import {Typography} from 'common-ui';
import {getCustomerApi} from 'services/CustomerService/CustomerApi';
import {DetailCustomerDto} from 'model/dto/CustomerService/DetailCustomerDto';
import MapCustomerToViewer from 'domain/viewer/MapCustomerToViewer';

type Props = MaterialTopTabScreenProps<TabDetailCustomerParams, 'History'>;

const TabHistoryCustomer: React.FC<Props> = ({route, navigation}: Props) => {
  const id = route.params?.id;
  const [keySearch, setKeySearch] = useState<string>('');
  const [empty, setEmpty] = useState<boolean>(false);
  const firstLoad = useRef<boolean>(true);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstError, setFirstError] = useState<false | string>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [orderHistories, setOrderHistories] = useState<Array<OrderHistoryDto>>(
    [],
  );
  const [metadata, setMetadata] = useState<Metadata | false>(false);
  const [customer, setCustomer] = useState<DetailCustomerDto | null>(null);
  const onReload = () => {
    setFirstLoading(true);
  };
  const onRefresh = useCallback(() => {
    if (id) {
      setRefreshing(true);
      getOrderHistoriesApi(
        {limit: 10, page: 1, customer_ids: id, search_term: keySearch},
        result => {
          setOrderHistories(result.items);
          setMetadata(result.metadata);
        },
        errors => {
          setFirstError(errors[0]);
        },
        () => {
          setRefreshing(false);
          firstLoad.current = false;
        },
      );
    }
  }, [id, keySearch]);
  const onLoadMore = useCallback(
    (nextPage: number) => {
      if (id) {
        setLoadMore(true);
        getOrderHistoriesApi(
          {limit: 10, page: nextPage, customer_ids: id},
          result => {
            setOrderHistories([...orderHistories, ...result.items]);
            setMetadata(result.metadata);
          },
          errors => {
            setFirstError(errors[0]);
          },
          () => {
            setLoadMore(false);
          },
        );
      }
    },
    [id, orderHistories],
  );

  const onPressItem = (isReturn: boolean, tempId: number, code: string) => {
    const router = isReturn
      ? MainRouteConfig.OrderReturnDetail
      : MainRouteConfig.OrderDetail;
    navigation.navigate(router, {id: tempId, code: code});
  };

  useEffect(() => {
    if (id && firstLoading) {
      getCustomerApi(
        id,
        detail => {
          setCustomer(detail);
        },
        () => {},
        () => {
          setFirstLoading(false);
        },
      );
    }
    return () => {};
  }, [id, firstLoading]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!firstLoad.current) {
      timeout = setTimeout(() => {
        if (id && !firstLoad.current) {
          setLoading(true);
          getOrderHistoriesApi(
            {limit: 10, page: 1, customer_ids: id, search_term: keySearch},
            result => {
              setOrderHistories(result.items);
              setMetadata(result.metadata);
            },
            errors => {
              setFirstError(errors[0]);
            },
            () => {
              setLoading(false);
            },
          );
        }
      }, 500);
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [id, keySearch]);

  let customerViewer = MapCustomerToViewer(customer);
  const viewHeader = useMemo(() => {
    if (orderHistories.length > 0 || empty === false) {
      return (
        <View>
          <View style={TabHistoryStyle.headerSearch}>
            <SearchInput
              placeholder="Tìm kiếm đơn hàng"
              value={keySearch}
              onChangeText={v => setKeySearch(v)}
              style={{backgroundColor: colors.base.white}}
            />
          </View>
          {customerViewer && (
            <React.Fragment>
              <View style={TabHistoryStyle.summary}>
                <View style={TabHistoryStyle.summaryRow}>
                  <Typography
                    text="Tổng số đơn hàng"
                    color={colors.secondary.o500}
                  />
                  <Typography
                    text={customerViewer.totalFinishedOrder}
                    color={colors.secondary.o900}
                    textType="medium"
                  />
                </View>
                <View style={TabHistoryStyle.summaryRow}>
                  <Typography
                    text="Giá trị trung bình đơn"
                    color={colors.secondary.o500}
                  />
                  <Typography
                    text={customerViewer.averageOrderValue}
                    color={colors.secondary.o900}
                    textType="medium"
                  />
                </View>
                <View style={TabHistoryStyle.summaryRow}>
                  <Typography
                    text="Tổng giá trị đơn hàng"
                    color={colors.secondary.o500}
                  />
                  <Typography
                    text={customerViewer.totalPaidAmount}
                    color={colors.secondary.o900}
                    textType="medium"
                  />
                </View>
              </View>
            </React.Fragment>
          )}
        </View>
      );
    }
    return null;
  }, [customerViewer, empty, keySearch, orderHistories.length]);

  useEffect(() => {
    if (id && firstLoading) {
      getOrderHistoriesApi(
        {limit: 10, page: 1, customer_ids: id},
        result => {
          if (result.items.length === 0) {
            setEmpty(true);
            return;
          }
          setOrderHistories(result.items);
          setMetadata(result.metadata);
        },
        errors => {
          setFirstError(errors[0]);
        },
        () => {
          setFirstLoading(false);
          firstLoad.current = false;
        },
      );
    }
  }, [firstLoading, id]);

  return (
    <CTLayout.Body>
      <View style={TabHistoryStyle.body}>
        {viewHeader}
        <View style={TabHistoryStyle.container}>
          <Typography
            text="ĐƠN HÀNG"
            textType="medium"
            style={TabHistoryStyle.textGroup}
          />
          <CTFLastList
            firstLoading={firstLoading}
            onRefresh={onRefresh}
            paging={metadata}
            data={orderHistories}
            isRefreshing={isRefreshing}
            onLoadMore={onLoadMore}
            onReLoad={onReload}
            error={firstError}
            searching={loading}
            emptyView={
              <EmptyState
                icon={bg_search_error}
                title={
                  empty ? 'Khách hàng chưa mua hàng' : 'Không tìm thấy đơn hàng'
                }
                subTitle={
                  empty
                    ? 'Khách hàng chưa mua sản phẩm nào của Yody. Tạo đơn mua hàng cho khách ngay'
                    : 'Có vẻ như bạn đã nhập sai tìm kiếm, vui lòng tìm kiếm với từ khóa khác'
                }
                // other={
                //   empty && (
                //     <CTButton
                //       onPress={onNavigatePos}
                //       style={TabHistoryStyle.btnEmpty}
                //       text="Tạo đơn"
                //     />
                //   )
                // }
              />
            }
            isLoadMore={isLoadMore}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <OrderHistoryItem onPress={onPressItem} data={item} />
            )}
            ItemSeparatorComponent={() => (
              <View style={ThemeStyle.separator24} />
            )}
          />
        </View>
      </View>
    </CTLayout.Body>
  );
};

export default TabHistoryCustomer;
