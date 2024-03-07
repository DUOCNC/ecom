import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {MainStackScreenProps} from '..';
import {BottomMainConfig} from 'config/RouteConfig';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {useAppDispatch} from 'hook/CustomReduxHook';
import {cancelDeleteTicketMeApi} from 'services/AccountService/AccountApi';
import {showError, showSuccess} from 'utils/ToastUtils';
import {Layout, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = MainStackScreenProps<'AccountDeleteRequest'>;

const AccountDeleteRequestScreen: FC<Props> = ({navigation}: Props) => {
  const bottom = useSafeAreaInsets().bottom;
  const dispatch = useAppDispatch();

  const onOk = () => {
    cancelDeleteTicketMeApi(
      res => {
        if (res) {
          showSuccess('Hủy yêu cầu xóa tài khoản thành công.');
          navigation.navigate(BottomMainConfig.Home);
        }
      },
      mess => {
        showError(mess.toString());
      },
      () => {},
    );
    dispatch(hideModal());
  };

  const handleCancelRequest = () => {
    dispatch(
      showConfirm({
        title: 'Huỷ yêu cầu xoá tài khoản',
        cancelText: 'Hủy',
        okText: 'Đồng ý',
        buttonType: 'default',
        message: 'Bạn không muốn xoá tài khoản nữa?',
        onOk: onOk,
      }),
    );
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Yêu cầu xóa tài khoản" />
      <Layout.Container>
        <Typography
          style={style.txt}
          type="h3"
          text="Yêu cầu xóa tài khoản của bạn sẽ được gửi đến quản trị viên! Trong thời gian chờ xem xét, bạn có thể huỷ yêu cầu xoá tài khoản này. Cảm ơn bạn đã đồng hành cùng chúng tôi."
        />
      </Layout.Container>
      <View style={[style.bottom, {paddingBottom: bottom}]}>
        <TouchableOpacity
          style={style.btn}
          onPress={() => {
            navigation.navigate(BottomMainConfig.Home);
          }}>
          <Typography
            type="h3"
            textType="medium"
            color={colors.primary.o500}
            text="Quay lại trang chủ"
          />
        </TouchableOpacity>
        <View />
        <TouchableOpacity
          style={[style.btn, style.btnPrimary]}
          onPress={handleCancelRequest}>
          <Typography
            type="h3"
            textType="medium"
            color={colors.base.white}
            text="Hủy yêu cầu xóa"
          />
        </TouchableOpacity>
      </View>
    </Layout.Screen>
  );
};

export default AccountDeleteRequestScreen;
