import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {bg_search_error} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import CTFLastList from 'components/CTFlatList';
import EmptyState from 'components/CTScreen/EmptyState';
import {AppConfig} from 'config/AppConfig';
import {Metadata} from 'model/base/Metadata';
import {OrderReturnSearchDto} from 'model/dto/OrderService/OrderReturnSearchDto';
import {OrderReturnQuery} from 'model/query/OrderReturnQuery';
import {View} from 'react-native';
import {getOrderReturnsApi} from 'services/OrderService/OrderApi';
import {SearchInput} from 'ui/view/Common';
import {OrderReturnItem} from 'ui/view/OrderComponent';
import {showError} from 'utils/ToastUtils';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {ErrorType, Layout} from 'common-ui';
import {useAuth} from 'providers/contexts/AuthContext';

const initQuery: OrderReturnQuery = {
  limit: AppConfig.MaxLimit,
  is_online: false,
};

type Props = MainStackScreenProps<'PosReturnList'>;

const PosReturnListScreen: React.FC<Props> = ({navigation}) => {
  const {locationSelected} = useAuth();
  const [key, setKey] = useState<string>('');
  const [data, setData] = useState<Array<OrderReturnSearchDto>>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const first = useRef<boolean>(true);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Metadata>({
    page: 1,
    limit: AppConfig.MaxLimit,
    total: 0,
  });
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [firstError, setFirstError] = useState<false | string>(false);
  const onReload = () => {
    setFirstLoad(true);
    setFirstError(false);
  };
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const storeIds = useMemo(() => {
    if (locationSelected.supported || locationSelected.locationId === -1) {
      return undefined;
    }
    return [locationSelected.locationId];
  }, [locationSelected.locationId, locationSelected.supported]);
  const onPressOrderReturn = (id: number, code: string) => {
    navigation.navigate(MainRouteConfig.OrderReturnDetail, {
      id: id,
      code: code,
    });
  };

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
    getOrderReturnsApi(
      {...initQuery, page: 1, search_term: key, store_ids: storeIds},
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
  const onLoadMore = (page: number) => {
    setLoadMore(true);
    getOrderReturnsApi(
      {...initQuery, page: page, search_term: key, store_ids: storeIds},
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
  };
  useFocusEffect(
    useCallback(() => {
      if (firstLoad) {
        getOrderReturnsApi(
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
    }, [firstLoad, storeIds]),
  );
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!first.current) {
      timeout = setTimeout(() => {
        setSearching(true);
        getOrderReturnsApi(
          {...initQuery, page: 1, search_term: key, store_ids: storeIds},
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
  }, [key, storeIds]);
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        error={errorType}
        children={
          <View style={[ThemeStyle.headerSearch]}>
            <SearchInput
              placeholder="Tìm kiếm đơn trả hàng"
              value={key}
              onChangeText={value => setKey(value)}
            />
          </View>
        }
        title="DS đơn trả tại quầy"
      />

      <Layout.Container>
        <Layout.Error error={errorType}>
          <CTFLastList
            keyboardShouldPersistTaps="handled"
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
            keyExtractor={item => item.code_order_return}
            emptyView={
              <EmptyState
                icon={bg_search_error}
                title="Không tìm thấy kết quả"
                subTitle="Có vẻ như bạn đã nhập sai tìm kiếm, vui lòng tìm kiếm với từ khóa khác"
              />
            }
            renderItem={({item, index}) => (
              <OrderReturnItem
                onPress={onPressOrderReturn}
                index={index}
                max={data.length}
                data={item}
              />
            )}
          />
        </Layout.Error>
      </Layout.Container>
    </Layout.Screen>
  );
};

export default PosReturnListScreen;
