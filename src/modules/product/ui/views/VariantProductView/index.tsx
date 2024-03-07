import React, {createRef, useEffect, useMemo, useState} from 'react';
import {
  ImageContainerViewer,
  ImageContainerViewerRef,
  ImageLoader,
  Typography,
} from 'common-ui';
import {TouchableOpacity, View, Image} from 'react-native';
import style from './style';
import {
  InventoryEntity,
  ProductEntity,
  VariantColorEntity,
  VariantEntity,
} from 'modules/product/models';
import {productService, inventoryService} from 'modules/product/services';
import {
  bg_size,
  bg_size_child,
  bg_size_male,
  ic_placeholder_150182,
  ic_selected,
} from 'assets/images';
import {colors} from 'assets/v2';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';
import {StringUtils} from 'common';
import {useAuth} from 'providers/contexts/AuthContext';

interface Props {
  variant: VariantEntity;
  product: ProductEntity;
  onVariantSelect: (id: number) => void;
  onContentChange: (y: number, offsetY: number) => void;
}

const images: Array<IImageInfo> = [
  {
    url: '',
    props: {
      source: bg_size_male,
    },
  },
  {
    url: '',
    props: {
      source: bg_size,
    },
  },
  {
    url: '',
    props: {
      source: bg_size_child,
    },
  },
];

const VariantProductView: React.FC<Props> = ({
  product,
  variant,
  onVariantSelect,
  onContentChange,
}) => {
  const sizeRef = createRef<ImageContainerViewerRef>();
  let [variantColors, setVariantColors] = useState<Array<VariantColorEntity>>(
    [],
  );
  let [colorId, setColorId] = useState<number>(variant.getColorId());
  let [inventories, setInventories] = useState<Array<InventoryEntity>>([]);
  const {locationSelected, locations} = useAuth();
  const color = useMemo(() => {
    return variantColors.find(item => item.getColorId() === colorId);
  }, [colorId, variantColors]);

  const variantInventories = useMemo(() => {
    if (inventories.length === 0 || color === undefined) {
      return [];
    }
    let data = color.getVariants().map(v => {
      let index = inventories.findIndex(
        item => item.getVariantId() === v.getId(),
      );
      if (index === -1) {
        return {
          variant: v,
          inventory: '0',
        };
      }
      return {
        variant: v,
        inventory: inventories[index].getAvailable(),
      };
    });
    return data;
  }, [color, inventories]);

  const onColorPress = (selectedColorId: number) => {
    setColorId(selectedColorId);
    let variantNewColor = product
      .getVariants()
      .filter(item => item.getColorId() === selectedColorId);

    let index = variantNewColor.findIndex(
      item => item.getSizeId() === variant.getSizeId(),
    );
    if (index === -1) {
      onVariantSelect(variantNewColor[0].getId());
      return;
    }
    onVariantSelect(variantNewColor[index].getId());
  };

  const showSize = () => sizeRef.current?.show(images, 0);

  /**
   * Handle get variant color
   */
  useEffect(() => {
    setVariantColors(productService.getColors(product));
  }, [product]);

  /**
   * Handle Get Inventories
   */
  useEffect(() => {
    let variantIds = product
      .getVariants()
      .map(variantItem => variantItem.getId());
    inventoryService.getInventoriesByListId(
      variantIds,
      locationSelected,
      locations,
      rsVariantInventory => {
        setInventories(rsVariantInventory);
      },
    );
  }, [locationSelected, locations, product]);
  return (
    <View
      onLayout={e => {
        onContentChange(e.nativeEvent.layout.y, e.nativeEvent.layout.height);
      }}
      style={style.container}>
      <View style={style.header}>
        <Typography
          textType="medium"
          type="h3"
          style={style.title}
          text="Sản phẩm cùng loại"
        />
      </View>
      <View style={style.content}>
        {color && (
          <View>
            <Typography
              textType="medium"
              text={
                <>
                  Màu sắc{': '}
                  <Typography text={color.getColor()} />
                </>
              }
            />
            <View style={style.colorView}>
              {variantColors.map(item => (
                <TouchableOpacity
                  onPress={() => onColorPress(item.getColorId())}
                  style={[style.containerItem]}
                  key={item.getKey()}>
                  {item.getColorId() === colorId && (
                    <Image style={style.icSelected} source={ic_selected} />
                  )}
                  <ImageLoader
                    style={[
                      style.img,
                      item.getColorId() === colorId && style.imgSelected,
                    ]}
                    source={{uri: item.getImage()}}
                    placeholder={ic_placeholder_150182}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={style.viewSize}>
              <Typography textType="medium" text="Size" />
              <TouchableOpacity onPress={showSize}>
                <Typography
                  textDecorationLine="underline"
                  color={colors.primary.o500}
                  text="Bảng size chuẩn"
                />
              </TouchableOpacity>
            </View>
            <View style={style.sizeContent}>
              {variantInventories.map(item => (
                <TouchableOpacity
                  onPress={() => onVariantSelect(item.variant.getId())}
                  style={[
                    style.itemSize,
                    item.variant.getId() === variant.getId() &&
                      style.itemSizeSelect,
                  ]}
                  key={item.variant.getKey()}>
                  {item.variant.getId() === variant.getId() && (
                    <Image style={style.icSelected} source={ic_selected} />
                  )}
                  <Typography
                    text={StringUtils.format(
                      '{0} ({1})',
                      item.variant.getSize(),
                      item.inventory,
                    )}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
      <ImageContainerViewer ref={sizeRef} />
    </View>
  );
};

export default VariantProductView;
