import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Animated} from 'react-native';
import style from './style';
import {ErrorType, Layout, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import HotNewsItemView from '../HotNewsItemView';
import {NewsEntity} from 'modules/news/model/entities';
import newsService from 'modules/news/service/NewsService';

const {FlatList} = Animated;

const HotNewsView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<false | ErrorType>(false);
  const [subError, setSubError] = useState<string>('');
  const [yodyNews, setYodyNews] = useState<Array<NewsEntity>>([]);
  const onSuccess = (result: Array<NewsEntity>) => {
    setYodyNews(result);
  };
  const onError = useCallback((er: ErrorType, msgError: string) => {
    setError(er);
    setSubError(msgError);
  }, []);
  useEffect(() => {
    //call Api
    newsService.getHotNews(
      onSuccess,
      onError,
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    );
  }, [onError]);

  const flatListRef = useRef(null);

  useEffect(() => {
    let counter = 0;
    if (yodyNews.length === 1) {
      return;
    }
    const scrollToNextItem = () => {
      if (flatListRef.current && flatListRef.current.scrollToIndex) {
        const nextIndex = counter + 1;
        flatListRef.current.scrollToIndex({
          animated: true,
          index: nextIndex - 1,
        });
        counter = nextIndex >= yodyNews.length ? 0 : nextIndex;
      }
    };

    const timer = setInterval(() => {
      scrollToNextItem();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [yodyNews]);

  if (yodyNews.length === 0) {
    return <View />;
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Typography
          style={style.headerTitle}
          type="h3"
          text="NỔI BẬT"
          textType="medium"
          color={colors.secondary.o900}
        />
      </View>
      <View style={style.list}>
        <Layout.Loading loading={loading}>
          <FlatList
            ref={flatListRef}
            horizontal
            scrollEventThrottle={16}
            bounces
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            data={yodyNews}
            keyExtractor={news => news.getId().toString()}
            renderItem={({item}) => <HotNewsItemView data={item} />}
          />
        </Layout.Loading>
      </View>
    </View>
  );
};

export default HotNewsView;
