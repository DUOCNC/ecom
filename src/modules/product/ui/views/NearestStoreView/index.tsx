import React, {createRef, useEffect, useState} from 'react';
import {ErrorView, Typography} from 'common-ui';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {bg_can_find_store, ic_right} from 'assets/images';
import InventoryStoreItemView from 'modules/product/ui/views/InventoryStoreItemView';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {StoreEntity} from 'modules/product/models';
import {colors} from 'assets/v2';
import {inventoryService} from 'modules/product/services';
import InventoryDetailStoreView, {
  InventoryDetailPopupRef,
} from '../InventoryDetailStoreView';
import {useAuth} from 'providers/contexts/AuthContext';

interface Props {
  variantId: number;
  onContentChange: (y: number, offsetY: number) => void;
}

const NearestStoreView: React.FC<Props> = ({
  onContentChange,
  variantId,
}: Props) => {
  const inventoryDetailPopupRef = createRef<InventoryDetailPopupRef>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {locationSelected, locations, allLocations} = useAuth();
  const [storeInventories, setStoreInventory] = useState<StoreEntity[]>([]);
  const onPressInventory = () => {
    navigation.navigate(MainRouteConfig.InventoryDetailVariant, {
      variantId: variantId,
    });
  };
  useEffect(() => {
    inventoryService.getStoresWithInventories(
      variantId,
      locationSelected,
      locations,
      allLocations,
      storesInventoryEntity => setStoreInventory(storesInventoryEntity),
      10,
      false,
    );
  }, [variantId, locationSelected, locations, allLocations]);
  return (
    <View
      onLayout={e => {
        onContentChange(e.nativeEvent.layout.y, e.nativeEvent.layout.height);
      }}
      style={style.container}>
      <TouchableOpacity onPress={onPressInventory} style={style.header}>
        <Typography
          textType="medium"
          type="h3"
          style={style.title}
          text={
            locationSelected.locationId === -1
              ? 'Tồn nhóm cửa hàng mặc định'
              : 'Tồn cửa hàng gần nhất'
          }
        />
        <View style={style.btnRight}>
          <Image source={ic_right} />
        </View>
      </TouchableOpacity>
      <View style={style.content}>
        {storeInventories.length > 0 ? (
          <View>
            {storeInventories.map(storeInventory => (
              <InventoryStoreItemView
                key={storeInventory.getId().toString()}
                storeInventoryEntity={storeInventory}
                onPress={() => {
                  inventoryDetailPopupRef.current?.setStore(storeInventory);
                  inventoryDetailPopupRef.current?.open();
                }}
              />
            ))}
          </View>
        ) : (
          <View style={style.errorView}>
            <ErrorView
              imageSize="small"
              image={bg_can_find_store}
              bottom={
                <TouchableOpacity onPress={onPressInventory}>
                  <Typography
                    textType="medium"
                    color={colors.primary.o500}
                    text="Tìm tồn cửa hàng gần nhất"
                  />
                </TouchableOpacity>
              }
              subTitle="Sản phẩm không còn tồn ở các cửa hàng trong phạm vi 30km"
            />
          </View>
        )}
      </View>
      <InventoryDetailStoreView ref={inventoryDetailPopupRef} />
    </View>
  );
};

export default NearestStoreView;
