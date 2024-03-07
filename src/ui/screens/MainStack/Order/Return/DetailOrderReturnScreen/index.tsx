import React, {useCallback, useEffect, useMemo, useState} from 'react';
import CTLayout from 'components/CTLayout';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {useFocusEffect} from '@react-navigation/native';
import {getOrderReturnApi} from 'services/OrderService/OrderApi';
import {OrderReturnDto} from 'model/dto/OrderService/OrderReturnDto';
import {ThemeStyle} from 'assets/theme';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import {DetailOrderReturnStyle} from './style';
import CTCard from 'components/CTCard';
import {
  ic_bill_info,
  ic_note,
  ic_people,
  ic_product_1,
  ic_refund,
} from 'assets/images';
import OrderReturnMapper from 'mapper/order/OrderReturnMapper';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import {MainRouteConfig} from 'config/RouteConfig';
import {getCustomerApi} from 'services/CustomerService/CustomerApi';
import {DetailCustomerDto} from 'model/dto/CustomerService/DetailCustomerDto';
import {OrderLineItemDetail} from 'ui/view/OrderComponent';

type Props = MainStackScreenProps<'OrderReturnDetail'>;

const OrderReturnDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const code = route.params.code;
  const id = route.params.id;
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | false>(false);
  const [orderReturn, setOrderReturn] = useState<OrderReturnDto | null>(null);
  const [customer, setCustomer] = useState<DetailCustomerDto | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onReload = () => {
    setRefreshing(true);
  };

  const onRefresh = () => {
    if (!firstLoading && !refreshing) {
      setRefreshing(true);
      getOrderReturnApi(
        id,
        result => {
          setOrderReturn(result);
        },
        errors => setError(errors[0]),
        () => setRefreshing(false),
      );
    }
  };

  const viewer = OrderReturnMapper.mapView(orderReturn);
  const customerViewer = OrderReturnMapper.mapCustomer(customer);

  const contactCard = useMemo(() => {
    if (viewer === null) {
      return null;
    }
    return (
      <CTCard
        styleContainer={DetailOrderReturnStyle.card}
        icon={ic_bill_info}
        right={
          viewer.return_status ? (
            <View
              style={[
                DetailOrderReturnStyle.viewSubStatus,
                DetailOrderReturnStyle.bgPaid,
              ]}>
              <CTTypography.Text
                style={[
                  DetailOrderReturnStyle.txtStatus,
                  DetailOrderReturnStyle.txtPaid,
                ]}
                text={viewer.return_status_name}
              />
            </View>
          ) : undefined
        }
        title="Thông tin đơn trả">
        <React.Fragment>
          <View style={DetailOrderReturnStyle.rowInfo}>
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtTitle}
              level="2"
              text="Mã đơn gốc"
            />
            <TouchableOpacity
              onPress={() => {
                navigation.push(MainRouteConfig.OrderDetail, {
                  id: viewer.order_id,
                  code: viewer.order_code,
                });
              }}>
              <CTTypography.Text
                style={[DetailOrderReturnStyle.txtBlue]}
                level="2"
                font={Font.Medium}
                text={viewer.order_code}
              />
            </TouchableOpacity>
          </View>
          <View style={DetailOrderReturnStyle.rowInfo}>
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtTitle}
              level="2"
              text="Số tiền thanh toán"
            />
            <CTTypography.Text
              style={[
                DetailOrderReturnStyle.txtValue,
                DetailOrderReturnStyle.txtBlue,
              ]}
              level="2"
              font={Font.Medium}
              text={viewer.total}
            />
          </View>
          <View style={DetailOrderReturnStyle.rowInfo}>
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtTitle}
              level="2"
              text="Nguồn"
            />
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtValue}
              level="2"
              text={viewer.source}
            />
          </View>
          <View style={DetailOrderReturnStyle.rowInfo}>
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtTitle}
              level="2"
              text="Kênh"
            />
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtValue}
              level="2"
              text={viewer.channel}
            />
          </View>
          <View style={DetailOrderReturnStyle.rowInfo}>
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtTitle}
              level="2"
              text="Cửa hàng"
            />
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtValue}
              level="2"
              text={viewer.store}
            />
          </View>
          <View style={DetailOrderReturnStyle.rowInfo}>
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtTitle}
              level="2"
              text="Lý do"
            />
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtValue}
              level="2"
              text={viewer.reason}
            />
          </View>
          <View style={DetailOrderReturnStyle.rowInfo}>
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtTitle}
              level="2"
              text="Thời gian"
            />
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtValue}
              level="2"
              text={viewer.refund_date}
            />
          </View>
        </React.Fragment>
      </CTCard>
    );
  }, [navigation, viewer]);

  const onNavigationCustomerDetail = useCallback(
    () =>
      navigation.navigate(MainRouteConfig.DetailCustomer, {id: customer?.id}),
    [customer?.id, navigation],
  );

  const customerCard = useMemo(() => {
    if (customerViewer == null) {
      return null;
    }
    return (
      <CTCard
        styleContainer={DetailOrderReturnStyle.card}
        icon={ic_people}
        right={
          customerViewer.haveCustomerLevel ? (
            <View
              style={[
                DetailOrderReturnStyle.viewSubStatus,
                DetailOrderReturnStyle.bgCustomerLevel,
              ]}>
              <CTTypography.Text
                style={[
                  DetailOrderReturnStyle.txtStatus,
                  DetailOrderReturnStyle.txtLevel,
                ]}
                text={customerViewer.customerLevel}
              />
            </View>
          ) : undefined
        }
        title="Khách hàng">
        <React.Fragment>
          <View style={DetailOrderReturnStyle.rowInfo}>
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtTitle}
              level="2"
              text="Tên khách hàng"
            />
            <TouchableOpacity
              onPress={onNavigationCustomerDetail}
              style={DetailOrderReturnStyle.txtValue}>
              <CTTypography.Text
                style={[DetailOrderReturnStyle.txtBlue]}
                level="2"
                font={Font.Medium}
                text={customerViewer.name}
              />
            </TouchableOpacity>
          </View>
          <View style={DetailOrderReturnStyle.rowInfo}>
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtTitle}
              level="2"
              text="Số điện thoại"
            />
            <CTTypography.Text
              style={[DetailOrderReturnStyle.txtValue]}
              level="2"
              text={customerViewer.phone}
            />
          </View>
          <View style={DetailOrderReturnStyle.rowInfo}>
            <CTTypography.Text
              style={DetailOrderReturnStyle.txtTitle}
              level="2"
              text="Điểm tích lũy"
            />
            <CTTypography.Text
              style={[DetailOrderReturnStyle.txtValue]}
              level="2"
              text={customerViewer.loyalty}
            />
          </View>
        </React.Fragment>
      </CTCard>
    );
  }, [customerViewer, onNavigationCustomerDetail]);

  const productCard = useMemo(() => {
    if (viewer == null) {
      return null;
    }
    return (
      <CTCard
        styleContainer={DetailOrderReturnStyle.card}
        icon={ic_product_1}
        subTitle={`(${viewer.quantity})`}
        title="Sản phẩm">
        <React.Fragment>
          {viewer.items.map((item, index) => (
            <OrderLineItemDetail
              max={viewer.items.length}
              key={item.id}
              data={item}
              index={index}
            />
          ))}
          <View style={ThemeStyle.separator16} />
          <View style={DetailOrderReturnStyle.viewInfo}>
            <View
              style={[
                DetailOrderReturnStyle.rowInfo,
                DetailOrderReturnStyle.otherCardRow,
              ]}>
              <CTTypography.Text
                style={DetailOrderReturnStyle.txtTitle}
                level="2"
                text="Điểm hoàn"
              />
              <CTTypography.Text
                style={DetailOrderReturnStyle.txtValue}
                level="2"
                text={viewer.point_refund}
              />
            </View>
            <View
              style={[
                DetailOrderReturnStyle.rowInfo,
                DetailOrderReturnStyle.otherCardRow,
              ]}>
              <CTTypography.Text
                style={DetailOrderReturnStyle.txtTitle}
                level="2"
                text="Hoàn tiền"
              />
              <CTTypography.Text
                style={DetailOrderReturnStyle.txtValue}
                level="2"
                text={viewer.amount}
              />
            </View>
          </View>
        </React.Fragment>
      </CTCard>
    );
  }, [viewer]);

  const paymentCard = useMemo(() => {
    if (viewer == null) {
      return null;
    }
    return (
      <CTCard
        styleContainer={DetailOrderReturnStyle.card}
        icon={ic_refund}
        title="Hoàn tiền"
        right={
          viewer.payment ? (
            <View
              style={[
                DetailOrderReturnStyle.viewSubStatus,
                {
                  backgroundColor: viewer.bgPayment,
                  borderColor: viewer.bgPayment,
                },
              ]}>
              <CTTypography.Text
                style={[
                  DetailOrderReturnStyle.txtStatus,
                  {color: viewer.txtPayment},
                ]}
                text={viewer.payment}
              />
            </View>
          ) : undefined
        }>
        <React.Fragment>
          {viewer.payments.map(item => (
            <View key={item.id} style={DetailOrderReturnStyle.rowInfo}>
              <CTTypography.Text
                style={DetailOrderReturnStyle.txtTitle}
                level="2"
                text={item.name}
              />
              <CTTypography.Text
                style={[DetailOrderReturnStyle.txtValue]}
                level="2"
                text={item.amount}
              />
            </View>
          ))}
        </React.Fragment>
      </CTCard>
    );
  }, [viewer]);

  const noteCard = useMemo(() => {
    if (viewer == null) {
      return null;
    }
    return (
      <CTCard
        icon={ic_note}
        styleContainer={DetailOrderReturnStyle.card}
        title="Ghi chú">
        <View style={DetailOrderReturnStyle.rowNote}>
          <CTTypography.Text
            style={DetailOrderReturnStyle.txtNote}
            level="2"
            numberOfLines={10}
            text={viewer.note}
          />
        </View>
      </CTCard>
    );
  }, [viewer]);

  useEffect(() => {
    if (orderReturn !== null) {
      getCustomerApi(
        orderReturn.customerId,
        result => setCustomer(result),
        () => {},
      );
    }
  }, [orderReturn]);
  useFocusEffect(
    useCallback(() => {
      if (firstLoading) {
        getOrderReturnApi(
          id,
          result => {
            setOrderReturn(result);
          },
          errors => setError(errors[0]),
          () => setFirstLoading(false),
        );
      }
    }, [firstLoading, id]),
  );
  return (
    <CTLayout.Container disableHideKeyboardOnPress>
      <CTLayout.HeaderBack
        style={[ThemeStyle.shadowHeader, ThemeStyle.shadowBottom]}
        title={code}
      />
      <CTLayout.Body>
        <CTLayout.LoadingView firstLoading={firstLoading}>
          <CTLayout.ErrorView error={error} onReloadPress={onReload}>
            <ScrollView
              style={DetailOrderReturnStyle.scrollView}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {contactCard}
              {customerCard}
              {paymentCard}
              {productCard}
              {noteCard}
            </ScrollView>
          </CTLayout.ErrorView>
        </CTLayout.LoadingView>
      </CTLayout.Body>
    </CTLayout.Container>
  );
};

export default OrderReturnDetailScreen;
