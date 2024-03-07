import {useFocusEffect} from '@react-navigation/native';
import {ThemeStyle} from 'assets/theme';
import CTFLastList from 'components/CTFlatList';
import {AppConfig} from 'config/AppConfig';
import {MainRouteConfig} from 'config/RouteConfig';
import {Metadata} from 'model/base/Metadata';
import {CustomerDto} from 'model/dto/CustomerService/CustomerDto';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {getCustomersApi} from 'services/CustomerService/CustomerApi';
import {SearchButtonV2} from 'ui/view/Common';
import {CustomerItem} from 'ui/view/CustomerComponent';
import {showError} from 'utils/ToastUtils';
import {MainStackScreenProps} from '../..';
import {CustomerStyle} from './style';
import {ErrorType, Layout} from 'common-ui';

type Props = MainStackScreenProps<'CustomerList'>;

const CustomListScreen: React.FC<Props> = ({navigation}) => {
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [firstError, setFirstError] = useState<false | string>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Array<CustomerDto>>([]);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Metadata>({
    page: 1,
    limit: AppConfig.MaxLimit,
    total: 0,
  });
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const handleError = (errors: Array<string>) => {
    const err = errors[0];
    if (err === 'NotPermission') {
      setErrorType('NotPermission');
      return;
    }
    showError(err);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCustomersApi(
      {
        limit: AppConfig.MaxLimit,
        page: 1,
        search_type: 'LIST',
      },
      data => {
        setMetadata(data.metadata);
        setCustomers(data.items);
      },
      handleError,
      () => {
        setRefreshing(false);
      },
    );
  }, []);
  const onLoadMore = useCallback(
    (nextPage: number) => {
      setLoadMore(true);
      getCustomersApi(
        {
          limit: AppConfig.MaxLimit,
          page: nextPage,
          search_type: 'LIST',
        },
        data => {
          setMetadata(data.metadata);
          setCustomers([...customers, ...data.items]);
        },
        handleError,
        () => {
          setLoadMore(false);
        },
      );
    },
    [customers],
  );
  const onBarcodePress = () => {
    navigation.navigate(MainRouteConfig.BarcodeScanner);
  };
  const onReload = () => {
    setFirstError(false);
    setFirstLoading(true);
  };
  useFocusEffect(
    useCallback(() => {
      if (firstLoading) {
        getCustomersApi(
          {
            limit: AppConfig.MaxLimit,
            page: 1,
            search_type: 'LIST',
          },
          data => {
            setMetadata(data.metadata);
            setCustomers(data.items);
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
            setFirstLoading(false);
          },
        );
      }
    }, [firstLoading]),
  );
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title="Khách hàng"
        error={errorType}
        children={
          <View style={[CustomerStyle.headerSearch, ThemeStyle.shadowBottom]}>
            <SearchButtonV2
              onBarCodePress={onBarcodePress}
              text="Tìm kiếm khách hàng"
              onPress={() =>
                navigation.navigate(MainRouteConfig.SearchCustomer)
              }
            />
          </View>
        }
      />
      <Layout.Container>
        <Layout.Error error={errorType}>
          <CTFLastList
            firstLoading={firstLoading}
            error={firstError}
            onReLoad={onReload}
            style={CustomerStyle.flatList}
            onRefresh={onRefresh}
            paging={metadata}
            data={customers}
            isRefreshing={isRefreshing}
            onLoadMore={onLoadMore}
            isLoadMore={isLoadMore}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <CustomerItem
                customer={item}
                index={index}
                max={customers.length}
                onPress={customer => {
                  return navigation.navigate(MainRouteConfig.DetailCustomer, {
                    id: customer.id,
                    name: customer.fullName,
                  });
                }}
              />
            )}
          />
        </Layout.Error>
      </Layout.Container>
    </Layout.Screen>
  );
};

export default CustomListScreen;
