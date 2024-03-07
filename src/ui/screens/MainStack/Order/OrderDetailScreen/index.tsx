import {
  ic_bill_info,
  ic_note,
  ic_payment,
  ic_people,
  ic_placeholder_6080,
  ic_product_1,
} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {Font} from 'components/Base/Text';
import CTCard from 'components/CTCard';
import CTImage from 'components/CTImage';
import CTLayout from 'components/CTLayout';
import CTStatusBar from 'components/CTStatusBar';
import CTTypography from 'components/CTTypography';
import {findPaymentSource} from 'config/DataSourceConfig/PaymentStatusSouce';
import {MainRouteConfig} from 'config/RouteConfig';
import {DetailCustomerDto} from 'model/dto/CustomerService/DetailCustomerDto';
import {OrderLoyaltyDto} from 'model/dto/LoyaltyService/OrderLoyaltyDto';
import {OrderDto} from 'model/dto/OrderService/OrderDto';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getCustomerApi} from 'services/CustomerService/CustomerApi';
import {CustomerUtils} from 'services/CustomerService/CustomerUtils';
import {calculateLoyaltyPointApi} from 'services/LoyaltyService/LoyaltyApi';
import {getOrderDetailApi} from 'services/OrderService/OrderApi';
import DateUtils, {FormatDatePattern} from 'utils/DateUtils';
import NumberUtils from 'utils/NumberUtils';
import {MainStackScreenProps} from '../..';
import {OrderDetailStyle} from './styles';
import {StackActions} from '@react-navigation/native';
import {Layout} from 'common-ui';
import {getMediaUrl} from 'utils/MediaUtils';

type Props = MainStackScreenProps<'OrderDetail'>;

const OrderDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const code = route.params.code;
  const id = route.params.id;
  const height = useSafeAreaInsets().bottom;
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [orderLoyalties, setOrderLoyalties] = useState<Array<OrderLoyaltyDto>>(
    [],
  );
  const [customer, setCustomer] = useState<DetailCustomerDto | null>(null);
  const [error, setError] = useState<string | false>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const totalPoint = useMemo(() => {
    return orderLoyalties.map(item => item.pointAdd).reduce((a, b) => a + b, 0);
  }, [orderLoyalties]);
  const onNavigationCustomerDetail = useCallback(
    () =>
      navigation.navigate(MainRouteConfig.DetailCustomer, {id: customer?.id}),
    [customer?.id, navigation],
  );
  const onRefresh = () => {
    setRefreshing(true);
    getOrderDetailApi(
      id,
      result => {
        setOrder(result);
      },
      errors => setError(errors[0]),
      () => setRefreshing(false),
    );
  };
  const noteCard = useMemo(() => {
    if (order === null) {
      return null;
    }
    return (
      <CTCard
        icon={ic_note}
        styleContainer={OrderDetailStyle.card}
        title="Ghi chú">
        <View style={OrderDetailStyle.rowNote}>
          <CTTypography.Text
            level="2"
            text={order.note === '' ? 'Không có ghi chú' : order.note}
          />
        </View>
      </CTCard>
    );
  }, [order]);
  const paymentCard = useMemo(() => {
    if (order === null) {
      return null;
    }
    const paymentStatus = findPaymentSource(order.paymentStatus);
    return (
      <CTCard
        icon={ic_payment}
        right={
          paymentStatus ? (
            <View
              style={[
                OrderDetailStyle.viewSubStatus,
                {
                  backgroundColor: paymentStatus.backgroundColor,
                  borderColor: paymentStatus.borderColor,
                },
              ]}>
              <CTTypography.Text
                style={[
                  OrderDetailStyle.txtStatus,
                  {color: paymentStatus.textColor},
                ]}
                text={paymentStatus.display}
              />
            </View>
          ) : undefined
        }
        styleContainer={OrderDetailStyle.card}
        title="Thanh toán">
        <React.Fragment>
          {order.payments.map(item => {
            let point = item.point ? item.point : 0;
            return (
              <View key={item.id} style={OrderDetailStyle.rowInfo}>
                <CTTypography.Text
                  style={OrderDetailStyle.paymentMethod}
                  level="2"
                  text={item.paymentMethod}
                />
                {item.paymentMethodCode === 'point' ? (
                  <CTTypography.Text
                    style={[OrderDetailStyle.txtValue]}
                    level="2"
                    text={`${NumberUtils.formatNumber(
                      point,
                    )} điểm (${NumberUtils.formatCurrency(point * 1000)})`}
                  />
                ) : (
                  <CTTypography.Text
                    style={[OrderDetailStyle.txtValue]}
                    level="2"
                    text={`${NumberUtils.formatCurrency(item.amount)}`}
                  />
                )}
              </View>
            );
          })}
        </React.Fragment>
      </CTCard>
    );
  }, [order]);
  const customerCard = useMemo(() => {
    if (customer === null) {
      return null;
    }
    return (
      <CTCard
        styleContainer={OrderDetailStyle.card}
        icon={ic_people}
        right={
          customer.customerLevel ? (
            <View
              style={[
                OrderDetailStyle.viewSubStatus,
                OrderDetailStyle.bgCustomerLevel,
              ]}>
              <CTTypography.Text
                style={[OrderDetailStyle.txtStatus, OrderDetailStyle.txtLevel]}
                text={customer.customerLevel}
              />
            </View>
          ) : undefined
        }
        title="Khách hàng">
        <React.Fragment>
          <View style={OrderDetailStyle.rowInfo}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Tên khách hàng"
            />
            <TouchableOpacity
              onPress={onNavigationCustomerDetail}
              style={OrderDetailStyle.txtValue}>
              <CTTypography.Text
                style={[OrderDetailStyle.txtBlue]}
                level="2"
                font={Font.Medium}
                text={customer.fullName}
              />
            </TouchableOpacity>
          </View>
          <View style={OrderDetailStyle.rowInfo}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Số điện thoại"
            />
            <CTTypography.Text
              style={[OrderDetailStyle.txtValue]}
              level="2"
              text={customer.phone}
            />
          </View>
          <View style={OrderDetailStyle.rowInfo}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Điểm tích lũy"
            />
            <CTTypography.Text
              style={[OrderDetailStyle.txtValue]}
              level="2"
              text={`${customer.point ? customer.point : 0}`}
            />
          </View>
        </React.Fragment>
      </CTCard>
    );
  }, [customer, onNavigationCustomerDetail]);
  const contactCard = useMemo(() => {
    if (order === null) {
      return null;
    }
    const subStatus = CustomerUtils.getSubStatus(order.subStatusCode);
    return (
      <CTCard
        styleContainer={OrderDetailStyle.card}
        icon={ic_bill_info}
        right={
          subStatus ? (
            <View
              style={[
                OrderDetailStyle.viewSubStatus,
                {
                  backgroundColor: subStatus.backgroundColor,
                  borderColor: subStatus.borderColor,
                },
              ]}>
              <CTTypography.Text
                style={[
                  OrderDetailStyle.txtStatus,
                  {color: subStatus.textColor},
                ]}
                text={subStatus.name}
              />
            </View>
          ) : undefined
        }
        title="Thông tin đơn hàng">
        <React.Fragment>
          {order.orderReturnOrigin && (
            <View style={OrderDetailStyle.rowInfo}>
              <CTTypography.Text
                style={OrderDetailStyle.txtTitle}
                level="2"
                text="Mã đơn gốc"
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.push(MainRouteConfig.OrderDetail, {
                    code: order.orderReturnOrigin?.orderCode,
                    id: order.orderReturnOrigin?.orderId,
                  })
                }
                style={OrderDetailStyle.txtValue}>
                <CTTypography.Text
                  style={[OrderDetailStyle.txtBlue]}
                  level="2"
                  font={Font.Medium}
                  text={order.orderReturnOrigin.orderCode}
                />
              </TouchableOpacity>
            </View>
          )}
          {order.orderReturns.length > 0 && (
            <View style={OrderDetailStyle.rowInfo}>
              <CTTypography.Text
                style={OrderDetailStyle.txtTitle}
                level="2"
                text="Mã đơn trả"
              />
              <View>
                {order.orderReturns.map(item => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push(MainRouteConfig.OrderReturnDetail, {
                        id: item.id,
                        code: item.code,
                      })
                    }
                    key={item.id}>
                    <CTTypography.Text
                      style={[OrderDetailStyle.txtBlue]}
                      level="2"
                      font={Font.Medium}
                      text={item.code}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={OrderDetailStyle.rowInfo}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Số tiền thanh toán"
            />
            <CTTypography.Text
              style={[OrderDetailStyle.txtValue, OrderDetailStyle.txtBlue]}
              level="2"
              font={Font.Medium}
              text={NumberUtils.formatCurrency(order.total)}
            />
          </View>
          <View style={OrderDetailStyle.rowInfo}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Nguồn"
            />
            <CTTypography.Text
              style={OrderDetailStyle.txtValue}
              level="2"
              font={Font.Medium}
              text={order.source}
            />
          </View>
          <View style={OrderDetailStyle.rowInfo}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Kênh"
            />
            <CTTypography.Text
              style={OrderDetailStyle.txtValue}
              level="2"
              text={order.channel}
              font={Font.Medium}
            />
          </View>
          <View style={OrderDetailStyle.rowInfo}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Cửa hàng"
            />
            <CTTypography.Text
              style={OrderDetailStyle.txtValue}
              level="2"
              text={order.store}
              font={Font.Medium}
            />
          </View>
          <View style={OrderDetailStyle.rowInfo}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Thời gian"
            />
            <CTTypography.Text
              style={OrderDetailStyle.txtValue}
              level="2"
              text={DateUtils.format(
                order.createdDate,
                FormatDatePattern['DD/MM/YYYY - HH:mm'],
              )}
              font={Font.Medium}
            />
          </View>
        </React.Fragment>
      </CTCard>
    );
  }, [navigation, order]);
  const otherCard = useMemo(() => {
    if (order === null) {
      return null;
    }
    return (
      <CTCard styleContainer={OrderDetailStyle.card} title="Thông tin khác">
        <React.Fragment>
          <View
            style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Cửa hàng"
            />
            <CTTypography.Text
              style={[OrderDetailStyle.txtValue]}
              level="2"
              text={order.store}
              font={Font.Medium}
            />
          </View>
          <View
            style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Điện thoại"
            />
            <CTTypography.Text
              style={[OrderDetailStyle.txtValue]}
              level="2"
              text={order.storePhoneNumber}
              font={Font.Medium}
            />
          </View>
          <View
            style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Địa chỉ"
            />
            <CTTypography.Text
              style={[OrderDetailStyle.txtValue]}
              level="2"
              text={order.storeFullAddress}
              font={Font.Medium}
            />
          </View>
          <View
            style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Nhân viên tư vấn"
            />
            <CTTypography.Text
              style={[OrderDetailStyle.txtValue]}
              level="2"
              text={`${order.assigneeCode} - ${order.assignee}`}
              font={Font.Medium}
            />
          </View>
          <View
            style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Nhân viên vận đơn"
            />
            <CTTypography.Text
              style={[OrderDetailStyle.txtValue]}
              level="2"
              text={`${order.coordinatorCode ?? ''} - ${
                order.coordinator ?? ''
              }`}
              font={Font.Medium}
            />
          </View>
          <View
            style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
            <CTTypography.Text
              style={OrderDetailStyle.txtTitle}
              level="2"
              text="Người tạo"
            />
            <CTTypography.Text
              style={[OrderDetailStyle.txtValue]}
              level="2"
              text={`${order.createdBy} - ${order.createdName}`}
              font={Font.Medium}
            />
          </View>
          <View style={[OrderDetailStyle.bottom, {height: height}]} />
        </React.Fragment>
      </CTCard>
    );
  }, [height, order]);
  const productCard = useMemo(() => {
    if (order === null) {
      return null;
    }
    const totalOrderDiscount = order.discounts
      .map(item => item.amount)
      .reduce((a, b) => a + b, 0);
    const totalLineItemDiscount = order.items
      .flatMap(item => item.discountItems)
      .map(item => item.amount)
      .reduce((a, b) => a + b, 0);
    const totalDiscount = totalOrderDiscount + totalLineItemDiscount;
    return (
      <CTCard
        styleContainer={OrderDetailStyle.card}
        icon={ic_product_1}
        showHeaderLine
        subTitle={`(${order.actualQuantity})`}
        title="Sản phẩm">
        <React.Fragment>
          {order.items.map((item, index) => {
            let price = item.price;
            let totalValue = item.discountItems
              .map(discount => discount.value)
              .reduce((a, b) => a + b, 0);
            let afterDiscount = price - totalValue;
            return (
              <React.Fragment key={item.id}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.dispatch(
                        StackActions.push(MainRouteConfig.VariantDetail, {
                          variantId: item.variantId,
                          sku: item.sku,
                          productId: item.productId,
                        }),
                      );
                    }}
                    style={OrderDetailStyle.itemContainer}>
                    <CTImage
                      style={OrderDetailStyle.imgItem}
                      source={{uri: getMediaUrl(item.variantImage)}}
                      placeholder={ic_placeholder_6080}
                    />
                    <View style={[OrderDetailStyle.itemRight]}>
                      <CTTypography.Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        level="2"
                        text={item.variant}
                      />
                      <View style={OrderDetailStyle.rowSku}>
                        <CTTypography.Text
                          style={OrderDetailStyle.txtSubText}
                          level="3"
                          text={`Mã ${item.sku}`}
                        />
                        <CTTypography.Text
                          level="3"
                          style={OrderDetailStyle.quantity}
                          text={`x${item.quantity}`}
                        />
                      </View>
                      <View style={OrderDetailStyle.rowPrice}>
                        {price !== afterDiscount && (
                          <CTTypography.Text
                            level="2"
                            style={OrderDetailStyle.txtPrice}
                            text={NumberUtils.formatCurrency(price)}
                          />
                        )}
                        <CTTypography.Text
                          level="2"
                          text={NumberUtils.formatCurrency(afterDiscount)}
                          font={Font.Medium}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {index < order.items.length - 1 && (
                    <View style={OrderDetailStyle.borderItem} />
                  )}
                </View>
              </React.Fragment>
            );
          })}
          <View style={ThemeStyle.separator16} />
          <View style={OrderDetailStyle.viewInfo}>
            <View
              style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
              <CTTypography.Text
                style={OrderDetailStyle.txtTitle}
                level="2"
                text="Thành tiền"
              />
              <CTTypography.Text
                style={OrderDetailStyle.txtValue}
                level="2"
                text={NumberUtils.formatCurrency(
                  order.items
                    .map(item => item.amount)
                    .reduce((a, b) => a + b, 0),
                )}
                font={Font.Medium}
              />
            </View>
            <View
              style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
              <CTTypography.Text
                style={OrderDetailStyle.txtTitle}
                level="2"
                text="Chiết khấu đơn hàng"
              />
              <CTTypography.Text
                style={OrderDetailStyle.txtValue}
                level="2"
                text={
                  totalOrderDiscount !== 0
                    ? `-${NumberUtils.formatCurrency(totalOrderDiscount)}`
                    : NumberUtils.formatCurrency(totalOrderDiscount)
                }
                font={Font.Medium}
              />
            </View>
            <View
              style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
              <CTTypography.Text
                style={OrderDetailStyle.txtTitle}
                level="2"
                text="Tổng chiết khấu sản phẩm"
              />
              <CTTypography.Text
                style={OrderDetailStyle.txtValue}
                level="2"
                text={
                  totalLineItemDiscount !== 0
                    ? `-${NumberUtils.formatCurrency(totalLineItemDiscount)}`
                    : NumberUtils.formatCurrency(totalLineItemDiscount)
                }
                font={Font.Medium}
              />
            </View>
            <View
              style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
              <CTTypography.Text
                style={OrderDetailStyle.txtTitle}
                level="2"
                text="Tổng chiết khấu đơn"
              />
              <CTTypography.Text
                style={OrderDetailStyle.txtValue}
                level="2"
                text={
                  totalDiscount === 0
                    ? NumberUtils.formatCurrency(totalDiscount)
                    : `-${NumberUtils.formatCurrency(totalDiscount)}`
                }
                font={Font.Medium}
              />
            </View>
            <View
              style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
              <CTTypography.Text
                style={OrderDetailStyle.txtTitle}
                level="2"
                text="Tổng điểm tích lũy"
              />
              <CTTypography.Text
                style={OrderDetailStyle.txtValue}
                level="2"
                text={`${totalPoint} điểm`}
                font={Font.Medium}
              />
            </View>
            <View style={[ThemeStyle.separator16, OrderDetailStyle.pb8]} />
            <View
              style={[OrderDetailStyle.rowInfo, OrderDetailStyle.otherCardRow]}>
              <CTTypography.Text
                level="2"
                text="Khách phải trả"
                font={Font.Medium}
              />
              <CTTypography.Text
                style={OrderDetailStyle.txtValue}
                level="2"
                font={Font.Medium}
                text={NumberUtils.formatCurrency(order.total)}
              />
            </View>
          </View>
        </React.Fragment>
      </CTCard>
    );
  }, [navigation, order, totalPoint]);
  const onReload = () => {
    setFirstLoad(true);
  };
  useEffect(() => {
    if (firstLoad) {
      getOrderDetailApi(
        id,
        result => {
          setOrder(result);
        },
        errors => setError(errors[0]),
        () => setFirstLoad(false),
      );
    }
  }, [firstLoad, id]);
  useEffect(() => {
    if (order !== null) {
      getCustomerApi(
        order.customerId,
        result => setCustomer(result),
        () => {},
      );
    }
  }, [order]);
  useEffect(() => {
    if (order !== null) {
      calculateLoyaltyPointApi(
        order.customerId,
        order.id,
        result => setOrderLoyalties(result),
        () => {},
      );
    }
  }, [order]);
  return (
    <CTLayout.Container disableHideKeyboardOnPress>
      <CTStatusBar barStyle="dark-content" />
      <Layout.ScreenHeaderBack title={code} />
      <Layout.Container>
        <Layout.Loading loading={firstLoad}>
          <CTLayout.ErrorView onReloadPress={onReload} error={error}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
              style={OrderDetailStyle.scrollView}>
              {contactCard}
              {customerCard}
              {productCard}
              {paymentCard}
              {noteCard}
              {otherCard}
            </ScrollView>
          </CTLayout.ErrorView>
        </Layout.Loading>
      </Layout.Container>
    </CTLayout.Container>
  );
};

export default OrderDetailScreen;
