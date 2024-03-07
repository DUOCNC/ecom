import {NavigationProp, useNavigation} from '@react-navigation/native';
import {colors} from 'assets/v2';
import {Typography} from 'common-ui';
import {OrderCustomerEntity} from 'modules/order/models';
import React, {
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
  useState,
  createRef,
  useCallback,
} from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
  Keyboard,
} from 'react-native';
import {RootStackParamList} from 'ui/screens/MainStack';
import style from './style';
import {MainRouteConfig} from 'config/RouteConfig';
import {StringUtils} from 'common';
import {Colors} from 'assets/colors';
import CTSelectNavigate from 'components/Form/CTSelectNavigate';
import {CTFormInput} from 'components/Form';
import {DistrictEntity} from 'model';
import WardEntity from 'model/entities/WardEntity';
import CTCheckbox from 'components/Form/CTCheckbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {CustomerDiscountEntity} from 'modules/order/models/entities';
import CustomerDiscountView, {
  CustomerDiscountRef,
} from 'modules/order/ui/views/CustomerDiscountView';
import {orderService} from 'modules/order/services';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';
import {useAuth} from 'providers/contexts/AuthContext';

interface Props {
  customer: OrderCustomerEntity | null;
  customerDiscounts: Array<CustomerDiscountEntity>;
}

export interface CustomerContainerRef {
  loading: () => void;
  unLoading: () => void;
  checkbox: boolean;
}

type CustomerContainerView = ForwardRefRenderFunction<
  CustomerContainerRef,
  Props
>;

const CustomerContainerView: CustomerContainerView = (
  {customer, customerDiscounts},
  ref,
) => {
  const customerDiscountRef = createRef<CustomerDiscountRef>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState(false);
  const {locationSelected} = useAuth();

  const requestSelectCustomer = () => {
    return {
      itemClick: new DistrictEntity(
        Number(customer?.getDistrictId() || 0),
        (customer?.getDistrict() || '').toString(),
        '',
        (customer?.getDistrict() || '').toString(),
      ),
      itemWard: new WardEntity(
        Number(customer?.geWardId() || 0),
        (customer?.getWard() || '').toString(),
      ),
    };
  };

  const checkCheckbox = () => {
    if (
      !customer?.getDistrict() &&
      !customer?.getWard() &&
      !customer?.getFullAddress()
    ) {
      return true;
    }
    return false;
  };

  const onLoading = () => {
    setLoading(true);
  };
  const onUnLoading = () => {
    setLoading(false);
  };

  const logAction = () => {
    orderService.logOrderAction(
      {
        function: FunctionLog.VIEW_CUSTOMER_DETAIL,
        screen: ScreenLog.POS_CREATE_SCREEN,
        action: ActionLog.VIEW,
        customerId: customer?.getCustomerId(),
        storeId: locationSelected.locationId,
        storeName: locationSelected.locationName,
      },
      () => {},
      () => {},
    );
  };

  const onNavigateCustomerDetail = async () => {
    if (customer === null) {
      return;
    }
    navigation.navigate(MainRouteConfig.DetailCustomer, {
      id: customer.getCustomerIdValue(),
      name: customer.getFullName(),
    });
    if (customer === null) {
      return;
    }
    logAction();
  };
  const openCustomerDiscount = useCallback(() => {
    Keyboard.dismiss();
    customerDiscountRef.current?.setCustomerDiscounts(customerDiscounts);
    customerDiscountRef.current?.open();
  }, [customerDiscountRef, customerDiscounts]);

  useImperativeHandle(ref, () => ({
    loading: onLoading,
    unLoading: onUnLoading,
    checkbox,
  }));

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={Platform.OS === 'ios' ? -300 : 0}
      keyboardShouldPersistTaps="handled">
      <View style={style.container}>
        <View style={style.header}>
          <Typography
            style={style.txtTitle}
            type="h3"
            textType="medium"
            text="Khách hàng"
          />
        </View>
        <View style={style.row}>
          {customer && (
            <View>
              <TouchableOpacity onPress={onNavigateCustomerDetail}>
                <Typography
                  type="h3"
                  text={
                    <>
                      <Typography
                        color={colors.primary.o500}
                        textDecorationLine="underline"
                        textType="medium"
                        type="h3"
                        text={customer?.getFullName()}
                      />

                      {' - '}
                      {customer.getPhone()}
                    </>
                  }
                />
              </TouchableOpacity>

              <View style={style.rowOther}>
                <Typography
                  color={colors.secondary.o500}
                  style={style.txtPoint}
                  text={StringUtils.format('Điểm: {0}', customer.getPoint())}
                />
                <View style={style.groupView}>
                  <Typography
                    color={colors.warning.o400}
                    type="h5"
                    text={customer.getLevel()}
                  />
                </View>
              </View>
              <View style={style.rowOther}>
                <Typography
                  color={colors.secondary.o500}
                  style={style.txtPoint}
                  text={StringUtils.format(
                    'Mã khuyến mại: {0}',
                    customerDiscounts.length,
                  )}
                />
                <TouchableOpacity onPress={openCustomerDiscount}>
                  <Typography
                    text="Chi tiết"
                    color={colors.primary.o500}
                    textDecorationLine="underline"
                    textType="medium"
                    type="h4"
                  />
                </TouchableOpacity>
                <CustomerDiscountView ref={customerDiscountRef} />
              </View>
              <View style={style.checkbox}>
                <View style={style.mr4}>
                  <CTCheckbox disabled={true} value={checkCheckbox()} />
                </View>
                <View>
                  <Typography
                    color={Colors.Gray900}
                    type="h3"
                    text="Khách hàng từ chối chia sẻ địa chỉ"
                  />
                </View>
              </View>
              {!checkCheckbox() && (
                <View>
                  <View style={style.itemCustomer}>
                    <CTSelectNavigate
                      disabled={true}
                      onPress={() => {}}
                      title="Khu vực"
                      placeholder="Khu vực"
                      value={customer.getDistrict() || ''}
                    />
                  </View>
                  <View style={style.itemCustomer}>
                    <CTSelectNavigate
                      disabled={true}
                      onPress={() => {
                        navigation.navigate(MainRouteConfig.Ward, {
                          returnLink: MainRouteConfig.PosCreate,
                          districtId: customer?.getDistrictId(),
                          data: {
                            ...requestSelectCustomer,
                          },
                        });
                      }}
                      title="Phường/ Xã"
                      placeholder="Phường/ Xã"
                      value={customer?.getWard() || ''}
                    />
                  </View>
                  <View style={style.itemCustomer}>
                    <CTFormInput
                      disabled={true}
                      placeholderTextColor={Colors.SubText2}
                      placeholder="Địa chỉ cụ thể"
                      value={customer?.getFullAddress() || ''}
                      onChangeText={() => {}}
                      title="Địa chỉ cụ thể"
                      hideClear={true}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        {loading && (
          <View style={style.viewLoading}>
            <ActivityIndicator size="large" color={colors.base.white} />
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default forwardRef(CustomerContainerView);
