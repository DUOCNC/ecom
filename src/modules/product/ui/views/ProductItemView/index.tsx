import {ImageLoader, Typography} from 'common-ui';
import {VariantEntity} from 'modules/product/models';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {ic_placeholder_6080} from 'assets/images';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {RootStackParamList} from 'ui/screens/MainStack';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {MainRouteConfig} from 'config/RouteConfig';

interface ProductItemProps {
  data: VariantEntity;
}

const ProductItemView: React.FC<ProductItemProps> = ({data}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const txtSku = StringUtils.format('Mã: {0}', data.getSku());
  const txtAvaiable = StringUtils.format(
    'Có thể bán: {0}',
    data.getAvailable(),
  );
  const onItemPress = () => {
    navigation.dispatch(
      StackActions.push(MainRouteConfig.VariantDetail, {
        variantId: data.getId(),
        productId: data.getProductId(),
        sku: data.getSku(),
      }),
    );
  };
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View style={style.container}>
        <View style={style.containerImage}>
          <ImageLoader
            style={style.image}
            placeholder={ic_placeholder_6080}
            source={{uri: data.getImage()}}
          />
        </View>

        <View style={style.containerInfo}>
          <Typography
            style={style.txt}
            type="h4"
            numberOfLines={2}
            color={colors.secondary.o900}
            text={data.getName()}
          />
          <Typography
            style={[style.txt, style.marginTop]}
            type="h5"
            color={colors.secondary.o500}
            text={txtSku}
          />
          <Typography
            style={[style.txt, style.marginTop]}
            type="h5"
            color={colors.success.o500}
            text={txtAvaiable}
          />
          <Typography
            style={[style.txt, style.marginTop]}
            type="h4"
            textType="medium"
            color={colors.primary.o500}
            text={data.getRetailPrice()}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItemView;
