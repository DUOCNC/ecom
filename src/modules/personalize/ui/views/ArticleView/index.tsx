import React, {useEffect, useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import {MyYodyStyle} from './style';
import {normalize} from 'utils/DimensionsUtils';
import {ArticleEntity} from 'modules/personalize/models';
import {homeService} from 'modules/personalize/services';
const PAGE_WIDTH = Dimensions.get('window').width;

const ArticleView: React.FC = () => {
  const [articles, setArticles] = useState<Array<ArticleEntity>>([]);
  useEffect(() => {
    const resultArticle = homeService.getArticles();
    setArticles(resultArticle);
  }, []);
  return (
    <View style={MyYodyStyle.container}>
    </View>
  );
};

export default ArticleView;
