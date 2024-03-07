import React, {useEffect, useMemo, useState} from 'react';
import {Layout} from 'common-ui';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import style from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, KeyboardAvoidingView, Platform, View} from 'react-native';
import {CTCalendar, CTFormInput} from 'components/Form';
import {Colors} from 'assets/colors';
import {CTButton} from 'components/Button';
import ScreenBottom from 'common-ui/components/Layout/ScreenBottom';
import {hideModal, showLoading} from 'reduxs/Modals/ModalReducer';
import {showError, showSuccess} from 'utils/ToastUtils';
import {CreateCustomerRequest} from 'modules/order/models/request/CreateCustomerRequest';
import {useAppDispatch} from 'hook';
import {customerService} from 'modules/order/services';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CTSelectNavigate from 'components/Form/CTSelectNavigate';
import {MainRouteConfig} from 'config/RouteConfig';
import {DistrictEntity} from 'model';
import GenderEntity from 'model/entities/GenderEntity';
import WardEntity from 'model/entities/WardEntity';
import AssigneeEntity from 'model/entities/AssigneeEntity';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DateUtilts from 'common/utils/DateUtilts';

type Props = MainStackScreenProps<'CreateCustomer'>;
const CreateCustomerScreen: React.FC<Props> = ({navigation, route}) => {
  let itemClickPram = route.params?.itemClick
    ? route.params?.itemClick
    : DistrictEntity.createEmpty();

  let itemGenderPram = route.params?.itemGender
    ? route.params?.itemGender
    : GenderEntity.createEmpty();

  let itemWardPram = route.params?.itemWard
    ? route.params?.itemWard
    : WardEntity.createEmpty();

  let itemAssigneePram = route.params?.itemAssignee
    ? route.params?.itemAssignee
    : AssigneeEntity.createEmpty();
  let barcodeParam =
    route.params?.barcode && route.params?.barcode.value
      ? route.params?.barcode.value
      : '';
  let phoneAutofill = route.params?.phoneAutofill
    ? route.params?.phoneAutofill
    : '';
  const [itemClick, setItemClick] = useState<DistrictEntity>(itemClickPram);
  const [itemGender, setItemGender] = useState<GenderEntity>(itemGenderPram);
  const [itemWard, setItemWard] = useState<WardEntity>(itemWardPram);
  const [itemAssignee, setItemAssignee] =
    useState<AssigneeEntity>(itemAssigneePram);
  const [barcode, setBarcode] = useState<string>(barcodeParam);
  let params = route.params;

  useEffect(() => {
    if (route.params && route.params?.itemClick) {
      setItemClick(route.params?.itemClick);
    }
    if (route.params && route.params?.itemGender) {
      setItemGender(route.params?.itemGender);
    }
    if (route.params && route.params?.itemWard) {
      setItemWard(route.params?.itemWard);
    }
    if (route.params && route.params?.itemAssignee) {
      setItemAssignee(route.params?.itemAssignee);
    }
    if (route.params && route.params?.barcode && route.params?.barcode.value) {
      setBarcode(route.params?.barcode.value);
      navigation.setParams({barcode: undefined});
    }
  }, [params]);

  const dispatch = useAppDispatch();

  let requestSelectCustomer = useMemo(() => {
    return {
      itemClick,
      itemGender,
      itemWard,
      itemAssignee,
    };
  }, [itemAssignee, itemClick, itemGender, itemWard]);
  const {
    control,
    setValue,
    formState: {errors},
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      phone: phoneAutofill,
      fullName: '',
      birthday: '',
      gender: '',
      email: '',
      taxCode: '',
      cardNumber: '',
      districtId: '',
      wardId: '',
      fullAddress: '',
      responsibleStaffCode: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        phone: yup
          .string()
          .required('Số điện thoại không được để trống')
          .matches(
            /^((\+84|84|0084|0)[1-9]{1}[0-9]{8,9})$/,
            'Số điện thoại không hợp lệ!',
          ),
        fullName: yup.string().required('Tên không được để trống'),
        birthday: yup.string().required('Ngày sinh không được để trống'),
        gender: yup.string().required('Giới tính không được để trống'),
        taxCode: yup.string().matches(/^[0-9]*$/, 'Mã số thuế không hợp lệ!'),
      }),
    ),
  });

  const bottom = useSafeAreaInsets().bottom;
  useEffect(() => {
    setValue('cardNumber', barcode);
  }, [barcode]);
  useEffect(() => {
    if (params && params.itemGender) {
      setValue('gender', itemGender?.getValue());
    }
    if (params && params.itemAssignee) {
      setValue('responsibleStaffCode', itemAssignee?.getCode());
    }
    if (params && params.itemClick) {
      setValue('districtId', itemClick?.getDistrictId().toString());
    }
    if (params && params.itemWard) {
      setValue('wardId', itemWard?.getId().toString());
    }
    if (params && params.barcode) {
      setValue('cardNumber', barcode);
    }
  }, [
    itemAssignee,
    itemClick,
    itemGender,
    itemWard,
    barcode,
    params,
    setValue,
  ]);

  useEffect(() => {
    if (Object.keys(errors).length === 1) {
      let firstKeyError: string = Object.keys(errors)[0];
      // @ts-ignore
      showError(errors[firstKeyError].message);
    }
    if (Object.keys(errors).length > 1) {
      if (
        errors.phone &&
        errors.phone.message &&
        errors.phone.type === 'matches'
      ) {
        showError(errors.phone.message);
        return;
      }
      showError('Bạn chưa điền đủ thông tin bắt buộc');
    }
  }, [errors]);

  const onSubmit = (request: CreateCustomerRequest) => {
    Keyboard.dismiss();
    dispatch(showLoading());
    customerService.createCustomer(
      {
        ...request,
        ...itemGender?.getObjectRequest(),
        ...itemClick?.getObjectRequest(),
        ...itemWard?.getObjectRequest(),
        ...itemAssignee?.getObjectRequest(),
        status: 'active',
        birthday: DateUtilts.clearMillisecond(request.birthday),
      },
      newUser => {
        setTimeout(() => {
          navigation.navigate(MainRouteConfig.PosCreate, {
            customerId: newUser.getId(),
          });
        }, 1000);

        showSuccess('Thêm mới khách hàng thành công!');
      },
      (code, msg) => {
        showError(msg);
      },
      () => dispatch(hideModal()),
    );
  };
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Thêm mới khách hàng" />
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom + 20}
        style={style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <KeyboardAwareScrollView
          extraScrollHeight={Platform.OS === 'ios' ? -300 : 0}
          keyboardShouldPersistTaps="handled"
          style={style.body}>
          <Controller
            control={control}
            name="phone"
            render={({field: {onChange, onBlur, value}}) => (
              <View style={style.row}>
                <CTFormInput
                  autoFocus={!getValues('phone') && true}
                  keyboardType="numeric"
                  placeholderTextColor={Colors.SubText2}
                  title="Số điện thoại"
                  placeholder="Số điện thoại"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  hideClear={false}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="fullName"
            render={({field: {onChange, onBlur, value}}) => (
              <View style={style.row}>
                <CTFormInput
                  autoFocus={Boolean(getValues('phone')) && true}
                  placeholderTextColor={Colors.SubText2}
                  title="Tên khách hàng"
                  placeholder="Tên khách hàng"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  hideClear={false}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="birthday"
            render={({field: {onChange, onBlur, value}}) => (
              <View style={style.row}>
                <CTCalendar
                  title="Ngày sinh"
                  value={new Date(value)}
                  placeholder="Ngày sinh"
                  onChangeValue={onChange}
                  type="date"
                  onBlur={onBlur}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="gender"
            render={({field: {}}) => (
              <View style={style.row}>
                <CTSelectNavigate
                  onPress={() => {
                    navigation.navigate(MainRouteConfig.Gender, {
                      returnLink: MainRouteConfig.CreateCustomer,
                      value: itemGender?.getValue(),
                      data: requestSelectCustomer,
                    });
                  }}
                  title="Giới tính"
                  placeholder="Giới tính"
                  value={itemGender.getName()}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <View style={style.row}>
                <CTFormInput
                  placeholderTextColor={Colors.SubText2}
                  title="Email"
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  hideClear={false}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="taxCode"
            render={({field: {onChange, onBlur, value}}) => (
              <View style={style.row}>
                <CTFormInput
                  placeholderTextColor={Colors.SubText2}
                  keyboardType="numeric"
                  title="Mã số thuế"
                  placeholder="Mã số thuế"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  hideClear={false}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="cardNumber"
            render={({field: {onChange, onBlur, value}}) => (
              <View style={style.row}>
                <CTFormInput
                  placeholderTextColor={Colors.SubText2}
                  title="Quét mã thẻ thành viên"
                  placeholder="Quét mã thẻ thành viên"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  hideClear
                  isBarcode={true}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="districtId"
            render={({field: {}}) => (
              <View style={style.row}>
                <CTSelectNavigate
                  onPress={() => {
                    navigation.navigate(MainRouteConfig.Area, {
                      returnLink: MainRouteConfig.CreateCustomer,
                      countryId: 233,
                      data: {
                        ...requestSelectCustomer,
                        barcode: {
                          type: 'customer',
                          value: getValues('cardNumber'),
                        },
                      },
                    });
                  }}
                  title="Khu vực"
                  placeholder="Khu vực"
                  value={itemClick?.getCityDistrictName()}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="wardId"
            render={({field: {}}) => (
              <View style={style.row}>
                <CTSelectNavigate
                  disabled={!itemClick?.getId()}
                  onPress={() => {
                    navigation.navigate(MainRouteConfig.Ward, {
                      returnLink: MainRouteConfig.CreateCustomer,
                      districtId: itemClick?.getDistrictId(),
                      data: {
                        ...requestSelectCustomer,
                        barcode: {
                          type: 'customer',
                          value: getValues('cardNumber'),
                        },
                      },
                    });
                  }}
                  title="Phường/ Xã"
                  placeholder="Phường/ Xã"
                  value={itemWard?.getName()}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="fullAddress"
            render={({field: {onChange, onBlur, value}}) => (
              <View style={style.row}>
                <CTFormInput
                  placeholderTextColor={Colors.SubText2}
                  title="Địa chỉ cụ thể"
                  placeholder="Địa chỉ cụ thể"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  hideClear={false}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="responsibleStaffCode"
            render={({field: {}}) => (
              <View style={style.row}>
                <CTSelectNavigate
                  onPress={() => {
                    navigation.navigate(MainRouteConfig.Assignee, {
                      returnLink: MainRouteConfig.CreateCustomer,
                      data: {
                        ...requestSelectCustomer,
                        barcode: {
                          type: 'customer',
                          value: getValues('cardNumber'),
                        },
                      },
                    });
                  }}
                  title="Nhân viên phụ trách"
                  placeholder="Nhân viên phụ trách"
                  value={itemAssignee?.getCodeName()}
                />
              </View>
            )}
          />
        </KeyboardAwareScrollView>
        <ScreenBottom>
          <View style={[style.viewBottom]}>
            <CTButton
              onPress={handleSubmit(onSubmit)}
              text="Thêm mới khách hàng"
            />
          </View>
        </ScreenBottom>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default CreateCustomerScreen;
