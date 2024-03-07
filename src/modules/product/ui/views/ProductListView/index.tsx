import React from 'react';
import {VariantEntity} from 'modules/product/models';
import {Animated, RefreshControl} from 'react-native';
import ProductItemView from '../ProductItemView';
import {FlatListItemControl} from 'common-ui';

interface Props {
  data: Array<VariantEntity>;
  onRefreshData?: () => void;
  refreshing: boolean;
  isLoadMore: boolean;
  canLoadMore: boolean;
  onLoadMoreData: () => void;
}

const {FlatList} = Animated;

const ProductListView: React.FC<Props> = ({
  refreshing,
  data,
  isLoadMore,
  onRefreshData,
  onLoadMoreData,
  canLoadMore,
}) => {
  const onRefresh = () => {
    if (refreshing || isLoadMore) {
      return;
    }
    onRefreshData && onRefreshData();
  };
  const onLoadMore = () => {
    if (refreshing || isLoadMore) {
      return;
    }
    if (!canLoadMore) {
      return;
    }
    onLoadMoreData && onLoadMoreData();
  };
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      bounces={true}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.getKey()}
      data={data}
      onEndReachedThreshold={0.8}
      onEndReached={onLoadMore}
      ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
      ListFooterComponent={
        <FlatListItemControl.LoadMore isLoadMore={isLoadMore} />
      }
      renderItem={({item}) => <ProductItemView data={item} />}
    />
  );
};

export default ProductListView;
