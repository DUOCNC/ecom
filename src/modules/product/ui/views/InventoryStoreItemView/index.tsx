import React, {PropsWithChildren} from 'react';
import {Typography} from 'common-ui';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {ic_store_house} from 'assets/images';
import {colors} from 'assets/v2';
import {StoreEntity} from 'modules/product/models';

interface Props {
  variantId?: number;
  storeInventoryEntity: StoreEntity;
  onPress?: () => void;
}

const InventoryStoreItemView: React.FC<Props> = (
  props: PropsWithChildren<Props>,
) => {
  const {storeInventoryEntity} = props;
  return (
    <TouchableOpacity style={style.container} onPress={props.onPress}>
      <View style={style.icon}>
        <Image source={ic_store_house} />
      </View>
      <View style={style.data}>
        <Typography
          textType="medium"
          style={style.title}
          type="h3"
          text={storeInventoryEntity.getName()}
        />
        <View style={style.rowData}>
          <Typography
            textType="regular"
            style={style.subTitle}
            text="Tổng tồn"
          />
          <Typography
            textType="medium"
            style={style.value}
            text={
              <>
                :{' '}
                <Typography
                  textType="medium"
                  color={colors.primary.o500}
                  type="h4"
                  style={style.value}
                  text={storeInventoryEntity.getInventory().getTotalStock()}
                />
              </>
            }
          />
        </View>
        <View style={style.rowData}>
          <Typography
            textType="regular"
            style={style.subTitle}
            text="Có thể bán"
          />
          <Typography
            color={colors.primary.o500}
            textType="medium"
            type="h4"
            style={style.value}
            text={
              <>
                :{' '}
                <Typography
                  textType="medium"
                  color={colors.primary.o500}
                  type="h4"
                  style={style.value}
                  text={storeInventoryEntity.getInventory()?.getAvailable()}
                />
              </>
            }
          />
        </View>
        <View style={style.rowData}>
          <Typography
            textType="regular"
            style={style.subTitle}
            text="Địa chỉ"
          />
          <Typography
            color={colors.primary.o500}
            textType="regular"
            type="h4"
            numberOfLines={2}
            style={style.value}
            text={
              <>
                :{' '}
                <Typography
                  textType="regular"
                  type="h4"
                  style={style.value}
                  text={storeInventoryEntity.getAddress()}
                />
              </>
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InventoryStoreItemView;
