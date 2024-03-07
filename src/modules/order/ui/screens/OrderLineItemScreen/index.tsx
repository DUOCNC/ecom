import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Layout} from 'common-ui';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {
  GiftContainerView,
  OrderLineItemRef,
  OrderLineItemView,
  PromotionContainerView,
} from '../../views';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {OrderLineItemStyle} from './style';
import {OrderLineEntity} from 'modules/order/models';
import {CTButton} from 'components/Button';
import ScreenBottom from 'common-ui/components/Layout/ScreenBottom';
import {ThemeStyle} from 'assets/theme';
import {MainRouteConfig} from 'config/RouteConfig';
import {orderService, productService} from 'modules/order/services';
import {showError} from 'utils/ToastUtils';
import {StringUtils} from 'common';
import {Font} from 'components/Base/Text';
import {useOrderConfig} from 'modules/order/hook';
import {useAuth} from 'providers/contexts/AuthContext';
import {LineItemTypeLowercase} from 'modules/order/enums/Promotion';

type Props = MainStackScreenProps<'OrderLineItem'>;

const OrderLineItemScreen: React.FC<Props> = ({navigation, route}) => {
  let {order, lineItem, index = 0, isNew = true} = route.params;
  const orderLineItemRef = createRef<OrderLineItemRef>();
  const [orderItem, setOrderItem] = useState<OrderLineEntity | null>(null);
  const {locationSelected} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [isChangeOrderLine, setIsChangeOrderLine] = useState(false);
  const orderConfig = useOrderConfig();
  useEffect(() => {
    if (route.params && route.params.lineItem) {
      setLoading(true);
      const newOrderItem = OrderLineEntity.clone(lineItem);
      setOrderItem(newOrderItem);
      setLoading(false);
      if (!newOrderItem.getSellableInventory(order)) {
        showError('Không cho phép bán khi tồn nhỏ hơn hoặc bằng 0');
      }
      setIsChangeOrderLine(true);
    }
  }, [index, isNew, lineItem, navigation, order, orderConfig, route.params]);

  const onQuantityChange = (quantity: number) => {
    if (!orderItem) {
      return;
    }
    orderItem.setQuantity(quantity);
    const orderClone = OrderLineEntity.clone(orderItem);
    setOrderItem(orderClone);
    setIsChangeOrderLine(true);
  };

  const onAddOrderLine = useCallback(() => {
    if (!orderItem) {
      return;
    }
    navigation.navigate(MainRouteConfig.PosCreate, {
      lineItem: {item: orderItem, index: index, isNew: isNew},
    });
  }, [index, isNew, navigation, orderItem]);

  const onBackOrder = useCallback(() => {
    navigation.navigate(MainRouteConfig.PosCreate, {
      lineItem: {item: null, index: index, isNew: isNew},
    });
  }, [index, isNew, navigation]);

  const onRemoveLineItem = useCallback(() => {
    if (!orderItem) {
      return;
    }
    navigation.navigate(MainRouteConfig.PosCreate, {
      lineItem: {item: null, index: index, isNew: isNew},
    });
  }, [index, isNew, navigation, orderItem]);

  const handleProductItemPress = () => {
    if (!orderItem) {
      return false;
    }
    navigation.navigate(MainRouteConfig.VariantDetail, {
      variantId: orderItem.getVariant().getId(),
      productId: orderItem.getVariant().getProductId(),
      sku: orderItem.getVariant().getSku(),
    });
  };

  const onChangeGifts = (gifts: Array<OrderLineEntity>) => {
    if (!orderItem) {
      return;
    }
    setOrderItem(orderService.updateGifts(orderItem, gifts));
  };
  const changeQuantityGift = (newQuantity: number, i: number) => {
    if (!orderItem) {
      return;
    }
    setOrderItem(orderService.changeQuantityGift(orderItem, newQuantity, i));
  };

  useEffect(() => {
    if (route.params && route.params.barcode) {
      setLoading(true);
      const {type, value} = route.params.barcode;
      navigation.setParams({barcode: undefined, lineItem: undefined});
      if (type === 'variant') {
        productService.getVariantByBarcode(
          locationSelected,
          {info: value, saleable: true},
          variant => {
            const newOrderItem = OrderLineEntity.create(variant);
            setOrderItem(newOrderItem);
            if (!newOrderItem.getSellableInventory(order)) {
              showError('Không cho phép bán khi tồn nhỏ hơn hoặc bằng 0');
            }
          },
          (code, msg) => {
            showError(
              StringUtils.format('Có lỗi khi tìm kiếm sản phẩm: {0}', msg),
            );
          },
          () => {
            setLoading(false);
          },
        );
        return;
      }
    }
  }, [navigation, order, orderConfig, route.params, locationSelected]);

  const bottomAction = useMemo(() => {
    if (!orderItem || !order) {
      return <View />;
    }
    //update
    if (!isNew && orderItem.getQuantityValue() === 0) {
      return (
        <CTButton
          font={Font.Medium}
          onPress={onRemoveLineItem}
          buttonType="destruction"
          text="Xóa khỏi đơn hàng"
          style={OrderLineItemStyle.bottomRemove}
        />
      );
    }
    if (isNew && orderItem.getQuantityValue() === 0) {
      return (
        <CTButton
          font={Font.Medium}
          onPress={onBackOrder}
          text="Quay lại đơn hàng "
        />
      );
    }
    return (
      <CTButton
        disabled={!orderItem.getSellableInventory(order)}
        onPress={onAddOrderLine}
        text="Thêm vào đơn hàng"
        font={Font.Medium}
      />
    );
  }, [isNew, onAddOrderLine, onBackOrder, onRemoveLineItem, order, orderItem]);

  useEffect(() => {
    if (orderItem && order && isChangeOrderLine) {
      orderService.checkInvalidSuggestDiscountOld(
        order,
        orderItem,
        invalid => {
          if (invalid) {
            const newOrderLine = OrderLineEntity.clone(orderItem);
            newOrderLine.setDiscountItems([]);
            setOrderItem(newOrderLine);
            setIsChangeOrderLine(false);
          }
        },
        () => {},
        () => {},
        () => {
          setIsChangeOrderLine(false);
        },
      );
    }
  }, [isChangeOrderLine, order, orderItem]);
  const onPressDeleteProgram = () => {
    if (orderItem) {
      const newOrderLine = OrderLineEntity.clone(orderItem);
      newOrderLine.setGiftProgram(null);
      newOrderLine.setType(LineItemTypeLowercase.NORMAL);
      setOrderItem(newOrderLine);
    }
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title={orderItem && orderItem.getSku()} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
          <Layout.Loading loading={loading}>
            <ScrollView>
              {orderItem && (
                <React.Fragment>
                  <View style={OrderLineItemStyle.variant}>
                    <OrderLineItemView
                      index={index}
                      ref={orderLineItemRef}
                      lineItem={orderItem && orderItem}
                      order={order}
                      onQuantityChange={onQuantityChange}
                      onLineItemPress={handleProductItemPress}
                    />
                  </View>
                  <View style={ThemeStyle.separator} />
                  <PromotionContainerView
                    order={order}
                    lineItem={orderItem}
                    isNew={isNew}
                    lineIndex={index}
                    onQuantityChange={changeQuantityGift}
                  />
                  <View style={ThemeStyle.separator} />
                  <GiftContainerView
                    lineItem={orderItem}
                    isNew={isNew}
                    lineIndex={index}
                    onQuantityChange={changeQuantityGift}
                    onChangeGifts={onChangeGifts}
                    order={order}
                    onPressDeleteProgram={onPressDeleteProgram}
                  />
                  <View style={ThemeStyle.separator} />
                </React.Fragment>
              )}
            </ScrollView>
          </Layout.Loading>
          <ScreenBottom>
            <View style={OrderLineItemStyle.viewBottom}>{bottomAction}</View>
          </ScreenBottom>
        </Layout.SafeAreaContainer>
      </TouchableWithoutFeedback>
    </Layout.Screen>
  );
};

export default OrderLineItemScreen;
