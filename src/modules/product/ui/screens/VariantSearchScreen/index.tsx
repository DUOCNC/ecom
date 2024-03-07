import React, {useCallback, useEffect, useState} from 'react';
import {Layout} from 'common-ui';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {
  ProductSearchHistoryView,
  ProductSearchInputView,
  ProductSuggestionView,
} from '../../views';
import {View} from 'react-native';
import style from './style';
import {HistorySearchEntity, VariantEntity} from 'modules/product/models';
import {productService} from 'modules/product/services';
import {MainRouteConfig} from 'config/RouteConfig';
import {StackActions} from '@react-navigation/native';

type Props = MainStackScreenProps<'VariantSearch'>;

const VariantSearchScreen: React.FC<Props> = ({navigation}) => {
  /**
   * Data Get History Search
   * hitories: lịch sử tìm kiếm
   * page: Trang tìm kiếm
   * canLoadmore: Cỏ thể loadmore nữa hay không
   * isLoadmore: Trạng thái đang loadmore
   * isLoad: load lần đầu hay chưa
   */
  const [histories, setHistories] = useState<Array<HistorySearchEntity>>([]);
  const [page, setPage] = useState<number>(1);
  const [canLoadmore, setCanLoadmore] = useState<boolean>(false);
  const [isLoadmore] = useState<boolean>(false);
  const [isLoad, setLoad] = useState<boolean>(false);
  /**
   * Dữ liệu tìm kiếm
   *  suggesstions: Mảng dữ liệu gợi ý
   */
  const [keyword, setKeyword] = useState<false | string>(false);
  const [suggestions, setSuggestion] = useState<Array<VariantEntity>>([]);

  /**
   * Function Search
   * @param txt trả ra từ hàm callback ở component tìm kiếm
   */
  const onSearch = (txt: string) => {
    if (txt.trim() === '') {
      setKeyword(false);
      return;
    }
    setKeyword(txt);
  };

  const onItemDelete = (itemDelete: HistorySearchEntity) => {
    const resultHistory = productService.deleteHistory(itemDelete, histories);
    setHistories(resultHistory);
  };

  const navigateSearch = (txt: string, isCreateHistory: boolean) => {
    if (isCreateHistory) {
      productService.addHistory(txt);
    }
    navigation.push(MainRouteConfig.VariantList, {keyword: txt});
  };

  const navigateVariantDetail = (
    item: VariantEntity,
    isCreateHistory: boolean,
  ) => {
    if (isCreateHistory) {
      productService.addHistory(item.getName());
    }
    navigation.dispatch(
      StackActions.push(MainRouteConfig.VariantDetail, {
        variantId: item.getId(),
        productId: item.getProductId(),
        sku: item.getSku(),
      }),
    );
  };

  const onSearchPress = (txt: string) => {
    navigateSearch(txt, true);
  };

  const onItemPress = (txt: string) => {
    navigateSearch(txt, true);
  };

  const onVariantPress = (variant: VariantEntity) => {
    navigateVariantDetail(variant, true);
  };

  const onLoadmoreHistory = useCallback(() => {
    if (!canLoadmore) {
      return;
    }
  }, [canLoadmore]);

  /**
   * Khi component khởi tạo lấy danh sách lịch sử tìm kiếm
   */
  useEffect(() => {
    if (!isLoad) {
      productService.getHistory(
        page,
        (
          data: Array<HistorySearchEntity>,
          rsPage: number,
          rsCanLoadMore: boolean,
        ) => {
          setHistories(data);
          setPage(rsPage);
          setLoad(true);
          setCanLoadmore(rsCanLoadMore);
        },
      );
    }
  }, [isLoad, page]);

  /**
   * lấy danh sách suggestions
   */
  useEffect(() => {
    productService.getSuggestions(keyword, rsSuggestion => {
      setSuggestion(rsSuggestion);
    });
  }, [keyword]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Tìm kiếm sản phẩm">
        <View style={style.formSearch}>
          <ProductSearchInputView
            onSearchPress={onSearchPress}
            onSearch={onSearch}
          />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.Container>
        {!keyword ? (
          <ProductSearchHistoryView
            onKeywordPress={txt => navigateSearch(txt, false)}
            isLoadMore={isLoadmore}
            canLoadMore={canLoadmore}
            histories={histories}
            onLoadMore={onLoadmoreHistory}
            onItemDelete={onItemDelete}
          />
        ) : (
          <ProductSuggestionView
            onPress={onItemPress}
            keyword={keyword}
            suggestions={suggestions}
            onVariantPress={onVariantPress}
          />
        )}
      </Layout.Container>
    </Layout.Screen>
  );
};

export default VariantSearchScreen;
