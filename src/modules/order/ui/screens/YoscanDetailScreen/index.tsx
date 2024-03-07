import {useFocusEffect} from '@react-navigation/native';
import {DimentionUtils, ErrorType, Layout, Typography} from 'common-ui';
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Platform, ScrollView, View} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {
  customerService,
  orderService,
  promotionService,
} from 'modules/order/services';
import {OrderYoscanEntity} from 'modules/order/models/entities/OrderYoscanEntity';
import ScreenBottom from 'common-ui/components/Layout/ScreenBottom';
import style from './style';
import ProductYoscanDetailView from 'modules/order/ui/screens/YoscanDetailScreen/views/ProductYoscanDetailView';
import AutoDiscountView from 'modules/order/ui/screens/YoscanDetailScreen/views/AutoDiscountView';
import {showError} from 'utils/ToastUtils';
import {StringUtils} from 'common';
import {
  CustomerDiscountEntity,
  OrderCustomerEntity,
} from 'modules/order/models/entities';
import {CustomerContainerRef} from 'modules/order/ui/views';
import CustomerContainerView from 'modules/order/ui/screens/YoscanDetailScreen/views/CustomerContainerView';
import OrderNoteView from 'modules/order/ui/screens/YoscanDetailScreen/views/OrderNoteView';
import {colors} from 'assets/v2';
import BarcodeGen from '@kichiyaki/react-native-barcode-generator';
import {BlurView} from '@react-native-community/blur';
import {useCountdown} from 'hook/countDown';
import {CustomerUtils} from 'services/CustomerService/CustomerUtils';
import {StatusYoscanOrderEnum} from 'modules/order/enums/Yoscan';
import moment from 'moment/moment';

type Props = MainStackScreenProps<'YoscanDetail'>;
const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;

const YoscanDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const [data, setData] = useState<OrderYoscanEntity>();
  let code = route.params && route.params.code ? route.params.code : null;
  let createdDate =
    route.params && route.params.createdDate ? route.params.createdDate : '';
  const [loading, setLoading] = useState<boolean>(false);
  const first = useRef<boolean>(true);
  const [customerDiscounts, setCustomerDiscounts] = useState<
    Array<CustomerDiscountEntity>
  >([]);
  const [customer, setCustomer] = useState<OrderCustomerEntity | null>(null);
  const customerContainerRef = createRef<CustomerContainerRef>();
  const [minutes, seconds] = useCountdown(
    moment(createdDate).valueOf() + FIFTEEN_MINUTES_IN_MS,
  );
  useEffect(() => {
    if (minutes + seconds === 0) {
      navigation.goBack();
    }
  }, [minutes, seconds]);

  useFocusEffect(
    useCallback(() => {
      if (code) {
        orderService.getOrderYoscanDetail(
          {ignoreExpiredTime: true},
          code,
          () => {
            setLoading(true);
          },
          orderYoscanEntities => {
            console.log('AAAAA', orderYoscanEntities);
            setData(orderYoscanEntities);
          },
          errors => {
            setErrorType(errors);
          },
          () => {
            setLoading(false);
            first.current = false;
          },
        );
      }
    }, [code]),
  );

  useEffect(() => {
    if (data?.getOrder().getCustomerId()) {
      customerService.getCustomerById(
        data?.getOrder().getCustomerId(),
        () => customerContainerRef.current?.loading(),
        customerItem => {
          promotionService.getCustomerDiscountCodes(
            customerItem.getId(),
            res => setCustomerDiscounts(res),
            () => {},
          );
          customerContainerRef.current?.unLoading();
          setCustomer(OrderCustomerEntity.create(customerItem));
        },
        (codeErr, msg) => {
          showError(
            StringUtils.format('Có lỗi khi lấy dữ liệu khách hàng: {0}', msg),
          );
        },
      );
    }
  }, [data]);
  const subStatus = data ? data.getStatusColor() : null;

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title={data?.getCode() ?? ''}
        error={errorType}
      />
      <Layout.Container>
        <Layout.Loading loading={loading}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Layout.Error error={errorType}>
              {data && (
                <View>
                  <ProductYoscanDetailView order={data} />
                  <View style={style.rule} />
                  <AutoDiscountView order={data} />
                  <View style={style.rule} />
                  <CustomerContainerView
                    customer={customer}
                    customerDiscounts={customerDiscounts}
                    ref={customerContainerRef}
                  />
                  <View style={style.rule} />
                  <OrderNoteView note={data.getOrder().getNote()} />
                </View>
              )}
            </Layout.Error>
          </ScrollView>
        </Layout.Loading>
      </Layout.Container>
      <ScreenBottom>
        <View style={[style.viewBottom]}>
          <View>
            <Typography
              style={style.selfCenter}
              type="h4"
              color={colors.secondary.o500}
              text="Thời gian còn lại để thực hiện thanh toán"
            />
            <Typography
              style={[style.selfCenter, {paddingTop: DimentionUtils.scale(5)}]}
              type="h3"
              color={colors.primary.o500}
              text={
                minutes + seconds > 0
                  ? `${minutes} phút ${seconds} giây`
                  : 'HẾT HẠN'
              }
            />
            <View style={style.viewBarCode}>
              {data?.getCode() && (
                <BarcodeGen
                  format="CODE128"
                  value={data?.getCode() ?? ''}
                  width={2.4}
                  height={65}
                />
              )}
              {(minutes + seconds <= 0 ||
                data?.getStatus() === StatusYoscanOrderEnum.EXPIRED) && (
                <BlurView
                  style={{
                    height: 95,
                    position: 'absolute',
                    top: -15,
                    left: -15,
                    bottom: -15,
                    right: -15,
                  }}
                  overlayColor="transparent"
                  blurType="light"
                  blurAmount={5}
                  reducedTransparencyFallbackColor="white"
                />
              )}
            </View>
            <View style={style.rowStatus}>
              <Typography
                text={data?.getCode()}
                type="h3"
                textType="medium"
                color={colors.primary.o500}
              />
              {subStatus && (
                <View
                  style={[
                    style.viewSubStatus,
                    {
                      backgroundColor: subStatus.backgroundColor,
                      borderColor: subStatus.borderColor,
                    },
                  ]}>
                  <Typography
                    style={[style.txtStatus]}
                    color={subStatus.textColor}
                    text={CustomerUtils.getCustomerStringOrNull(subStatus.name)}
                  />
                </View>
              )}
            </View>
            <View style={style.rowTotal}>
              <Typography text="Cần thanh toán" color={colors.secondary.o900} />
              <Typography
                text={data?.getTotalCurrency()}
                color={colors.primary.o700}
                type="h2"
                textType="medium"
              />
            </View>
          </View>
        </View>
      </ScreenBottom>
    </Layout.Screen>
  );
};

export default YoscanDetailScreen;
