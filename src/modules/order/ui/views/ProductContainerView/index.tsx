import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  ic_add_circle,
  ic_cart,
  ic_gift_grey,
  ic_money_tag,
} from 'assets/images';
import {colors} from 'assets/v2';
import {Typography} from 'common-ui';
import {OrderEntity, OrderLineEntity} from 'modules/order/models';
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {RootStackParamList} from 'ui/screens/MainStack';
import style from './style';
import {MainRouteConfig} from 'config/RouteConfig';
import LineItemView from '../LineItemView';
import {useDispatch} from 'react-redux';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {ThemeStyle} from 'assets/theme';
import LineItemPosCreateView from 'modules/order/ui/views/LineItemPosCreateView';

interface Props {
  order: OrderEntity;
  lineItems: Array<OrderLineEntity>;
  onQuantityChange: (newQuantity: number, index: number) => void;
  clearLineItem: (index: number) => void;
  clearDiscountItem: (item: OrderLineEntity, index: number) => void;
}

const ProductContainerView: React.FC<Props> = ({
  order,
  lineItems,
  onQuantityChange,
  clearLineItem,
  clearDiscountItem,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onNavigateProduct = () => {
    navigation.navigate(MainRouteConfig.AddProductOrder, {
      link: MainRouteConfig.PosCreate,
      order: order,
    });
  };
  const onLineItemPress = (item: OrderLineEntity, i: number) => {
    navigation.navigate(MainRouteConfig.VariantDetail, {
      variantId: item.getVariantId(),
      sku: item.getSku(),
      productId: item.getProductId(),
    });
    // navigation.navigate(MainRouteConfig.OrderLineItem, {
    //   lineItem: item,
    //   index: i,
    //   isNew: false,
    //   order: order,
    // });
  };
  const onRemoveLineItem = (index: number) => {
    dispatch(
      showConfirm({
        buttonType: 'default',
        cancelButtonType: 'destruction',
        title: 'Xoá sản phẩm khỏi đơn hàng',
        message: 'Bạn có chắc chắn muốn xoá sản phẩm khỏi đơn hàng không?',
        okText: 'Xác nhận',
        cancelText: 'Hủy',
        onCancel: () => {
          dispatch(hideModal());
        },
        onOk: () => {
          dispatch(hideModal());
          clearLineItem(index);
        },
      }),
    );
  };
  const onPressPromotion = (lineItem: OrderLineEntity, index: number) => {
    navigation.navigate(MainRouteConfig.PickPromotion, {
      lineItem: lineItem,
      lineIndex: index,
      isNew: false,
      order,
    });
  };
  return (
    <View>
      {!lineItems || lineItems.length === 0 ? (
        <View style={style.emptyState}>
          <View style={style.emptyView}>
            <Image source={ic_cart} />
            <Typography
              style={style.txtEmpty}
              color={colors.secondary.o500}
              text="Đơn hàng chưa có sản phẩm nào!"
            />
            <TouchableOpacity onPress={onNavigateProduct} style={style.btnAdd}>
              <Image source={ic_add_circle} />
              <Typography
                textType="medium"
                type="h3"
                color={colors.primary.o500}
                style={style.txtAdd}
                text="Chọn sản phẩm"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={style.container}>
          {lineItems.map((item, index) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    onLineItemPress(item, index);
                  }}
                  key={index}>
                  <LineItemView
                    onQuantityChange={onQuantityChange}
                    index={index}
                    lineItem={item}
                    onRemoveLineItem={onRemoveLineItem}
                    order={order}
                  />
                </TouchableOpacity>
                {item && item.getGiftProgram() && (
                  <View style={style.giftProgramLineItemViewContainer}>
                    <LineItemPosCreateView
                      title={item.getGiftProgram()?.getTitle() ?? ''}
                      icon={ic_gift_grey}
                    />
                  </View>
                )}
                {item &&
                  item.getDiscountItems().length > 0 &&
                  item.getDiscountItems()[0].getSuggestedDiscounts().length >
                    0 && (
                    <TouchableOpacity
                      onPress={() => {
                        onPressPromotion(item, index);
                      }}
                      style={style.giftProgramLineItemViewContainer}>
                      <LineItemPosCreateView
                        title={
                          item
                            .getDiscountItems()[0]
                            .getSuggestedDiscounts()[0]
                            .getTitle() ?? ''
                        }
                        icon={ic_money_tag}
                        onClear={() => {
                          clearDiscountItem(item, index);
                        }}
                      />
                    </TouchableOpacity>
                  )}
                {lineItems.length !== index + 1 && (
                  <View style={ThemeStyle.separator} />
                )}
              </>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default ProductContainerView;
