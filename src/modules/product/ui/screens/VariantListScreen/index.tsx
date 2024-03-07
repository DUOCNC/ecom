import React, {useEffect, useMemo, useState} from 'react';
import {ErrorType, Layout} from 'common-ui';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {SearchProductView} from '../../views';
import {View} from 'react-native';
import style from './style';
import {MainRouteConfig} from 'config/RouteConfig';
import {ProductListView} from '../../views';
import {VariantEntity} from 'modules/product/models';
import {productService} from 'modules/product/services';
import {showError} from 'utils/ToastUtils';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'VariantList'>;

const VariantListScreen: React.FC<Props> = ({navigation, route}) => {
  const [variants, setVariants] = useState<Array<VariantEntity>>([]);
  const {params} = route;
  const [error, setError] = useState<ErrorType | false>(false);
  const [msgError, setMsgError] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [isLoad, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const keyword = params.keyword ? params.keyword : '';
  const {locationSelected, locations} = useAuth();
  const storeIDs = useMemo(() => {
    let temps = locations.map(store => store.id);
    if (locationSelected.locationId !== -1) {
      temps = [locationSelected.locationId];
    }
    return temps;
  }, [locationSelected.locationId, locations]);
  const onSearchPress = () => {
    navigation.navigate(MainRouteConfig.VariantSearch, {keyword: keyword});
  };
  const onLoadMoreData = () => {
    productService.getVariants(
      storeIDs,
      {
        limit: 10,
        page: page + 1,
        info: keyword,
      },
      () => setLoadMore(true),
      (resultVariants, resultPage, resultCanLoadMore) => {
        let newVariants = [...variants, ...resultVariants];
        setVariants(newVariants);
        setPage(resultPage);
        setCanLoadMore(resultCanLoadMore);
        setLoadMore(false);
      },
      (resultError, msg) => {
        showError(msg);
      },
      () => setLoadMore(false),
    );
  };

  const onRefreshData = () => {
    productService.getVariants(
      storeIDs,
      {
        limit: 10,
        page: 1,
        info: keyword,
      },
      () => setRefreshing(true),
      (resultVariants, resultPage, resultCanLoadMore) => {
        setVariants(resultVariants);
        setPage(resultPage);
        setCanLoadMore(resultCanLoadMore);
        setRefreshing(false);
      },
      (resultError, msg) => {
        showError(msg);
      },
    );
  };

  useEffect(() => {
    if (!isLoad) {
      productService.getVariants(
        storeIDs,
        {
          info: keyword,
          limit: 10,
          page: 1,
        },
        () => setLoading(true),
        (resultVariants, resultPage, resultCanLoadMore) => {
          setVariants(resultVariants);
          setPage(resultPage);
          setCanLoadMore(resultCanLoadMore);
          setLoading(false);
        },
        (code, msg) => {
          setError(code);
          setMsgError(msg);
          setLoading(false);
        },
        () => setLoad(true),
      );
    }
  }, [isLoad, keyword, storeIDs]);
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Tất cả sản phẩm">
        <View style={style.formSearch}>
          <SearchProductView keyword={keyword} onSearchPress={onSearchPress} />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.SafeAreaContainer edges={['left', 'right', 'bottom']}>
        <Layout.Loading position="top" loading={loading}>
          <Layout.Error subTitle={msgError} error={error}>
            <ProductListView
              canLoadMore={canLoadMore}
              onLoadMoreData={onLoadMoreData}
              isLoadMore={isLoadMore}
              onRefreshData={onRefreshData}
              refreshing={refreshing}
              data={variants}
            />
          </Layout.Error>
        </Layout.Loading>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default VariantListScreen;
