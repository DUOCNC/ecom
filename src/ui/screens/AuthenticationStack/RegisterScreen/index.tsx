import {CTFormInput} from 'components/Form';
import React, {createRef, useEffect, useState} from 'react';
import {FC} from 'react';
import {Keyboard, TextInput, View} from 'react-native';
import {RegisterStyle} from './styles';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {CTButton} from 'components/Button';
import {useAppDispatch} from 'hook/CustomReduxHook';
import {showLoading, hideModal} from 'reduxs/Modals/ModalReducer';
import {showError, showSuccess} from 'utils/ToastUtils';
import {AuthStackScreenProps} from '..';
import CTLayout from 'components/CTLayout';
import {RegisterForm} from './RegisterForm';
import {fakeRegister} from 'services/MobileService/FakeAuthenApi';
import CTTypography from 'components/CTTypography';
import {AuthenticationConfig} from 'config/RouteConfig';

type Props = AuthStackScreenProps<'Register'>;
const RegisterScreen: FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const passwordRef = createRef<TextInput>();
  const confirmPasswordRef = createRef<TextInput>();
  const accountRef = createRef<TextInput>();
  const storeRef = createRef<TextInput>();
  const {
    setValue,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterForm>({
    defaultValues: {
      user_name: '',
      store: '',
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        store: yup.string().required('Tên cửa hàng không được để trống'),
        user_name: yup
          .string()
          .required('Tên đăng nhập không được để trống')
          .matches(/^[a-zA-Z0-9]{4,20}$/, 'Tên đăng nhập sai định dạng'),
        password: yup.string().required('Mật khẩu không được để trống'),
        confirm_password: yup
          .string()
          .required('Mật khẩu nhập lại không được để trống')
          .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không đúng'),
      }),
    ),
  });
  const onSubmit = async (request: RegisterForm) => {
    await Keyboard.dismiss();
    dispatch(showLoading());
    fakeRegister(
      {
        store: request.store,
        password: request.password,
        user_name: request.user_name,
      },
      response => {
        showSuccess('Đăng ký tài khoản thành công');
        navigation.navigate(AuthenticationConfig.Login, {
          user_name: response.user_name,
        });
      },
      err => {
        showError(err[0]);
        setValue('password', '');
        setValue('confirm_password', '');
        passwordRef.current?.focus();
      },
      () => dispatch(hideModal()),
    );
  };
  useEffect(() => {
    if (firstLoad) {
      setTimeout(() => {
        storeRef.current?.focus();
        setFirstLoad(false);
      }, 500);
    }
  }, [firstLoad, storeRef]);
  return (
    <CTLayout.Container disableHideKeyboardOnPress={false}>
      <CTLayout.HeaderBack title="Đăng ký" />
      <CTLayout.Body>
        <View style={RegisterStyle.container}>
          <View style={[RegisterStyle.marginView]}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <CTFormInput
                  ref={storeRef}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  blurOnSubmit={false}
                  value={value}
                  title="Tên cửa hàng"
                  returnKeyType="next"
                  onSubmitEditing={() => accountRef.current?.focus()}
                  placeholder="Tên cửa hàng"
                  error={errors.user_name?.message}
                />
              )}
              name="store"
            />
          </View>
          <View style={[RegisterStyle.marginTop16]}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <CTFormInput
                  ref={accountRef}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  blurOnSubmit={false}
                  value={value}
                  title="Tên đăng nhập"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  placeholder="Tên đăng nhập"
                  error={errors.user_name?.message}
                />
              )}
              name="user_name"
            />
          </View>
          <View style={[RegisterStyle.marginTop16]}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <CTFormInput
                  ref={passwordRef}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  onSubmitEditing={() => {
                    confirmPasswordRef.current?.focus();
                  }}
                  title="Mật khẩu"
                  placeholder="Mật khẩu"
                  isPassword
                  error={errors.password?.message}
                />
              )}
              name="password"
            />
          </View>
          <View style={[RegisterStyle.marginTop16]}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <CTFormInput
                  ref={confirmPasswordRef}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  title="Nhập lại mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                  isPassword
                  error={errors.confirm_password?.message}
                />
              )}
              name="confirm_password"
            />
          </View>
          <View style={RegisterStyle.marginView}>
            <CTTypography.Text
              style={RegisterStyle.policy}
              level="2"
              text="Bằng việc nhấn vào nút đăng ký là bạn đã đồng ý với điều khoản sử dụng của chúng tôi"
            />
            <CTButton text="Đăng ký" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </CTLayout.Body>
    </CTLayout.Container>
  );
};

export default RegisterScreen;
