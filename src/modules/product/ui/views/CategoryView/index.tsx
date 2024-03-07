import {colors} from 'assets/v2';
import {Typography} from 'common-ui';
import React from 'react';
import {View} from 'react-native';
import CategoryListView from '../CategoryListView';
import style from './style';

const CategoryView: React.FC = () => {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Typography
          type="h3"
          text="Danh mục sản phẩm"
          textType="medium"
          color={colors.secondary.o900}
        />
      </View>
      <View style={style.list}>
        <CategoryListView />
      </View>
    </View>
  );
};

export default CategoryView;
