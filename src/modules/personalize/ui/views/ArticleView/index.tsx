import React, {useEffect, useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import {MyYodyStyle} from './style';
import Carousel from 'react-native-reanimated-carousel';
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
      <Carousel
        loop
        width={PAGE_WIDTH}
        data={articles}
        height={normalize(180)}
        mode="parallax"
        autoPlay={true}
        renderItem={({item}) => (
          <Image
            style={MyYodyStyle.img}
            key={item.getId()}
            resizeMode="cover"
            source={item.getSource()}
          />
        )}
        modeConfig={{
          parallaxScrollingOffset: 90,
          parallaxScrollingScale: 0.8,
        }}
      />
    </View>
  );
};

export default ArticleView;
