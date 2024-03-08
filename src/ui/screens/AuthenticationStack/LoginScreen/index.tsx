import {logo_shg} from 'assets/images';
import {CTFormInput} from 'components/Form';
import React, {createRef, useEffect, useState} from 'react';
import {FC} from 'react';
import {
  Image,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoginStyle} from './style';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {CTButton} from 'components/Button';
import {AuthenticationConfig} from 'config/RouteConfig';
import {AuthStackScreenProps} from '..';
import {StatusBar, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {useAppDispatch} from 'hook';
import {LoginRequest} from 'model/request';
import {hideModal, showLoading} from 'reduxs/Modals/ModalReducer';
import {loginApi} from 'api/AuthenticationApi';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import {loginSuccess} from 'reduxs/UserReducer';
import {showError} from 'utils/ToastUtils';

type Props = AuthStackScreenProps<'Login'>;
const LoginScreen: FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const passwordRef = createRef<TextInput>();
  const accountRef = createRef<TextInput>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup
          .string()
          .required('Tên đăng nhập không được để trống')
          .matches(/^[a-zA-Z0-9]{4,20}$/, 'Tên đăng nhập sai định dạng'),
        password: yup.string().required('Mật khẩu không được để trống'),
      }),
    ),
  });
  const onSubmit = async (request: LoginRequest) => {
    await Keyboard.dismiss();
    dispatch(showLoading());
    loginApi(
      request,
      res => {
        Promise.all([
          LocalStorageUtils.setToken(res.AccessToken),
          LocalStorageUtils.setUserName(res.UserName),
        ]).then(() => {
          dispatch(loginSuccess());
        });
      },
      errorMsgs => {
        showError(errorMsgs[0]);
        setValue('password', '');
        passwordRef.current?.focus();
        dispatch(hideModal());
      },
      () => dispatch(hideModal()),
    );
  };
  const onRegister = () => {
    navigation.navigate(AuthenticationConfig.Register);
  };
  useEffect(() => {
    if (firstLoad) {
      setTimeout(() => {
        accountRef.current?.focus();
        setFirstLoad(false);
      }, 500);
    }
  }, [accountRef, firstLoad]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={LoginStyle.container}>
        <StatusBar barStyle="dark-content" />
        <View style={LoginStyle.container}>
          <View style={LoginStyle.rowLogo}>
            <Image
              resizeMode="contain"
              style={LoginStyle.imgLogo}
              source={logo_shg}
            />
            <Typography
              color={colors.primary.o500}
              type="h2"
              text="Xin chào!"
            />
          </View>
          <View style={[LoginStyle.marginView]}>
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
                  error={errors.username?.message}
                />
              )}
              name="username"
            />
          </View>
          <View style={[LoginStyle.marginTop16]}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <CTFormInput
                  ref={passwordRef}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  title="Mật khẩu"
                  placeholder="Mật khẩu"
                  isPassword
                  error={errors.password?.message}
                />
              )}
              name="password"
            />
          </View>
          <View style={LoginStyle.marginView}>
            <CTButton text="Đăng nhập" onPress={handleSubmit(onSubmit)} />
            <CTButton
              style={LoginStyle.btnRegister}
              type="secondary"
              text="Đăng ký"
              onPress={onRegister}
            />
          </View>
          {/* <View style={LoginStyle.support}>
            <Typography text="Không thể đăng nhập? " />
            <TouchableOpacity onPress={() => {}}>
              <Typography
                textType="medium"
                color={colors.primary.o500}
                text="Trợ giúp"
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
