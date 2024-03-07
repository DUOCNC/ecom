import React, {useState} from 'react';
import {TouchableOpacity, View, Image, Dimensions} from 'react-native';
import {InventoryEntity, VariantEntity} from 'modules/product/models';
import style from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {ic_arrow} from 'assets/images';
import BarcodeGen from '@kichiyaki/react-native-barcode-generator';
import ShowroomInventoryEntity from 'modules/product/models/entities/ShowroomInventoryEntity';
import {useAuth} from 'providers/contexts/AuthContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';

interface Props {
  variant: VariantEntity;
  inventory: InventoryEntity;
  showroomInventory: ShowroomInventoryEntity;
  onLayout?: (height: number) => void;
}

const DefaultWidth = Dimensions.get('screen').width;

const VariantInfoView: React.FC<Props> = ({
  variant,
  inventory,
  showroomInventory,
}) => {
  const [visibleBarcode, setVisibleBarcode] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onBarcodeVisible = () => {
    setVisibleBarcode(!visibleBarcode);
  };
  const {locationSelected} = useAuth();
  const onTransposition = () => {
    navigation.navigate(MainRouteConfig.ProductPositioning, {
      keyword: variant.getSku(),
    });
  };

  return (
    <View style={style.container}>
      <Typography
        numberOfLines={2}
        ellipsizeMode="tail"
        textType="medium"
        type="h3"
        text={variant.getName()}
      />
      <TouchableOpacity onPress={onBarcodeVisible} style={style.btnSku}>
        <Typography
          color={colors.secondary.o500}
          textType="regular"
          text={StringUtils.format('SKU: {0}', variant.getSku())}
        />
        <Image
          style={[style.iconArrow, visibleBarcode && style.iconArrowTransform]}
          source={ic_arrow}
        />
      </TouchableOpacity>
      {visibleBarcode && (
        <View style={style.viewBarCode}>
          <BarcodeGen
            format="CODE128"
            value={variant.getBarcode()}
            maxWidth={DefaultWidth}
          />
          <Typography
            color={colors.secondary.o400}
            text={variant.getBarcode()}
            textAlign="center"
            style={style.txtBarcode}
          />
        </View>
      )}
      <View style={style.rowInventory}>
        <Typography
          color={colors.warning.o400}
          text={StringUtils.format('Tổng tồn: {0}', inventory.getTotalStock())}
        />
        {locationSelected.locationId !== -1 && (
          <>
            <View style={style.rule} />
            <Typography
              color={colors.success.o400}
              text={StringUtils.format(
                'Kho CH: {0}',
                showroomInventory.getStorageValue(),
              )}
            />
            <View style={style.rule} />
            <Typography
              color={colors.primary.o400}
              text={StringUtils.format(
                'Trưng bày: {0}',
                showroomInventory.getShowroomValue(),
              )}
            />
            {/* <View style={style.rule} />
            <Typography
              onPress={onTransposition}
              color={colors.primary.o500}
              text="Chuyển vị trí"
              style={style.fontWeight}
            /> */}
          </>
        )}
      </View>
      <View style={style.rowPrice}>
        <Typography
          color={colors.primary.o500}
          textType="medium"
          type="h2"
          text={variant.getRetailPrice()}
        />
      </View>
    </View>
  );
};

export default VariantInfoView;
