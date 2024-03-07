import {useFocusEffect} from '@react-navigation/native';
import {bg_search_error} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {ErrorType, Layout} from 'common-ui';
import CTFLastList from 'components/CTFlatList';
import EmptyState from 'components/CTScreen/EmptyState';
import {AppConfig} from 'config/AppConfig';
import {Metadata} from 'model/base/Metadata';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {SearchInput} from 'ui/view/Common';
import {useAuth} from 'providers/contexts/AuthContext';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {orderService} from 'modules/order/services';
import {OrderYoscanEntity} from 'modules/order/models/entities/OrderYoscanEntity';
import YoscanOrderItem from 'modules/order/ui/views/YoscanOrderItem';
import ScreenBottom from 'common-ui/components/Layout/ScreenBottom';
import style from './style';
import {CTButton} from 'components/Button';
import {Font} from 'components/Base/Text';
import {MainRouteConfig} from 'config/RouteConfig';
import {useDebounce} from 'hook';

type Props = MainStackScreenProps<'YoscanList'>;

const initParams = {
  limit: AppConfig.MaxLimit,
  page: 1,
};

const YoscanListScreen: React.FC<Props> = ({navigation}) => {
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const {locationSelected} = useAuth();
  const [key, setKey] = useState<string>('');
  const debouncedKeyWord = useDebounce<string>(key, 500);
  const [data, setData] = useState<Array<OrderYoscanEntity>>([]);
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

  const storeIds = useMemo(() => {
    if (locationSelected.supported || locationSelected.locationId === -1) {
      return undefined;
    }
    return [locationSelected.locationId];
  }, [locationSelected.locationId, locationSelected.supported]);
  const params = useMemo(() => {
    if (!storeIds) {
      return {
        ...initParams,
      };
    }
    return {
      storeIds,
    };
  }, [storeIds]);

  const onRefresh = () => {
    orderService.getOrderYoscan(
      {...initParams, codes: [key], ...params},
      () => {
        setRefreshing(true);
      },
      (orderYoscanEntities, metaData) => {
        setData(orderYoscanEntities);
        setMetadata(metaData);
      },
      errors => {
        setErrorType(errors);
      },
      () => {
        setRefreshing(false);
      },
    );
  };
  const onReload = () => {
    setFirstLoad(true);
  };
  useFocusEffect(
    useCallback(() => {
      orderService.getOrderYoscan(
        {...initParams, codes: [key], ...params},
        () => {
          setSearching(true);
        },
        (orderYoscanEntities, metaData) => {
          setData(orderYoscanEntities);
          setMetadata(metaData);
        },
        errors => {
          setErrorType(errors);
        },
        () => {
          setSearching(false);
          setFirstLoad(false);
          first.current = false;
        },
      );
    }, [debouncedKeyWord, params]),
  );
  const onLoadMore = useCallback(
    (page: number) => {
      orderService.getOrderYoscan(
        {...initParams, codes: [key], ...params, page: page},
        () => {
          setLoadMore(true);
        },
        (orderYoscanEntities, metaData) => {
          setData([...data, ...orderYoscanEntities]);
          setMetadata(metaData);
        },
        errors => {
          setErrorType(errors);
        },
        () => {
          setLoadMore(false);
        },
      );
    },
    [data, key, params],
  );

  const onNavigateYoscan = () => {
    navigation.navigate(MainRouteConfig.PosCreate);
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title="Danh sách đơn Yoscan"
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
        <Layout.Loading loading={searching}>
          <Layout.Error error={errorType}>
            <CTFLastList
              searching={searching}
              onReLoad={onReload}
              firstLoading={firstLoad}
              isRefreshing={isRefreshing}
              isLoadMore={isLoadMore}
              style={ThemeStyle.flatList}
              data={data}
              onRefresh={onRefresh}
              showsVerticalScrollIndicator={false}
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
                <YoscanOrderItem
                  key={index}
                  index={index}
                  max={data.length}
                  order={item}
                />
              )}
            />
          </Layout.Error>
        </Layout.Loading>
      </Layout.Container>
      <ScreenBottom>
        <View style={[style.viewBottom]}>
          <CTButton
            onPress={onNavigateYoscan}
            text="Tạo đơn Yoscan"
            font={Font.Medium}
          />
        </View>
      </ScreenBottom>
    </Layout.Screen>
  );
};

export default YoscanListScreen;
