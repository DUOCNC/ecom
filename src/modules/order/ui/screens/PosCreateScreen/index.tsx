import {ic_scan_barcode} from 'assets/images';
import {Layout, SearchView, Typography} from 'common-ui';
import {MainRouteConfig} from 'config/RouteConfig';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import style from './style';
import {
  CustomerContainerRef,
  CustomerContainerView,
  OrderNoteView,
  OrderTabView,
  ProductContainerView,
} from '../../views';
import {OrderEntity} from 'modules/order/models';
import {
  customerService,
  orderService,
  promotionService,
} from 'modules/order/services';
import {showError, showSuccess, showWarning} from 'utils/ToastUtils';
import {StringUtils} from 'common';
import AutoDiscountView from 'modules/order/ui/views/AutoDiscountView';
import {CTButton} from 'components/Button';
import ScreenBottom from 'common-ui/components/Layout/ScreenBottom';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'assets/colors';
import {useAppDispatch} from 'hook';
import {hideModal, showConfirm, showLoading} from 'reduxs/Modals/ModalReducer';
import {
  CustomerDiscountEntity,
  OrderConfigEntity,
  OrderLineEntity,
} from 'modules/order/models/entities';
import {useOrderConfig} from 'modules/order/hook';
import {Font} from 'components/Base/Text';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAuth} from 'providers/contexts/AuthContext';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import {YoScanOrder} from 'modules/order/models/request/CreateCustomerRequest';
import {getMaxKey, getOrderFromLocalOrders} from 'modules/order/utils';
import {TabProps} from 'modules/order/models/request';
import logService from 'modules/personalize/services/LogService';

type Props = MainStackScreenProps<'PosCreate'>;

const Tab1 = () => (
  <View style={style.tabContent}>
    <Typography text="1" />
  </View>
);

const initialTabs = [{key: 'order1', title: 'Đơn 1', component: Tab1}];

