import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {CTFormInput} from 'components/Form';
import React, {createRef} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ChangePasswordStyle} from './styles';
import {ChangePasswordRequest} from 'model/request/ChangePasswordRequest';
import {updatePasswordApi} from 'services/AccountService/AuthenticationApi';
import {useAppDispatch} from 'hook/CustomReduxHook';
import {hideModal, showConfirm, showLoading} from 'reduxs/Modals/ModalReducer';
import {showError, showSuccess} from 'utils/ToastUtils';
import CTLayout from 'components/CTLayout';
import {CTButton} from 'components/Button';
import {MainStackScreenProps} from '..';

type Props = MainStackScreenProps<'ChangePassword'>;
const ChangePasswordScreen: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const passwordRef = createRef<TextInput>();
  const rePasswordRef = createRef<TextInput>();
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors, isDirty},
  } = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        password: yup
          .string()
          .required('Mật khẩu mới không được để trống')
          .min(6, 'Mật khẩu bao gồm 6 đến 12 ký tự')
          .max(12, 'Mật khẩu bao gồm 6 đến 12 ký tự'),
        confirm_password: yup
          .string()
          .required('Mật khẩu nhập lại không được để trống')
          .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không đúng'),
      }),
    ),
  });
  const onSubmit = (request: ChangePasswordRequest) => {
    dispatch(showLoading());
    updatePasswordApi(
      request,
      () => {
        navigation.goBack();
        showSuccess('Đổi mật khẩu thành công');
      },
      errorsMsg => {
        showError(errorsMsg[0]);
        reset({
          password: '',
          confirm_password: '',
        });
      },
      () => {
        dispatch(hideModal());
      },
    );
  };
  const onHandle = (value: ChangePasswordRequest) => {
    Keyboard.dismiss();
    dispatch(
      showConfirm({
        message:
          'Sau khi đổi mật khẩu hệ thống sẽ đăng xuất ra. Xác nhận đổi mật khẩu?',
        onCancel: () => dispatch(hideModal()),
        onOk: () => {
          onSubmit(value);
        },
      }),
    );
  };
  return (
    <TouchableWithoutFeedback style={ChangePasswordStyle.container}>
      <CTLayout.Container>
        <CTLayout.HeaderBack title="Đổi mật khẩu" isDirty={isDirty} />
        <CTLayout.Body>
          <View style={ChangePasswordStyle.body}>
            <View style={ChangePasswordStyle.rowInput}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <CTFormInput
                    ref={passwordRef}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    title="Mật khẩu mới"
                    placeholder="Mật khẩu mới"
                    isPassword
                    returnKeyType="next"
                    onSubmitEditing={() => rePasswordRef.current?.focus()}
                    error={errors.password?.message}
                  />
                )}
                name="password"
              />
            </View>
            <View style={ChangePasswordStyle.rowInput}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <CTFormInput
                    ref={rePasswordRef}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    title="Nhập lại mật khẩu mới"
                    placeholder="Nhập lại mật khẩu mới"
                    isPassword
                    onSubmitEditing={handleSubmit(onHandle)}
                    error={errors.confirm_password?.message}
                  />
                )}
                name="confirm_password"
              />
            </View>
            <View style={ChangePasswordStyle.rowButton}>
              <CTButton onPress={handleSubmit(onSubmit)} text="Lưu mật khẩu" />
            </View>
          </View>
        </CTLayout.Body>
      </CTLayout.Container>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordScreen;
