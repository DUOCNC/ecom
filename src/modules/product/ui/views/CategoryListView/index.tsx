import {useAppSelector} from 'hook/CustomReduxHook';
import {CategoryEntity} from 'modules/product/models';
import React, {useEffect, useMemo, useState} from 'react';
import {Animated, useWindowDimensions, View} from 'react-native';
import {productService} from 'modules/product/services';
import CategoryItemView from '../CategoryItemView';
import {DimentionUtils} from 'common-ui';

const {FlatList} = Animated;

const CategoryListView: React.FC = () => {
  const deviceWidth = useWindowDimensions().width;
  const paddingWidth = DimentionUtils.scale(16);
  const width = useMemo(() => {
    return (deviceWidth - paddingWidth * 6) / 5;
  }, [deviceWidth, paddingWidth]);
  const [categoryEntities, setCategoryEntities] = useState<
    Array<CategoryEntity>
  >([]);
  const categoryReducer = useAppSelector(state => state.category);
  useEffect(() => {
    if (categoryReducer.isLoad) {
      let rsCategoryEntity = productService.getCategoryEntity(
        categoryReducer.data,
      );
      setCategoryEntities(rsCategoryEntity);
    }
  }, [categoryReducer.data, categoryReducer.isLoad]);
  return (
    <View>
      <FlatList
        bounces={true}
        scrollEventThrottle={10}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={item => item.getId()}
        data={categoryEntities}
        snapToAlignment="center"
        pagingEnabled
        renderItem={({item, index}) => (
          <CategoryItemView
            last={index === categoryEntities.length - 1}
            width={width}
            paddingWidth={paddingWidth}
            data={item}
          />
        )}
      />
    </View>
  );
};

export default CategoryListView;
