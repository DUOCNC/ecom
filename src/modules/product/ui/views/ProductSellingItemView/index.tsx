import React from 'react';
import {ic_placeholder_6080} from 'assets/images';
import {DimentionUtils, ImageLoader, Typography} from 'common-ui';
import {TopVariantEntity} from 'modules/product/models';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';

interface ProductSellingItemProps {
  data: TopVariantEntity;
}

const MAX_WIDTH = DimentionUtils.scale(132);
const MAX_HEIGHT = DimentionUtils.scale(158);

const ProductSellingItemView: React.FC<ProductSellingItemProps> = ({data}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const txtSale = StringUtils.format('Đã bán: {0}', data.getQuantity());
  const onItemPress = () =>
    navigation.dispatch(
      StackActions.push(MainRouteConfig.VariantDetail, {
        variantId: data.getVariantId(),
        sku: data.getSku(),
        productId: data.getProductId(),
      }),
    );
  return (
    <TouchableOpacity onPress={onItemPress} style={style.container}>
      <View>
        <View
          style={[
            {
              width: MAX_WIDTH,
              height: MAX_HEIGHT,
            },
            style.imageView,
          ]}>
          <ImageLoader
            placeholder={ic_placeholder_6080}
            style={[
              {
                width: MAX_WIDTH,
                height: MAX_HEIGHT,
              },
              style.image,
            ]}
            source={
              data.getImage() ? {uri: data.getImage()} : ic_placeholder_6080
            }
          />
        </View>
        <View
          style={[
            {
              width: MAX_WIDTH,
            },
          ]}>
          <Typography
            style={style.txtVariant}
            type="h4"
            textType="regular"
            color={colors.secondary.o900}
            textAlign="left"
            numberOfLines={2}
            ellipsizeMode="tail"
            text={data.getVariantName()}
          />
          <Typography
            style={style.txtSku}
            type="h5"
            textType="regular"
            color={'#8F9096'}
            textAlign="left"
            numberOfLines={1}
            ellipsizeMode="tail"
            text={data.getSku()}
          />
          <Typography
            style={style.txtSale}
            type="h5"
            textType="regular"
            color={colors.error.o500}
            textAlign="left"
            numberOfLines={1}
            ellipsizeMode="tail"
            text={txtSale}
          />
          <Typography
            style={style.txtSale}
            type="h3"
            textType="medium"
            color={colors.primary.o500}
            textAlign="left"
            numberOfLines={1}
            ellipsizeMode="tail"
            text={data.getRetailPrice()}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductSellingItemView;
