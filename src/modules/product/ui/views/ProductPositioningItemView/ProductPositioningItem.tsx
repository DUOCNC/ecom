import {ic_placeholder_6080} from 'assets/images';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {ImageLoader, Typography} from 'common-ui';
import BinLocationEntity from 'modules/product/models/entities/BinLocationEntity';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {ic_minus, ic_plus_primary} from 'assets/images';
import CTCheckbox from 'components/Form/CTCheckbox';
interface ProductItemProps {
  data: BinLocationEntity;
  onCheckbox: (item: BinLocationEntity) => void;
  onChangeQuantityItem: (item: BinLocationEntity, value: number) => void;
}

const ProductPositioningItem: React.FC<ProductItemProps> = ({
  data,
  onCheckbox,
  onChangeQuantityItem,
}) => {
  const txtSku = StringUtils.format('{0}', data.getSku());
  const txtInventory = StringUtils.format(
    'Tổng tồn: {0}',
    data.getOnHand() || 0,
  );
  const txtWarehouse = StringUtils.format(
    'Kho CH: {0}',
    data.getStorage() || 0,
  );
  const txtTargetDisplay = StringUtils.format(
    'Mục tiêu trưng bày: {0}',
    data.getShowroomTarget() || 0,
  );
  const txtDisplay = StringUtils.format(
    'Trưng bày: {0}',
    data.getShowroom() || 0,
  );

  const disableMinus = data.getQuantity() === 0;
  // const disableMax = data.getQuantity() === 99999;

  return (
    <TouchableOpacity>
      <View style={style.container}>
        <View style={style.containerImage}>
          <ImageLoader
            style={style.image}
            placeholder={ic_placeholder_6080}
            source={{uri: data.getVariantImage() || ''}}
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
          <View style={style.row}>
            <View style={style.borderRight}>
              <Typography
                style={[style.txt, style.marginTop]}
                type="h5"
                color={colors.warning.o400}
                text={txtInventory}
              />
            </View>
            <View>
              <Typography
                style={[style.txt, style.marginTop]}
                type="h5"
                color={colors.success.o500}
                text={txtWarehouse}
              />
            </View>
          </View>
          <View style={style.row}>
            <View style={style.borderRight}>
              <Typography
                style={[style.txt, style.marginTop]}
                type="h5"
                color={colors.primary.o400}
                text={txtDisplay}
              />
            </View>
            <View>
              <Typography
                style={[style.txt, style.marginTop]}
                type="h5"
                color={colors.primary.o500}
                text={txtTargetDisplay}
              />
            </View>
          </View>
          <View style={style.containerCount}>
            <TouchableOpacity
              disabled={disableMinus}
              onPress={() => {
                onChangeQuantityItem(data, data.getQuantity() - 1);
              }}
              style={[style.btn]}>
              <Image
                style={[style.icBtn, disableMinus && style.iconDisable]}
                source={ic_minus}
              />
            </TouchableOpacity>
            <TouchableOpacity style={style.count}>
              <Typography
                textType="medium"
                type="h2"
                text={data.getQuantity()}
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={false}
              onPress={() => {
                onChangeQuantityItem(data, data.getQuantity() + 1);
              }}
              style={[style.btn]}>
              <Image style={[style.icBtn]} source={ic_plus_primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.checkBox}>
          <CTCheckbox
            value={data.getCheckBox()}
            disabled={!data.getQuantity()}
            onValueChange={value => {
              onCheckbox(data);
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductPositioningItem;
