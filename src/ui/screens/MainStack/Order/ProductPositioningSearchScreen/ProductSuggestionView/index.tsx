import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {FlatListItemControl, Layout, Typography} from 'common-ui';
import React from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import style from './style';
import BinLocationEntity from 'modules/product/models/entities/BinLocationEntity';

interface Props {
  keyword: string;
  suggestions: Array<BinLocationEntity>;
  onPressItem: (keyword: string, item: BinLocationEntity) => void;
}

const {FlatList} = Animated;

const ProductSuggestionView: React.FC<Props> = ({
  keyword,
  suggestions,
  onPressItem,
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
            <View style={style.item}>
              <Typography
                color={colors.secondary.o900}
                text={
                  <>
                    Tìm kiếm từ khóa
                    <Typography
                      textType="medium"
                      text={StringUtils.format(' "{0}"', keyword)}
                      color={colors.secondary.o900}
                    />
                  </>
                }
              />
            </View>
            <FlatListItemControl.Separator />
          </React.Fragment>
        }
        ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onPressItem(keyword, item)}
            style={style.item}>
            <Typography
              numberOfLines={2}
              ellipsizeMode="tail"
              color={colors.secondary.o900}
              // type="h3"
              text={`${item.getName()} (${item.getSku()})`}
            />
          </TouchableOpacity>
        )}
      />
    </Layout.SafeAreaContainer>
  );
};

export default ProductSuggestionView;
