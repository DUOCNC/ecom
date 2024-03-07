import {bg_start_search_customer, ic_scan_barcode} from 'assets/images';
import {
  ErrorType,
  FlatListItemControl,
  Layout,
  SearchInput,
  Typography,
} from 'common-ui';
import {MainRouteConfig} from 'config/RouteConfig';
import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Animated,
  RefreshControl,
} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import style from './style';
import {colors} from 'assets/v2';
import {customerService} from 'modules/order/services';
import {CustomerEntity} from 'modules/order/models';
import {CustomerItemView} from '../../views';

type Props = MainStackScreenProps<'AddCustomerOrder'>;

const {FlatList} = Animated;

const AddCustomerOrderScreen: React.FC<Props> = ({navigation, route}) => {
  const {link} = route.params;
  const [keyword, setKeyword] = useState<string>('');
  const [customers, setCustomers] = useState<Array<CustomerEntity>>([]);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<ErrorType | false>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const onRefresh = () => {
    if (refreshing || isLoadMore) {
      return;
    }
    customerService.searchCustomer(
      keyword,
      1,
      () => setRefreshing(true),
      (rsCustomers, rsPage: number, rsCanLoadMore) => {
        setErrorType(false);
        setCustomers(rsCustomers);
        setPage(rsPage);
        setCanLoadMore(rsCanLoadMore);
      },
      (rsCode, rsMsg) => {
        setErrorType(rsCode);
        setErrorMsg(rsMsg);
      },
      () => setRefreshing(false),
    );
  };
  const onLoadMore = () => {
    if (refreshing || isLoadMore || !canLoadMore) {
      return;
    }
    customerService.searchCustomer(
      keyword,
      page + 1,
      () => setLoadMore(true),
      (rsCustomers, rsPage: number, rsCanLoadMore) => {
        setCustomers([...customers, ...rsCustomers]);
        setPage(rsPage);
        setCanLoadMore(rsCanLoadMore);
      },
      (rsCode, rsMsg) => {
        console.log(rsMsg);
      },
      () => setLoadMore(false),
    );
  };

  const onNavigateCustomer = () => {
    const regex = new RegExp('^((\\+84|84|0084|0)[1-9]{1}[0-9]{8,9})$');
    if (regex.test(keyword)) {
      navigation.navigate(MainRouteConfig.CreateCustomer, {
        phoneAutofill: keyword,
      });
      return;
    }
    navigation.navigate(MainRouteConfig.CreateCustomer);
  };
  const onPressBarcode = () => {
    navigation.push(MainRouteConfig.OrderBarcodeScan, {
      type: 'customer',
      link: MainRouteConfig.PosCreate,
    });
  };
  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (!keyword || keyword === '') {
        setCustomers([]);
        return;
      }
      customerService.searchCustomer(
        keyword,
        1,
        () => setLoading(true),
        (rsCustomers, rsPage: number, rsCanLoadMore) => {
          setErrorType(false);
          setCustomers(rsCustomers);
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
  }, [keyword]);
  useEffect(() => {
    if (route.params && route.params.barcode) {
      const {type, value} = route.params.barcode;
      navigation.setParams({barcode: undefined});
      navigation.navigate(link, {
        barcode: {
          type: type,
          value: value,
        },
      });
    }
  }, [keyword, link, navigation, route.params]);
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Khách hàng">
        <View style={style.formSearch}>
          <SearchInput
            value={keyword}
            autoFocus={true}
            onValueChange={txt => setKeyword(txt)}
            placeholder="Tìm kiếm khách hàng"
            right={
              <TouchableOpacity style={style.button} onPress={onPressBarcode}>
                <Image source={ic_scan_barcode} />
              </TouchableOpacity>
            }
          />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.Container>
        <Layout.Loading position="top" loading={loading}>
          <Layout.Error
            image={errorType === 'SearchNotfound' && bg_start_search_customer}
            title={
              errorType === 'SearchNotfound'
                ? 'Chưa có thông tin khách hàng'
                : undefined
            }
            bottom={
              errorType === 'SearchNotfound' && (
                <TouchableOpacity
                  onPress={onNavigateCustomer}
                  style={style.btnCreate}>
                  <Typography
                    textType="medium"
                    type="h3"
                    color={colors.primary.o500}
                    text="Thêm mới khách hàng"
                  />
                </TouchableOpacity>
              )
            }
            error={errorType}
            subTitle={errorMsg}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              bounces={true}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.getKey()}
              data={customers}
              onEndReachedThreshold={0.8}
              onEndReached={onLoadMore}
              keyboardShouldPersistTaps="handled"
              ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
              ListFooterComponent={
                <FlatListItemControl.LoadMore isLoadMore={isLoadMore} />
              }
              renderItem={({item}) => (
                <CustomerItemView link={link} customer={item} />
              )}
            />
          </Layout.Error>
        </Layout.Loading>
      </Layout.Container>
    </Layout.Screen>
  );
};

export default AddCustomerOrderScreen;
