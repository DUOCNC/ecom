import {ActivityIndicator, Dimensions, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {
  DimentionUtils,
  ErrorType,
  ImageLoader,
  Layout,
  Typography,
} from 'common-ui';
import {style} from './style';
import {bg_empty, bg_empty_url, ic_placeholder_6080} from 'assets/images';
import {NewsEntity} from 'modules/news/model/entities';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import RenderHTML from 'react-native-render-html';
import {ScrollView} from 'react-native-gesture-handler';
import {NewsItemView} from '../../view';
import newsService from 'modules/news/service/NewsService';
import {MainRouteConfig} from 'config/RouteConfig';
import EmptyState from 'components/CTScreen/EmptyState';
import FileViewer from 'modules/personalize/ui/screens/TabHome/FileView';

const MAX_WIDTH = Dimensions.get('screen').width;
const MAX_HEIGHT = DimentionUtils.scale(236);

type Props = MainStackScreenProps<'NewsDetail'>;
const defaultWidth = Dimensions.get('screen').width - 48;
const NewsDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {id} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState<string>('');
  const [error, setError] = useState<ErrorType | false>(false);
  const [data, setData] = useState<NewsEntity>(NewsEntity.createEmpty());
  const [yodyNews, setYodyNews] = useState<Array<NewsEntity>>([]);
  const fileContent = data.getContentFile();

  const newsOther = useMemo(() => {
    const news = yodyNews.filter(p => p.getId() !== data.getId());
    return news.length > 0 ? (
      news.map(e => {
        return <NewsItemView key={e.getId()} data={e} />;
      })
    ) : (
      <EmptyState
        icon={bg_empty}
        title="Không tìm thấy bài viết cùng danh mục"
      />
    );
  }, [data, yodyNews]);

  useEffect(() => {
    //get data
    setLoading(true);
    newsService.getNewsDetail(
      id,
      res => {
        setData(res);
      },
      (err, m) => {
        setError(err);
        setMsg(m);
      },
      () => setLoading(true),
      () => setLoading(false),
    );
    setLoading(false);
  }, [id]);

  useEffect(() => {
    const category = data.getNewsCategory();
    if (category && category.getId()) {
      const categoryId = category.getId();
      if (!categoryId) {
        return;
      }
      newsService.getNewsOther(
        categoryId,
        res => {
          setYodyNews(res);
        },
        (err, m) => {
          setError(err);
          setMsg(m);
        },
        () => setLoading(true),
        () => setLoading(false),
      );
    }
  }, [data]);

  const enrichValue = useMemo(() => {
    if (!data.getContent()) {
      if (data.getDescription()) {
        return data.getDescription();
      }
      return StringUtils.format('<p>{0}</p>', 'Không có thông tin');
    }
    return data.getContent();
  }, [data]);

  const content = useMemo(
    () => (
      <RenderHTML
        contentWidth={defaultWidth}
        source={{html: enrichValue}}
        tagsStyles={{
          p: style.pStyle,
          body: style.body,
        }}
      />
    ),
    [enrichValue],
  );

  const onBack = () => {
    navigation.navigate(MainRouteConfig.News);
  };
  if (!data.getId()) {
    return <ActivityIndicator />;
  }

  return (
    <Layout.Screen barStyle="light-content">
      <Layout.ScreenHeaderBack title="Chi tiết bài viết" onBackPress={onBack} />
      <Layout.Container>
        <Layout.Loading loading={loading}>
          <Layout.Error error={error} subTitle={msg}>
            <ScrollView style={style.container}>
              <ImageLoader
                placeholder={ic_placeholder_6080}
                style={[
                  {
                    width: MAX_WIDTH,
                    height: MAX_HEIGHT,
                  },
                ]}
                source={
                  data.getThumbnailUrl()
                    ? {uri: data.getThumbnailUrl()}
                    : bg_empty_url
                }
              />
              <View style={style.createdDate}>
                <Typography
                  text={data.getCreatedAtStr()}
                  color={colors.secondary.o400}
                  type="h5"
                />
              </View>
              <View style={style.content}>
                <Typography
                  style={style.title}
                  type="h3"
                  text={data.getTitleUpperCase()}
                  textType="medium"
                  lineHeight={24}
                />
                <View style={style.mainContent}>{content}</View>
                {fileContent && data.getMimetype() && (
                  <View style={style.fileContent}>
                    <FileViewer
                      isFull
                      unAuth
                      fileType={data.getMimetype()}
                      fileUrl={fileContent}
                      onPress={() => {
                        navigation.navigate(MainRouteConfig.File, {
                          fileType: data.getMimetype(),
                          fileUrl: fileContent,
                          unAuth: true,
                        });
                      }}
                    />
                  </View>
                )}

                <Typography
                  style={style.headerTitle}
                  type="h3"
                  text="XEM THÊM BÀI VIẾT KHÁC"
                  textType="medium"
                  color={colors.secondary.o900}
                />
                {newsOther}
              </View>
            </ScrollView>
          </Layout.Error>
        </Layout.Loading>
      </Layout.Container>
    </Layout.Screen>
  );
};
export default NewsDetailScreen;
