import {Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {ErrorType, Layout, SearchView} from 'common-ui';
import style from './style';
import HotNewsView from '../../view/HotNewsView';
import {NewsEntity} from 'modules/news/model/entities';
import {CategoryNewsView, NewsListView} from '../../view';
import newsService from 'modules/news/service/NewsService';
import NewsCategoryEntity from 'modules/news/model/entities/NewsCategoryEntity';
import {NewsCategoryResponse} from 'modules/news/model/response';
import {MainRouteConfig} from 'config/RouteConfig';
import {CTButton} from 'components/Button';
import {Font} from 'components/Base/Text';
import EmptyState from 'components/CTScreen/EmptyState';
import {bg_empty} from 'assets/images';

type CategoryTab = Partial<NewsCategoryResponse>;
type Props = MainStackScreenProps<'News'>;
const NewsScreen: React.FC<Props> = ({navigation, route}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState<string>('');
  const [error, setError] = useState<ErrorType | false>(false);
  const [news, setNews] = useState<Array<NewsEntity>>([]);
  const [category, setCategory] = useState<number>(-1);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [categories, setCategories] = useState<NewsCategoryEntity[]>([]);
  const [selectTab, setSelectTab] = useState<CategoryTab>({
    id: -1,
    name: 'Tất cả',
  });
  const {View, ScrollView} = Animated;

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
        {categoryId: category, limit: 20},
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
      {categoryId: category, page: 1, limit: 20},
      onSuccess,
      () => {
        setNews([]);
      },
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
  }, [category, firstLoad]);

  const onChangeTab = (tab: CategoryTab) => {
    if (!tab.id) {
      return;
    }
    setCategory(tab.id);
    setSelectTab(tab);
  };

  const onSeeMore = () => {
    navigation.navigate(MainRouteConfig.AllNews, {autoFocus: false});
  };

  const onBack = () => {
    navigation.navigate(MainRouteConfig.Main);
  };

  return (
    <Layout.Screen barStyle="light-content">
      <Layout.ScreenHeaderBack title="YODY News" onBackPress={onBack}>
        <View style={style.search}>
          <SearchView
            title="Tìm kiếm theo từ khóa"
            themeStyle="dark"
            onPress={() => {
              navigation.navigate(MainRouteConfig.AllNews, {autoFocus: true});
            }}
          />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.SafeAreaContainer edges={['bottom']}>
        <Layout.Loading loading={loading}>
          <Layout.Error error={error} title={msg}>
            <ScrollView
              style={style.container}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              scrollEventThrottle={16}>
              <HotNewsView />
              <View style={style.list}>
                <CategoryNewsView
                  onSelect={onChangeTab}
                  categories={categories}
                  selectTab={selectTab}
                />
                {news.length > 0 ? (
                  <View>
                    <NewsListView data={news} />
                    <View style={style.viewBottom}>
                      <CTButton
                        onPress={onSeeMore}
                        text="Xem thêm"
                        font={Font.Medium}
                      />
                    </View>
                  </View>
                ) : (
                  <EmptyState title="Không có bài viết nào" icon={bg_empty} />
                )}
              </View>
            </ScrollView>
          </Layout.Error>
        </Layout.Loading>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};
export default NewsScreen;
