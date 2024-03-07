import React from 'react';
import {VariantEntity} from 'modules/product/models';
import {Animated, RefreshControl} from 'react-native';
import ProductItemView from '../ProductItemView';
import {FlatListItemControl} from 'common-ui';
import BinLocationEntity from 'modules/product/models/entities/BinLocationEntity';
import ProductPositioningItem from './ProductPositioningItem';

interface Props {
  data: Array<BinLocationEntity>;
  onRefreshData?: () => void;
  refreshing: boolean;
  isLoadMore: boolean;
  canLoadMore: boolean;
  onLoadMoreData: () => void;
}

const {FlatList} = Animated;

const ProductPositioningItemView: React.FC<Props> = ({
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
      keyExtractor={(item, index) => index.toString()}
      data={data}
      onEndReachedThreshold={0.8}
      onEndReached={onLoadMore}
      ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
      ListFooterComponent={
        <FlatListItemControl.LoadMore isLoadMore={isLoadMore} />
      }
      renderItem={({item}) => <ProductPositioningItem data={item} />}
    />
  );
};

export default ProductPositioningItemView;
