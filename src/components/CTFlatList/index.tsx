import CTLayout from 'components/CTLayout';
import {Metadata} from 'model/base/Metadata';
import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  RefreshControl,
  View,
} from 'react-native';
import styles from './styles';

interface IProps<ItemT = any> extends FlatListProps<ItemT> {
  isRefreshing?: boolean;
  isLoadMore?: boolean;
  onRefresh?: () => void;
  onReLoad?: () => void;
  onLoadMore?: (nextPage: number) => void;
  paging?: false | Metadata;
  disableRefresh?: boolean;
  disableLoadMore?: boolean;
  firstLoading?: boolean;
  error?: string | false;
  disableFirstLoading?: boolean;
  searching?: boolean;
  emptyView?: React.ReactNode;
}

const CTFLastList: React.FC<IProps> = (props: IProps) => {
  const {
    paging,
    onRefresh,
    onLoadMore,
    isRefreshing,
    isLoadMore,
    disableRefresh,
    firstLoading,
    disableLoadMore: disableLoader,
    disableFirstLoading,
    error,
    onReLoad,
    data,
    emptyView,
    searching,
    ...rest
  } = props;
  const canLoadMore = useMemo(() => {
    if (!paging) {
      return false;
    }
    let totalPage = Math.ceil(paging.total / paging.limit);
    let can = paging.page + 1 <= totalPage;
    return can;
  }, [paging]);
  const footerComponent = useMemo(() => {
    if (!paging) {
      return undefined;
    }
    if (canLoadMore) {
      if (isLoadMore && !isRefreshing && !disableLoader) {
        return (
          <View style={styles.rowLoadMore}>
            <ActivityIndicator size={'large'} />
          </View>
        );
      }
      return undefined;
    }
  }, [canLoadMore, disableLoader, isLoadMore, isRefreshing, paging]);

  return (
    <CTLayout.LoadingView
      disableFirstLoading={disableFirstLoading}
      firstLoading={firstLoading}>
      <CTLayout.ErrorView onReloadPress={onReLoad} error={error}>
        {searching && (
          <View style={styles.searchingView}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {data && data.length > 0 ? (
          <FlatList
            scrollEnabled={true}
            refreshControl={
              disableRefresh ? undefined : (
                <RefreshControl
                  onRefresh={onRefresh}
                  refreshing={isRefreshing ? isRefreshing : false}
                />
              )
            }
            onEndReachedThreshold={0.8}
            onEndReached={() => {
              if (paging && canLoadMore && !isRefreshing && !isLoadMore) {
                onLoadMore && onLoadMore(paging.page + 1);
              }
            }}
            data={data}
            ListFooterComponent={footerComponent}
            {...rest}
          />
        ) : (
          <View style={styles.emptyView}>{emptyView}</View>
        )}
      </CTLayout.ErrorView>
    </CTLayout.LoadingView>
  );
};

export default CTFLastList;
