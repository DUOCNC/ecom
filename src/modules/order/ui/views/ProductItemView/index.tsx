import {ic_placeholder_6080} from 'assets/images';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {ImageLoader, Typography} from 'common-ui';
import {VariantEntity} from 'modules/order/models';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './style';

interface Props {
  variant: VariantEntity;
  onPress: (variant: VariantEntity) => void;
}

const ProductItemView: React.FC<Props> = ({variant, onPress}) => {
  const txtSku = StringUtils.format('Mã: {0}', variant.getSku());
  const txtAvailable = StringUtils.format(
    'Có thể bán: {0}',
    variant.getAvailable(),
  );
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(variant);
      }}>
      <View style={style.container}>
        <View style={style.containerImage}>
          <ImageLoader
            style={style.image}
            placeholder={ic_placeholder_6080}
            source={{uri: variant.getImage()}}
          />
        </View>

        <View style={style.containerInfo}>
          <Typography
            style={style.txt}
            type="h4"
            numberOfLines={2}
            color={colors.secondary.o900}
            text={variant.getName()}
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
            text={txtAvailable}
          />
          <Typography
            style={[style.txt, style.marginTop]}
            type="h4"
            textType="medium"
            color={colors.primary.o500}
            text={variant.getRetailPrice()}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItemView;
