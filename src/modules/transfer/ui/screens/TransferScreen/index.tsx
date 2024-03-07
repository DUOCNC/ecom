import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {ErrorType, Layout} from 'common-ui';
import {SearchTransferView, TransferItemView} from '../../views';
import CTFLastList from 'components/CTFlatList';
import {ThemeStyle} from 'assets/theme';
import EmptyState from 'components/CTScreen/EmptyState';
import {bg_search_error} from 'assets/images';
import {AppConfig} from 'config/AppConfig';
import {Metadata} from 'common';
import style from './style';
import transferService from 'modules/transfer/services/TransferService';
import {TransferRequest} from 'modules/transfer/models/request';
import TransferEntity from 'modules/transfer/models/entities/TransferEntity';
import {useAuth} from 'providers/contexts/AuthContext';
import {useDebounce} from 'hook';
import {MainRouteConfig} from 'config/RouteConfig';
const initQuery: TransferRequest = {
  limit: AppConfig.MaxLimit,
  condition: '',
  page: 1,
};
type Props = MainStackScreenProps<'Transfer'>;
const TransferScreen: React.FC<Props> = ({navigation, route}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [error, setError] = useState<ErrorType | false>(false);
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyWord = useDebounce<string>(keyword, 500);
  const [data, setData] = useState<Array<TransferEntity>>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Metadata>({
    page: 1,
    limit: AppConfig.MaxLimit,
    total: 0,
  });
  const {locationSelected} = useAuth();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [firstError, setFirstError] = useState<false | string>(false);

  const onSearch = (txt: string) => {
    if (txt.trim() === '') {
      setKeyword('');
      return;
    }
    setKeyword(txt);
  };

  const onSearchPress = (qr: string) => {
    console.log('qr', qr);
  };

  const onSuccess = (d: Array<TransferEntity>, meta: Metadata) => {
    setError(false);
    setLoading(false);
    setData(d);
    setMetadata(meta);
  };

  const onError = (err: ErrorType, m: string) => {
    setError(err);
    setMsg(m);
  };

  useEffect(() => {
    //init
    if (!firstLoad) {
      return;
    }
    transferService.getTransfers(
      {
        ...initQuery,
        page: 1,
        condition: debouncedKeyWord,
        toStoreId: locationSelected.locationId,
      },
      onSuccess,
      onError,
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    );
    setFirstLoad(false);
  }, [firstLoad, debouncedKeyWord, locationSelected.locationId]);

  useEffect(() => {
    //search
    if (firstLoad) {
      return;
    }
    transferService.getTransfers(
      {
        ...initQuery,
        page: 1,
        condition: debouncedKeyWord,
        toStoreId: locationSelected.locationId,
      },
      onSuccess,
      onError,
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    );
    setFirstLoad(false);
  }, [firstLoad, debouncedKeyWord, locationSelected.locationId]);

  const onLoadMore = useCallback(
    (page: number) => {
      setLoadMore(true);
      transferService.getTransfers(
        {
          ...initQuery,
          page: page,
          condition: keyword,
          toStoreId: locationSelected.locationId,
        },
        (entities, meta) => {
          setData(prev => [...prev, ...entities]);
          setMetadata(meta);
        },
        onError,
        () => {
          setLoadMore(true);
        },
        () => {
          setLoadMore(false);
        },
      );
    },
    [keyword, locationSelected.locationId],
  );
  const onReload = () => {
    setFirstError(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    transferService.getTransfers(
      {...initQuery, toStoreId: locationSelected.locationId},
      onSuccess,
      onError,
      () => {
        setSearching(true);
      },
      () => {
        setSearching(false);
        setRefreshing(false);
      },
    );
  };

  const onPressItem = (id: number) => {
    navigation.navigate(MainRouteConfig.TransferDetail, {id: id});
  };

  return (
    <Layout.Screen barStyle="light-content">
      <Layout.ScreenHeaderBack title="Phiếu chuyển hàng">
        <View style={style.search}>
          <SearchTransferView
            onSearch={onSearch}
            onSearchPress={onSearchPress}
            barcodeScreen="QR"
          />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.SafeAreaContainer edges={['bottom']}>
        <Layout.Loading loading={loading}>
          <Layout.Error error={error} subTitle={msg}>
            <View style={style.container}>
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
                showsVerticalScrollIndicator={false}
                emptyView={
                  <EmptyState
                    icon={bg_search_error}
                    title="Không tìm thấy kết quả"
                    subTitle="Có vẻ như bạn đã nhập sai tìm kiếm, vui lòng tìm kiếm với từ khóa khác"
                  />
                }
                renderItem={({item, index}) => (
                  <TransferItemView
                    key={index}
                    index={index}
                    max={data.length}
                    onPress={onPressItem}
                    transfer={item}
                  />
                )}
              />
            </View>
          </Layout.Error>
        </Layout.Loading>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};
export default TransferScreen;
