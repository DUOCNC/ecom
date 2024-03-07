import React, {useMemo} from 'react';
import {SearchView} from 'common-ui';
import {Image, Platform, TouchableOpacity} from 'react-native';
import {ic_scan_barcode} from 'assets/images';
import style from './style';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {useAppDispatch} from 'hook/CustomReduxHook';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {RootStackParamList} from 'ui/screens/MainStack';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainRouteConfig} from 'config/RouteConfig';

interface Props {
  keyword: string;
  onSearchPress: () => void;
  barcodeScreen?: string;
}

const Permission =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

const SearchProductPositioningView: React.FC<Props> = ({
  keyword,
  onSearchPress,
  barcodeScreen = MainRouteConfig.BarcodeScanner,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const showModal = () => {
    dispatch(
      showConfirm({
        title: 'Không có quyền truy cập',
        message: 'Vui lòng cấp quyền truy cập camera để sự dụng tính năng này',
        okText: 'Cấp quyền',
        cancelText: 'Đóng',
        onCancel: () => {
          dispatch(hideModal());
        },
        onOk: () => {
          dispatch(hideModal());
          openSettings();
        },
      }),
    );
  };
  const onPress = () => {
    request(Permission).then(result => {
      if (result === RESULTS.GRANTED) {
        navigation.navigate(barcodeScreen);
      } else {
        showModal();
      }
    });
  };
  const onInputPress = () => {
    onSearchPress && onSearchPress();
  };

  const title = useMemo(
    () => (keyword === '' ? 'Tìm kiếm sản phẩm' : keyword),
    [keyword],
  );

  return (
    <SearchView
      title={title}
      themeStyle="dark"
      onPress={onInputPress}
      right={
        <TouchableOpacity style={style.button} onPress={onPress}>
          <Image source={ic_scan_barcode} />
        </TouchableOpacity>
      }
    />
  );
};

export default SearchProductPositioningView;
