import React from 'react';
import {View} from 'react-native';
import style from './style';
import {NewsEntity} from 'modules/news/model/entities';
import NewsItemView from '../NewsItemView';

interface NewListProps {
  data: Array<NewsEntity>;
}

const NewsListView: React.FC<NewListProps> = ({data}) => {
  return (
    <View style={style.container}>
      <View style={style.list}>
        {data.map(e => {
          return <NewsItemView data={e} key={e.getId()} />;
        })}
      </View>
    </View>
  );
};

export default NewsListView;
