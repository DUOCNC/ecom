import React, {useEffect, useState} from 'react';
import {SearchInput} from 'common-ui';
import {Image, Platform, TouchableOpacity} from 'react-native';
import {ic_scan_barcode} from 'assets/images';
import style from './style';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {MainRouteConfig} from 'config/RouteConfig';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {useAppDispatch} from 'hook';

type Props = {
  onSearch: (keyword: string) => void;
  onSearchPress: (keyword: string) => void;
  barcodeScreen?: string;
};

const SearchTransferView: React.FC<Props> = ({
  onSearch,
  onSearchPress,
  barcodeScreen = MainRouteConfig.BarcodeScanner,
}) => {
  const [value, setValue] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const Permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  const showModal = () => {
    dispatch(
      showConfirm({
        title: 'Không có quyền truy cập',
        message: 'Vui lòng cấp quyền truy cập camera để sử dụng tính năng này',
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
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 500);
    return () => clearTimeout(timeout);
  }, [onSearch, value]);
  return (
    <SearchInput
      value={value}
      onValueChange={v => setValue(v)}
      placeholder="Tìm kiếm phiếu chuyển"
      onSearchPress={onSearchPress}
      enablesReturnKeyAutomatically={true}
      right={
        <TouchableOpacity style={style.button} onPress={onPress}>
          <Image source={ic_scan_barcode} />
        </TouchableOpacity>
      }
    />
  );
};

export default SearchTransferView;
