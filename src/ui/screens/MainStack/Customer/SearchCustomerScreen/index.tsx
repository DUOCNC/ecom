import {useFocusEffect} from '@react-navigation/native';
import {bg_search_error} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
// import {CTButton} from 'components/Button';
import CTFLastList from 'components/CTFlatList';
import CTLayout from 'components/CTLayout';
import EmptyState from 'components/CTScreen/EmptyState';
import CTStatusBar from 'components/CTStatusBar';
import {HistorySearch} from 'config/DataSourceConfig/HistorySearchSource';
import {MainRouteConfig} from 'config/RouteConfig';
import {CustomerMapper} from 'mapper/CustomerMapper';
import {CustomerDto} from 'model/dto/CustomerService/CustomerDto';
import {HistorySearchDto} from 'model/dto/MobileService/HistorySearchDto';
import {HistorySearchRequest} from 'model/request/HistorySearchRequest';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import {getCustomersApi} from 'services/CustomerService/CustomerApi';
import {CustomerUtils} from 'services/CustomerService/CustomerUtils';
import {
  deleteHistorySearchApi,
  getHistorySearchApi,
  saveHistorySearchApi,
} from 'services/MobileService/HistorySearchApi';
import SearchInput from 'ui/view/Common/SearchInput';
import {SearchCustomerItem} from 'ui/view/CustomerComponent';
import {showError} from 'utils/ToastUtils';
import {MainStackScreenProps} from '../..';
import HistoryComponent from './CustomerHistoryView';
import {SearchCustomerStyle} from './styles';
import logService from 'modules/personalize/services/LogService';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'SearchCustomer'>;
const MAX_LIMIT = 5;
const SearchCustomerScreen: FC<Props> = ({navigation}: Props) => {
  const [keySearch, setKeySearch] = useState<string>('');
  const [customers, setCustomers] = useState<Array<CustomerDto>>([]);
  const [isSearching, setSearching] = useState<boolean>(false);
  const [histories, setHistories] = useState<Array<HistorySearchDto>>([]);
  const [loadHistory, setLoadHistory] = useState<boolean>(false);
  const {locationSelected} = useAuth();
  const onDeleteHistoryPress = (id: number) => {
    deleteHistorySearchApi(id, () => {
      getHistorySearchApi(
        {type: HistorySearch.Customer, limit: 10, page: 1},
        result => {
          setHistories(result.items);
        },
        errors => {
          showError(errors[0]);
        },
      );
    });
  };
  const onNavigateFromHistory = (id: number, name: string) => {
    logService.saveLog({
      function: FunctionLog.VIEW_CUSTOMER_DETAIL,
      screen: ScreenLog.SEARCH_CUSTOMER_SCREEN,
      action: ActionLog.VIEW,
      customerId: id,
      storeId: locationSelected.locationId,
      storeName: locationSelected.locationName,
    });
    navigation.navigate(MainRouteConfig.DetailCustomer, {
      id: id,
      name: name,
    });
  };
  // const onNavigateCustomer = () => {
  //   navigation.navigate(MainRouteConfig.CreateCustomer, {
  //     phone: undefined,
  //   });
  // };
  const onDetailPress = (customer: CustomerDto) => {
    const dataCustomer = CustomerMapper.mapHistoryCustomer(customer);
    let historySearch: HistorySearchRequest = {
      data: JSON.stringify(dataCustomer),
      type: HistorySearch.Customer,
      keyword: CustomerUtils.detailSearch(customer),
    };
    logService.saveLog({
      function: FunctionLog.VIEW_CUSTOMER_DETAIL,
      screen: ScreenLog.SEARCH_CUSTOMER_SCREEN,
      action: ActionLog.VIEW,
      customerId: customer.id,
      storeId: locationSelected.locationId,
      storeName: locationSelected.locationName,
    });
    saveHistorySearchApi(historySearch);
    navigation.navigate(MainRouteConfig.DetailCustomer, {
      id: customer.id,
      name: customer.fullName,
    });
  };
  useFocusEffect(
    useCallback(() => {
      setLoadHistory(true);
      getHistorySearchApi(
        {type: HistorySearch.Customer, limit: 10, page: 1},
        result => {
          setHistories(result.items);
        },
        errors => {
          showError(errors[0]);
        },
        () => setLoadHistory(false),
      );
    }, []),
  );
  useEffect(() => {
    let timer = setTimeout(() => {
      if (keySearch.length > 0) {
        setSearching(true);
        getCustomersApi(
          {
            limit: 15,
            page: 1,
            search_type: 'LIST',
            request: keySearch,
          },
          result => {
            setCustomers(result.items);
          },
          errors => {
            showError(errors[0]);
          },
          () => {
            setSearching(false);
          },
        );
      } else {
        setCustomers([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [keySearch]);
  return (
    <CTLayout.Container>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack
        bottom={
          <View
            style={[SearchCustomerStyle.headerSearch, ThemeStyle.shadowBottom]}>
            <SearchInput
              autoFocus
              onBarCodePress={() =>
                navigation.navigate(MainRouteConfig.BarcodeScanner)
              }
              placeholder="Nhập từ khóa tìm kiếm"
              value={keySearch}
              onChangeText={txt => setKeySearch(txt)}
            />
          </View>
        }
        title="Khách hàng 360"
      />

      <KeyboardAvoidingView
        style={SearchCustomerStyle.body}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {keySearch === '' ? (
          <HistoryComponent
            onNavigate={onNavigateFromHistory}
            max={MAX_LIMIT}
            onDelete={onDeleteHistoryPress}
            histories={histories}
            loading={loadHistory}
          />
        ) : (
          <React.Fragment>
            {isSearching ? (
              <View style={SearchCustomerStyle.loading}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <View style={SearchCustomerStyle.bodySearch}>
                {customers.length > 0 ? (
                  <CTFLastList
                    keyExtractor={item => item.id}
                    data={customers}
                    renderItem={({item}) => (
                      <SearchCustomerItem
                        onPress={onDetailPress}
                        customer={item}
                      />
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={ThemeStyle.separator24} />
                    )}
                  />
                ) : (
                  <View style={ThemeStyle.viewSearchError}>
                    <EmptyState
                      icon={bg_search_error}
                      title="Không tìm thấy khách hàng"
                      subTitle=""
                    />
                  </View>
                )}
              </View>
            )}
          </React.Fragment>
        )}
      </KeyboardAvoidingView>
    </CTLayout.Container>
  );
};

export default SearchCustomerScreen;
