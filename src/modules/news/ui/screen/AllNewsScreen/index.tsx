import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {ErrorType, Layout, SearchInput} from 'common-ui';
import style from './style';
import {NewsEntity} from 'modules/news/model/entities';
import {CategoryNewsView, NewsItemView} from '../../view';
import newsService from 'modules/news/service/NewsService';
import NewsCategoryEntity from 'modules/news/model/entities/NewsCategoryEntity';
import {NewsCategoryResponse} from 'modules/news/model/response';
import CTFLastList from 'components/CTFlatList';
import {Metadata} from 'common';
import {useDebounce} from 'hook';

type CategoryTab = Partial<NewsCategoryResponse>;
type Props = MainStackScreenProps<'AllNews'>;
const AllNewsScreen: React.FC<Props> = ({navigation, route}) => {
  const {autoFocus} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState<string>('');
  const [error, setError] = useState<ErrorType | false>(false);
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyWord = useDebounce<string>(keyword, 500);
  const [news, setNews] = useState<Array<NewsEntity>>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [categories, setCategories] = useState<NewsCategoryEntity[]>([]);
  const [category, setCategory] = useState<number>(-1);
  const [selectTab, setSelectTab] = useState<CategoryTab>({
    id: -1,
    name: 'Tất cả',
  });
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Metadata>({
    page: 1,
    limit: 10,
    total: 0,
  });

  const onSuccess = (data: Array<NewsEntity>) => {
    setError(false);
    setNews(data);
  };
  const onError = (err: ErrorType, m: string) => {
    setError(err);
    setMsg(m);
  };

  useEffect(() => {
    //init data
    if (firstLoad) {
      newsService.getNews(
        {categoryId: category},
        onSuccess,
        onError,
        () => {
          setLoading(true);
        },
        () => {
          setLoading(false);
        },
      );

      newsService.getNewsCategories(
        res => {
          setCategories(res);
        },
        () => {},
      );
      setFirstLoad(false);
    }
  }, [category, firstLoad]);

  useEffect(() => {
    //get data
    if (firstLoad) {
      return;
    }
    newsService.getNews(
      {categoryId: category, info: debouncedKeyWord, page: 1},
      onSuccess,
      onError,
      () => {
        if (error !== false) {
          setLoading(true);
        }
      },
      () => {
        setLoading(false);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, firstLoad, debouncedKeyWord]);

  const onLoadMore = useCallback(
    (page: number) => {
      newsService.getNews(
        {
          categoryId: category,
          page: page,
        },
        (items, meta) => {
          setNews(prev => [...prev, ...items]);
          setMetadata(meta);
        },
        () => {},
        () => {
          setLoadMore(true);
        },
        () => {
          setLoadMore(false);
        },
      );
    },
    [category],
  );
  const onChangeTab = (tab: CategoryTab) => {
    if (!tab.id) {
      return;
    }
    setCategory(tab.id);
    setSelectTab(tab);
  };

  const onSearchPress = (value: string) => {};

  return (
    <Layout.Screen barStyle="light-content">
      <Layout.ScreenHeaderBack title="Tất cả tin tức">
        <View style={style.search}>
          <SearchInput
            autoFocus={autoFocus}
            value={keyword}
            onValueChange={v => setKeyword(v)}
            placeholder="Tìm kiếm theo từ khóa"
            onSearchPress={onSearchPress}
            enablesReturnKeyAutomatically={true}
          />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.SafeAreaContainer edges={['bottom']}>
        <Layout.Loading loading={loading}>
          <Layout.Error error={error} title={msg}>
            <CategoryNewsView
              onSelect={onChangeTab}
              categories={categories}
              selectTab={selectTab}
            />
            <CTFLastList
              scrollEventThrottle={16}
              bounces
              snapToAlignment="center"
              showsVerticalScrollIndicator={false}
              data={news}
              keyExtractor={n => n.getId().toString()}
              renderItem={({item}) => <NewsItemView data={item} />}
              onLoadMore={onLoadMore}
              isLoadMore={isLoadMore}
              paging={metadata}
              style={style.list}
            />
          </Layout.Error>
        </Layout.Loading>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};
export default AllNewsScreen;
