import {useFocusEffect} from '@react-navigation/native';
import {bg_search_error} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {ErrorType, Layout} from 'common-ui';
import CTFLastList from 'components/CTFlatList';
import EmptyState from 'components/CTScreen/EmptyState';
import {AppConfig} from 'config/AppConfig';
import {MainRouteConfig} from 'config/RouteConfig';
import {Metadata} from 'model/base/Metadata';
import {OrderSearchDto} from 'model/dto/OrderService/OrderSearchDto';
import {OrderQuery} from 'model/query/OrderQuery';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {getOrdersApi} from 'services/OrderService/OrderApi';
import {SearchInput} from 'ui/view/Common';
import {OrderSearchItem} from 'ui/view/OrderComponent/';
import {showError} from 'utils/ToastUtils';
import {MainStackScreenProps} from '../../..';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'PosList'>;

const initQuery: OrderQuery = {
  limit: AppConfig.MaxLimit,
  is_online: false,
};

const PosListScreen: React.FC<Props> = ({navigation}) => {
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
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [firstError, setFirstError] = useState<false | string>(false);
  const onPressOrder = useCallback(
    (id: number, code: string) => {
      navigation.navigate(MainRouteConfig.OrderDetail, {id: id, code: code});
    },
    [navigation],
  );
  const storeIds = useMemo(() => {
    if (locationSelected.supported || locationSelected.locationId === -1) {
      return undefined;
    }
    return [locationSelected.locationId];
  }, [locationSelected.locationId, locationSelected.supported]);

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
  const onLoadMore = useCallback(
    (page: number) => {
      setLoadMore(true);
      getOrdersApi(
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
    },
    [data, key, storeIds],
  );
  const onReload = () => {
    setFirstLoad(true);
    setFirstError(false);
  };
  useFocusEffect(
    useCallback(() => {
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
    }, [firstLoad, storeIds]),
  );
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!first.current) {
      timeout = setTimeout(() => {
        setSearching(true);
        getOrdersApi(
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
        title="DS đơn bán tại quầy"
        error={errorType}
        children={
          <View style={[ThemeStyle.headerSearch]}>
            <SearchInput
              placeholder="Tìm kiếm đơn hàng"
              value={key}
              onChangeText={value => setKey(value)}
            />
          </View>
        }
      />
      <Layout.Container>
        <Layout.Error error={errorType}>
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
              <OrderSearchItem
                index={index}
                max={data.length}
                onPress={onPressOrder}
                order={item}
              />
            )}
          />
        </Layout.Error>
      </Layout.Container>
    </Layout.Screen>
  );
};

export default PosListScreen;
