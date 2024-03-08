import React, {FC} from 'react';
import {Layout} from 'common-ui';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {TabOtherStyle} from './style';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import {useDispatch} from 'react-redux';
import {hideModal, showConfirm, showLoading} from 'reduxs/Modals/ModalReducer';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import {logout} from 'reduxs/UserReducer';

type Props = MainStackScreenProps<'Main'>;

const TabOther: FC<Props> = ({}: Props) => {
  const dispatch = useDispatch();
  const onLogoutPress = () => {
    dispatch(
      showConfirm({
        okText: 'Đăng xuất',
        cancelText: 'Hủy',
        message: 'Bạn có muốn kết thúc phiên đăng nhập này không?',
        title: 'Đăng xuất',
        onOk: () => {
          dispatch(showLoading());
          Promise.all([LocalStorageUtils.clearGlobalEnv()]).then(() => {
            setTimeout(() => {
              dispatch(hideModal());
              dispatch(logout());
            }, 1000);
          });
        },
      }),
    );
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Thêm" />
      <Layout.SafeAreaContainer edges={['bottom']}>
        <ScrollView style={TabOtherStyle.container}>
          <TouchableOpacity
            onPress={onLogoutPress}
            style={TabOtherStyle.btnLogout}>
            <CTTypography.Text
              font={Font.Medium}
              style={TabOtherStyle.txtLogout}
              level="2"
              text="Đăng xuất"
            />
          </TouchableOpacity>
        </ScrollView>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default TabOther;
