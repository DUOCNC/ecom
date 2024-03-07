import {colors} from 'assets/v2';
import {Typography} from 'common-ui';
import {CategoryEntity} from 'modules/product/models';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';

export interface CategoryItemViewProps {
  data: CategoryEntity;
  paddingWidth: number;
  width: number;
  last: boolean;
}

const CategoryItemView: React.FC<CategoryItemViewProps> = ({
  data,
  paddingWidth,
  width,
  last,
}) => {
  const marginRight = last ? 0 : paddingWidth;
  return (
    <TouchableOpacity>
      <View
        style={[
          {
            marginRight: marginRight,
            width: width,
          },
        ]}>
        <View
          style={[
            {
              width: width,
              height: width,
            },
            style.container,
          ]}>
          <Image style={style.icon} source={{uri: data.getUrl()}} />
        </View>
        <Typography
          color={colors.secondary.o900}
          textAlign="center"
          type="h5"
          textType="medium"
          style={[{width: width}, style.title]}
          text={data.getCategory()}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItemView;
