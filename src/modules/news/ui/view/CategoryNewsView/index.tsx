import React, {useEffect, useState} from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {NewsCategoryResponse} from 'modules/news/model/response';
import NewsCategoryEntity from 'modules/news/model/entities/NewsCategoryEntity';

const {FlatList} = Animated;
type CategoryTab = Partial<NewsCategoryResponse>;

type CategoryNewsProps = {
  selectTab: CategoryTab;
  onSelect: (tab: CategoryTab) => void;
  categories: Array<NewsCategoryEntity>;
};
const CategoryNewsView: React.FC<CategoryNewsProps> = ({
  selectTab,
  onSelect,
  categories,
}) => {
  const [status, setStatus] = useState<Array<CategoryTab>>([
    {
      id: -1,
      name: 'Tất cả',
    },
  ]);

  useEffect(() => {
    setStatus(previous => [
      ...previous,
      ...categories.map(e => ({
        id: e.getId(),
        name: e.getName(),
      })),
    ]);
  }, [categories]);
  return (
    <View style={style.container}>
      <FlatList
        style={style.statusContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={status}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onSelect(item);
              }}
              key={index}>
              <View
                style={[
                  style.statusElement,
                  {
                    borderColor:
                      item.id === selectTab.id
                        ? colors.primary.o500
                        : colors.secondary.o300,
                  },
                ]}>
                <Typography
                  textType={item.id === selectTab.id ? 'medium' : 'regular'}
                  text={item.name}
                  color={
                    item.id === selectTab.id
                      ? colors.primary.o500
                      : colors.secondary.o900
                  }
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoryNewsView;
