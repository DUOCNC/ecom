import React, {useCallback, useEffect, useRef, useState} from 'react';
import {DimentionUtils, Layout, Typography} from 'common-ui';
import {TabViewConfigs} from 'modules/product/config';
import {MainStackScreenProps, RootStackParamList} from 'ui/screens/MainStack';
import {
  SearchProductView,
  SlideImageView,
  VariantApplicationView,
  VariantInfoView,
  VariantProductView,
  VariantPromotionView,
} from '../../views';
import {
  View,
  Animated,
  NativeScrollEvent,
  ScrollView as RNScrollView,
  TouchableOpacity,
  FlatList as RNFlatList,
} from 'react-native';
import style from './style';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainRouteConfig} from 'config/RouteConfig';
import {inventoryService, productService} from 'modules/product/services';
import {TabView, VariantEntity} from 'modules/product/models';
import {colors} from 'assets/v2';
import {InventoryEntity, ProductEntity} from 'modules/product/models';
import NearestStoreView from '../../views/NearestStoreView/index';
import {useAuth} from 'providers/contexts/AuthContext';
import ShowroomInventoryEntity from 'modules/product/models/entities/ShowroomInventoryEntity';
import {MaterialEntity} from 'modules/product/models/entities';

const {ScrollView, FlatList} = Animated;

const HEIGHT = DimentionUtils.scale(375 + 150);

type Props = MainStackScreenProps<'VariantDetail'>;
const VariantDetailScreen: React.FC<Props> = ({route}) => {
  const contentRef = useRef<RNScrollView>(null);
  const flatListRef = useRef<RNFlatList>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const animation = useRef(new Animated.Value(0)).current;
  const [tabs, setTabs] = useState<Array<TabView>>(TabViewConfigs);
  const [selectTab, setSelectTab] = useState<number>(-1);
  const [product, setProduct] = useState<ProductEntity | null>(null);
  const [variant, setVariant] = useState<VariantEntity | null>(null);

  const [materials, setMaterials] = useState<Array<MaterialEntity>>([
    MaterialEntity.createEmpty(),
  ]);
  const {locationSelected, locations} = useAuth();
  const [variantInventory, setVariantInventory] =
    useState<InventoryEntity | null>(null);
  const [showroomInventory, setShowroomInventory] =
    useState<ShowroomInventoryEntity | null>(
      ShowroomInventoryEntity.createEmpty(-1),
    );
  const {variantId, sku, productId} = route.params;
  const [id, setId] = useState<number>(variantId);

  const onSearchPress = () => {
    navigation.navigate(MainRouteConfig.VariantSearch);
  };
  const opacity = animation.interpolate({
    inputRange: [DimentionUtils.scale(375 - 100), DimentionUtils.scale(375)],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const height = animation.interpolate({
    inputRange: [DimentionUtils.scale(375 - 100), DimentionUtils.scale(375)],
    outputRange: [0, DimentionUtils.scale(44)],
    extrapolate: 'clamp',
  });

  const updateTab = (y: number, offsetY: number, index: number) => {
    tabs[index] = {
      ...tabs[index],
      y: y - HEIGHT > 0 ? y - HEIGHT : 10,
      offsetY: y - HEIGHT + offsetY,
    };
    setTabs([...tabs]);
  };

  const onViewChange = useCallback(
    (h: number) => {
      let hSet = h - HEIGHT;
      let index = tabs.findIndex(tab => {
        return hSet >= tab.y && hSet < tab.offsetY;
      });
      if (selectTab !== index) {
        setSelectTab(index);
      }
    },
    [selectTab, tabs],
  );

  useEffect(() => {
    if (product === null) {
      return;
    }
    let variantSelected = product.getVariantById(id);
    if (variantSelected === null) {
      return;
    }
    setVariant(variantSelected);
  }, [id, product]);
  useEffect(() => {
    productService.getProduct(
      productId,
      () => {},
      entity => {
        setProduct(entity);
      },
      (code, error) => console.log(code, error),
    );
  }, [productId]);
  useEffect(() => {
    if (selectTab === -1) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      index: selectTab,
      animated: true,
      viewOffset: 100,
    });
  }, [selectTab]);
  useEffect(() => {
    inventoryService.getInventories(
      id,
      locationSelected,
      locations,
      rsVariantInventory => setVariantInventory(rsVariantInventory),
    );
  }, [id, locationSelected, locations]);
  useEffect(() => {
    if (locationSelected.locationId !== -1) {
      inventoryService.getShowroomInventories(
        [id],
        locationSelected,
        rsVariantShowroomInventory =>
          setShowroomInventory(rsVariantShowroomInventory),
      );
    }
  }, [id, locationSelected]);

  useEffect(() => {
    if (product) {
      productService.getMainMaterials(
        product,
        () => {},
        (entities: MaterialEntity[]) => {
          if (entities.length === 0) {
            return;
          }
          setMaterials(entities);
        },
        () => {},
      );
    }
  }, [product]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title={sku.trim()}>
        <View style={style.formSearch}>
          <SearchProductView keyword={''} onSearchPress={onSearchPress} />
        </View>
        <Animated.View
          style={[
            style.toolbar,
            {
              opacity: opacity,
              height: height,
            },
          ]}>
          <FlatList
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tabs}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                disabled={index === selectTab}
                onPress={() => {
                  contentRef.current?.scrollTo({
                    y: HEIGHT + item.y,
                    animated: true,
                  });
                }}
                style={style.btnTab}>
                <Typography
                  style={style.txtTab}
                  type="h3"
                  textType={index === selectTab ? 'medium' : 'regular'}
                  color={
                    index === selectTab
                      ? colors.primary.o500
                      : colors.secondary.o500
                  }
                  text={item.name}
                />
                {index === selectTab && <View style={style.tabSelected} />}
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </Layout.ScreenHeaderBack>
      <Layout.SafeAreaContainer
        edges={['bottom', 'left', 'right']}
        backgroundColor={colors.base.white}>
        <Layout.Loading
          position="top"
          loading={product == null || variantInventory == null}>
          {product && variant && variantInventory && showroomInventory && (
            <ScrollView
              ref={contentRef}
              onScroll={Animated.event<NativeScrollEvent>(
                [{nativeEvent: {contentOffset: {y: animation}}}],
                {
                  useNativeDriver: false,
                  listener: event => {
                    const offsetY = event.nativeEvent.contentOffset.y;
                    onViewChange(offsetY);
                  },
                },
              )}
              showsVerticalScrollIndicator={false}>
              <SlideImageView variantImages={variant.getVariantImages()} />
              <VariantInfoView
                inventory={variantInventory}
                showroomInventory={showroomInventory}
                variant={variant}
              />
              <VariantProductView
                onContentChange={(y, offsetY) => updateTab(y, offsetY, 0)}
                product={product}
                variant={variant}
                onVariantSelect={idSelected => setId(idSelected)}
              />
              <VariantPromotionView
                onContentChange={(y, offsetY) => updateTab(y, offsetY, 1)}
                variant={variant}
              />
              <VariantApplicationView
                onContentChange={(y, offsetY) => updateTab(y, offsetY, 2)}
                product={product}
                materials={materials}
              />
              <NearestStoreView
                onContentChange={(y, offsetY) => updateTab(y, offsetY, 3)}
                variantId={id}
              />
            </ScrollView>
          )}
        </Layout.Loading>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default VariantDetailScreen;
