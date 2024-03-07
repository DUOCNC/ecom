import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {FlatListItemControl, Layout, Typography} from 'common-ui';
import React from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import style from './style';
import {VariantEntity} from 'modules/product/models';

interface Props {
  keyword: string;
  suggestions: VariantEntity[];
  onPress: (keyword: string) => void;
  onVariantPress: (variant: VariantEntity) => void;
}

const {FlatList} = Animated;

const ProductSuggestionView: React.FC<Props> = ({
  keyword,
  suggestions,
  onPress,
  onVariantPress,
}) => {
  return (
    <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
      <FlatList
        style={style.flatlist}
        showsVerticalScrollIndicator={false}
        data={suggestions}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <React.Fragment>
            <TouchableOpacity
              onPress={() => onPress(keyword)}
              style={style.item}>
              <Typography
                color={colors.secondary.o900}
                type="h3"
                text={
                  <>
                    Tìm kiếm từ khóa
                    <Typography
                      type="h3"
                      textType="medium"
                      text={StringUtils.format(' "{0}"', keyword)}
                      color={colors.secondary.o900}
                    />
                  </>
                }
              />
            </TouchableOpacity>
            <FlatListItemControl.Separator />
          </React.Fragment>
        }
        ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onVariantPress(item)}
            style={style.item}>
            <Typography
              numberOfLines={1}
              ellipsizeMode="tail"
              color={colors.secondary.o900}
              type="h3"
              text={item.getName()}
            />
          </TouchableOpacity>
        )}
      />
    </Layout.SafeAreaContainer>
  );
};

export default ProductSuggestionView;