const PosCreateScreen: React.FC<Props> = ({navigation, route}) => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const {locationSelected} = useAuth();
  const customerContainerRef = createRef<CustomerContainerRef>();
  const dispatch = useAppDispatch();
  const orderConfig = useOrderConfig();
  const [customerDiscounts, setCustomerDiscounts] = useState<
    Array<CustomerDiscountEntity>
  >([]);
  const [order, setOrder] = useState<OrderEntity>(
    OrderEntity.createEmpty(
      locationSelected.locationId,
      OrderConfigEntity.createOrderConfig(orderConfig),
    ),
  );
  const [isChangeOrder, setIsChangeOrder] = useState(false);
  const onChangeNote = (note: string) => {
    setOrder(orderService.updateNote(order, note));
  };
  const [tabs, setTabs] = useState<Array<TabProps>>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [localOrders] = useState<Array<YoScanOrder>>([]);

  const logCreateTab = () => {
    logService.saveLog({
      function: FunctionLog.ADD_MULTI_YOSCAN,
      screen: ScreenLog.ORDER_SCREEN,
      action: ActionLog.ADD,
      storeId: locationSelected.locationId,
      storeName: locationSelected.locationName,
    });
  };

  const logAction = () => {
    logService.saveLog({
      function: FunctionLog.ADD_YOSCAN_ORDER,
      screen: ScreenLog.POS_CREATE_SCREEN,
      action: ActionLog.ADD,
      customerId: order.getCustomer()?.getCustomerId(),
      storeId: locationSelected.locationId,
      storeName: locationSelected.locationName,
    });
  };

  const action = {
    addTab: () => {
      if (tabs && tabs.length === 3) {
        return;
      }
      logCreateTab();
      //tìm key lớn nhất
      const maxKey = getMaxKey(
        tabs.map(e => e.key),
        'order',
      );
      const newTabKey = `order${maxKey}`;
      const newTabTitle = `Đơn ${maxKey}`;
      const newTabComponent = () => (
        <View style={style.tabContent}>
          <Typography text={newTabTitle} />
        </View>
      );
      const newTab = {
        key: newTabKey,
        title: newTabTitle,
        component: newTabComponent,
      };
      setTabs([...tabs, newTab]);
      const newOrder = OrderEntity.createEmpty(
        locationSelected.locationId,
        OrderConfigEntity.createOrderConfig(orderConfig),
      );
      localOrders.push({title: newTabTitle, key: newTabKey, data: order});
      LocalStorageUtils.setYoScanOrders(JSON.stringify(localOrders));
      setOrder(newOrder);
      if (activeTab === tabs.length - 1) {
        setActiveTab(pre => pre + 1);
      }
      setActiveTab(tabs.length);
    },
    removeTab: (k: string, index: number) => {
      if (tabs.length === 1) {
        setTabs(initialTabs);
        setOrder(
          OrderEntity.createEmpty(
            locationSelected.locationId,
            OrderConfigEntity.createOrderConfig(orderConfig),
          ),
        );
        return;
      }
      const updatedTabs = [...tabs];
      const i = updatedTabs.findIndex(e => e.key === k);
      updatedTabs.splice(i, 1);
      setTabs(updatedTabs);

      //lưu storage
      const indexLocalOrder = localOrders.findIndex(e => e.key === k);
      localOrders.splice(indexLocalOrder, 1);
      LocalStorageUtils.setYoScanOrders(JSON.stringify(localOrders));
      changeTab(0);
    },
  };

  const confirmRemoveOrder = (k: string, index: number) => {
    if (
      (order && order.getLineItems().length > 0) ||
      order.getCustomer() !== null
    ) {
      dispatch(
        showConfirm({
          title: 'Xóa đơn YoScan',
          message:
            'Thông tin của đơn YoScan sẽ không được lưu lại. Bạn có chắc chắn muốn xóa không?',
          okText: 'Xóa',
          cancelText: 'Đóng',
          onCancel: () => {
            dispatch(hideModal());
          },
          onOk: () => {
            action.removeTab(k, index);
            dispatch(hideModal());
          },
        }),
      );
      return;
    }
    action.removeTab(k, index);
  };

  useEffect(() => {
    if (isChangeOrder) {
      const timeOut = setTimeout(() => {
        orderService.checkInvalidDiscountOrderOld(
          order,
          (invalid, showMessage, newOrder) => {
            if (invalid) {
              newOrder.setSuggestedDiscountsEntity([]);
              setOrder(newOrder);
              showMessage && showWarning('Đã cập nhật chiết khấu');
              setIsChangeOrder(false);
            }
          },
          () => {},
          () => {
            dispatch(showLoading());
          },
          () => {
            setIsChangeOrder(false);
            dispatch(hideModal());
          },
        );
      }, 500);
      return () => clearTimeout(timeOut);
    }
  }, [dispatch, isChangeOrder, order]);

  useEffect(() => {
    orderService.getGiftProgram(
      order,
      result => {
        if (result.getIdsVariantNotValid().length > 0) {
          showWarning('Cập nhật chương trình quà tặng');
          setOrder(
            orderService.clearLineItemByVariantId(
              order,
              result.getIdsVariantNotValid(),
            ),
          );
        }
      },
      result => {
        console.log('Lỗi', result);
      },
      () => {},
      () => {},
    );
  }, [order]);

  const isDisableCreateOrder = useMemo(() => {
    return (
      !(order.getLineItems() && order.getLineItems().length > 0) ||
      !order.getCustomer()
    );
  }, [order]);
  let customerId =
    route.params && route.params.customerId ? route.params.customerId : null;
  const navigateAddProductOrder = () => {
    navigation.navigate(MainRouteConfig.AddProductOrder, {
      link: MainRouteConfig.PosCreate,
      order: order,
    });
  };
  const onCustomerClear = () => {
    setOrder(orderService.clearCustomer(order));
    setIsChangeOrder(true);
  };
  const bottom = useSafeAreaInsets().bottom;

  const onBarcodePress = () => {
    navigation.push(MainRouteConfig.OrderBarcodeScan, {
      type: 'customer',
      link: MainRouteConfig.PosCreate,
    });
  };
  const onProductBarcodePress = () => {
    navigation.navigate(MainRouteConfig.OrderBarcodeScan, {
      type: 'variant',
      link: MainRouteConfig.PosCreate,
      order: order,
    });
  };

  const clearLineItem = (index: number) => {
    setOrder(orderService.clearLineItem(order, index));
    setIsChangeOrder(true);
  };

  const clearDiscountItem = (item: OrderLineEntity, index: number) => {
    const orderLineEntity = OrderLineEntity.clone(item);
    orderLineEntity.setDiscountItems([]);
    setOrder(orderService.updateLineItem(order, orderLineEntity, index));
    // setIsChangeOrder(true);
  };
  const onChangeQuantityLineItem = (newQuantity: number, index: number) => {
    setOrder(orderService.changeQuantityLineItem(order, newQuantity, index));
    setIsChangeOrder(true);
  };

  const onCreateOrderCode = () => {
    const storeId = locationSelected.locationId;
    const storeName = locationSelected.locationName;
    let request = order.buildRequestGenerateBarcode(
      {
        storeId,
        store: storeName,
      },
      !!customerContainerRef.current?.checkbox,
    );
    if (!request) {
      return;
    }
    logAction();
    dispatch(showLoading());
    orderService.createDraftOrder(
      request,
      orderDraft => {
        dispatch(hideModal());
        showSuccess('Tạo barcode thành công!');
        if (orderDraft.code) {
          setTimeout(() => {
            navigation.navigate(MainRouteConfig.GenerateBarCode, {
              orderCode: orderDraft.code,
              totalPrice: order.getAmountOrder(),
            });
            // setOrder(
            //   OrderEntity.createEmpty(
            //     locationSelected.locationId,
            //     OrderConfigEntity.createOrderConfig(orderConfig),
            //   ),
            // );
            const keyTab = tabs[activeTab].key;
            action.removeTab(keyTab, activeTab);
          }, 500);
        }
      },
      (code, msg) => {
        dispatch(hideModal());
        showError(msg);
      },
    );
  };

  const onSetOrder = () => {
    setOrder(OrderEntity.clone(order));
  };
  useEffect(() => {
    if (route.params && route.params.order) {
      setOrder(route.params.order);
      navigation.setParams({order: undefined});
    }
  }, [route.params, navigation, order]);

  useEffect(() => {
    if (route.params) {
      if (route.params.customerId) {
        customerService.getCustomerById(
          route.params.customerId,
          () => {},
          customer => {
            promotionService.getCustomerDiscountCodes(
              customer.getId(),
              res => setCustomerDiscounts(res),
              () => {},
            );
            setOrder(orderService.addCustomer(order, customer));
            navigation.setParams({customerId: undefined});
            setIsChangeOrder(true);
          },
          (code, msg) => {
            navigation.setParams({customerId: undefined});
            showError(
              StringUtils.format('Có lỗi khi thêm khách hàng: {0}', msg),
            );
          },
          () => {
            customerContainerRef.current?.unLoading();
          },
        );
      }
    }
  }, [customerId]);

  useEffect(() => {
    if (route.params && route.params.lineItem) {
      const {item, index, isNew} = route.params.lineItem;
      let position = 0;
      if (isNew) {
        position = order.getLineItems().length;
        if (item) {
          setOrder(orderService.addOrderItem(order, item, position));
          setIsChangeOrder(true);
        }
        navigation.setParams({lineItem: undefined});
        return;
      }
      if (!item) {
        setOrder(orderService.clearLineItem(order, index));
        setIsChangeOrder(true);
        navigation.setParams({lineItem: undefined});
        return;
      }
      setOrder(orderService.updateLineItem(order, item, index));
      setIsChangeOrder(true);
      navigation.setParams({lineItem: undefined});
    }
  }, [navigation, order, route.params]);

  useEffect(() => {
    if (route.params && route.params.barcode) {
      const {type, value} = route.params.barcode;
      if (type === 'customer') {
        customerService.searchCustomerBarcode(
          value,
          1,
          () => customerContainerRef.current?.loading(),
          customer => {
            navigation.setParams({barcode: undefined});
            setOrder(orderService.addCustomer(order, customer));
          },
          (code, msg) => {
            showError(
              StringUtils.format('Có lỗi khi thêm khách hàng: {0}', msg),
            );
          },
        );
        return;
      }
    }
  }, [customerContainerRef, navigation, order, route.params]);

  const onChangeAutoDiscount = useCallback(
    (isAuto: boolean) => {
      order.setAutoDiscount(isAuto);
      if (isAuto) {
        //call api tìm cktd có lợi nhất
        orderService.getDiscountsAuto(
          order,
          newOrder => {
            setOrder(newOrder);
          },
          () => {},
          () => {},
        );
      } else {
        //reset về nguyên giá
        setOrder(OrderEntity.resetDiscounts(order));
      }
    },
    [order],
  );

  const onRemoveOrderDiscount = (index: number) => {
    order.removeSuggestDiscount(index);
    const newOrder = OrderEntity.clone(order);
    setOrder(newOrder);
  };

  const onChangePoint = (p: number) => {
    setOrder(orderService.updatePoint(order, p));
  };

  useEffect(() => {
    if (isChangeOrder) {
      orderService.getDiscountsAuto(
        order,
        newOrder => {
          setOrder(newOrder);
        },
        () => {},
        () => {},
        () => {
          setIsChangeOrder(false);
        },
      );
    }
  }, [isChangeOrder, order]);

  const getOrderJson = useCallback(async () => {
    const orderJson = await LocalStorageUtils.getYoScanOrders();
    setFirstLoad(false);
    if (orderJson) {
      const locals = JSON.parse(orderJson);
      locals.filter((e: YoScanOrder, index: number) => {
        if (e.data) {
          const o = getOrderFromLocalOrders(e.data);
          setTabs(pre => [
            ...pre,
            {
              key: e.key,
              title: e.title,
              component: (
                <View style={style.tabContent}>
                  <Typography text={e.title} />
                </View>
              ),
            },
          ]);
          localOrders[index] = {title: e.title, key: e.key, data: o};
          setOrder(localOrders[0].data);
        }
      });
    } else {
      setTabs([...initialTabs]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOrderJson();
  }, []);

  const changeTab = (index: number) => {
    if (localOrders && localOrders[index]) {
      setOrder(localOrders[index].data);
    }
    setActiveTab(index);
  };

  useEffect(() => {
    if (firstLoad) {
      return;
    }
    if (!tabs) {
      return;
    }
    const tab = tabs[activeTab];
    if (tab) {
      localOrders[activeTab] = {title: tab.title, key: tab.key, data: order};
    }
    LocalStorageUtils.setYoScanOrders(JSON.stringify(localOrders));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, order, tabs, firstLoad]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Tạo đơn Yoscan">
        <View style={style.formSearch}>
          <OrderTabView
            tabs={tabs}
            activeTab={activeTab}
            goToPage={changeTab}
            addTab={action.addTab}
            removeTab={confirmRemoveOrder}
          />
          <SearchView
            onPress={navigateAddProductOrder}
            title="Tìm và thêm sản phẩm"
            right={
              <TouchableOpacity
                style={style.button}
                onPress={onProductBarcodePress}>
                <Image source={ic_scan_barcode} />
              </TouchableOpacity>
            }
          />
        </View>
      </Layout.ScreenHeaderBack>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom + 20}
        style={style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          extraScrollHeight={200}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          style={style.awareScrollView}>
          <ProductContainerView
            lineItems={order.getLineItems()}
            onQuantityChange={onChangeQuantityLineItem}
            clearLineItem={clearLineItem}
            clearDiscountItem={clearDiscountItem}
            order={order}
          />
          <View style={style.rule} />
          <AutoDiscountView
            order={order}
            isHaveLineItems={order.isHaveLineItems()}
            onChangeAutoDiscount={onChangeAutoDiscount}
            onChangePoint={onChangePoint}
            onRemoveOrderDiscount={onRemoveOrderDiscount}
          />
          <View style={style.rule} />
          <CustomerContainerView
            route={route}
            ref={customerContainerRef}
            customer={order.getCustomer()}
            onBarcodePress={onBarcodePress}
            onCustomerClear={onCustomerClear}
            onSetOrder={onSetOrder}
            customerDiscounts={customerDiscounts}
          />
          <View style={style.rule} />

          <OrderNoteView onChangeNote={onChangeNote} note={order.getNote()} />
        </KeyboardAwareScrollView>
        <ScreenBottom>
          <View style={[style.viewBottom]}>
            <View style={style.totalPriceContainer}>
              <Typography
                textType="regular"
                style={style.totalPriceTitle}
                text={`Tạm tính (${order.getTotalNumberVariant()} sản phẩm)`}
              />
              <Typography
                color={Colors.Primary}
                textType="medium"
                type="h1"
                text={order.getAmountOrder()}
              />
            </View>
            <CTButton
              disabled={isDisableCreateOrder}
              onPress={onCreateOrderCode}
              text="Tiếp tục"
              font={Font.Medium}
            />
          </View>
        </ScreenBottom>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default PosCreateScreen;
