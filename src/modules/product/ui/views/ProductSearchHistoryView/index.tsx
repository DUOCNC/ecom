import React, {useCallback, useMemo, useState} from 'react';
import {FlatListItemControl, Layout, Typography} from 'common-ui';
import {View, Animated, TouchableOpacity} from 'react-native';
import style from './style';
import {colors} from 'assets/v2';
import {HistorySearchEntity} from 'modules/product/models';
import ProductItemHistoryView from '../ProductItemHistoryView';

const {FlatList} = Animated;

interface Props {
  histories: Array<HistorySearchEntity>;
  onLoadMore: () => void;
  canLoadMore: boolean;
  isLoadMore: boolean;
  onItemDelete: (itemDelete: HistorySearchEntity) => void;
  onKeywordPress: (keyword: string) => void;
}

const MAX_LENGTH = 3;

const ProductSearchHistoryView: React.FC<Props> = ({
  histories,
  canLoadMore,
  isLoadMore,
  onLoadMore,
  onItemDelete,
  onKeywordPress,
}) => {
  const [enableLoadMore, setEnableLoadMore] = useState<boolean>(false);

  /**
   * Nếu không enable loadmore thì lấy 3 phần tử đầu tiên
   */
  const dataSource = useMemo(() => {
    if (enableLoadMore || histories.length < MAX_LENGTH) {
      return histories;
    }
    return histories.slice(0, MAX_LENGTH);
  }, [enableLoadMore, histories]);

  const onEnableLoadMorePress = useCallback(() => {
    setEnableLoadMore(true);
  }, []);

  const onDelete = useCallback(
    (itemDelete: HistorySearchEntity) => {
      onItemDelete(itemDelete);
    },
    [onItemDelete],
  );

  const onEndReached = useCallback(() => {
    if (!canLoadMore) {
      return;
    }
    onLoadMore();
  }, [canLoadMore, onLoadMore]);

  const footer = useMemo(() => {
    if (!enableLoadMore && histories.length > 3) {
      return (
        <View style={style.footer}>
          <FlatListItemControl.Separator />
          <TouchableOpacity
            onPress={onEnableLoadMorePress}
            style={style.footerBtn}>
            <Typography
              color={colors.primary.o500}
              textType="medium"
              type="h3"
              text="Xem thêm"
            />
          </TouchableOpacity>
        </View>
      );
    }
    if (canLoadMore && isLoadMore) {
      return <FlatListItemControl.LoadMore />;
    }
    return null;
  }, [
    canLoadMore,
    enableLoadMore,
    histories.length,
    isLoadMore,
    onEnableLoadMorePress,
  ]);

  return (
    <Layout.Container>
      <FlatList
        renderItem={({item}) => (
          <ProductItemHistoryView
            onPress={k => onKeywordPress(k)}
            onDelete={onDelete}
            data={item}
          />
        )}
        data={dataSource}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={style.header}>
            <Typography
              type="h3"
              text="Lịch sử tìm kiếm"
              color={colors.secondary.o500}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={style.emptyItem}>
            <Typography type="h3" text="Không có lịch sử tìm kiếm" />
          </View>
        }
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
        ListFooterComponent={footer}
        keyExtractor={item => item.getKeyExtractor()}
      />
    </Layout.Container>
  );
};

export default ProductSearchHistoryView;
