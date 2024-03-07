import {ic_scan_barcode, ic_search} from 'assets/images';
import {CTButtonIcon} from 'components/Button';
import CTTypography from 'components/CTTypography';
import {useAppDispatch} from 'hook/CustomReduxHook';
import React from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {SearchButtonStyle} from './style';

interface SearchButtonProps {
  text: string;
  onPress: () => void;
  onBarCodePress: () => void;
}

const Permission =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

const SearchButton: React.FC<SearchButtonProps> = (
  props: SearchButtonProps,
) => {
  const dispatch = useAppDispatch();
  const {text, onPress, onBarCodePress} = props;
  const onBarcode = () => {
    request(Permission).then(result => {
      if (result === RESULTS.GRANTED) {
        onBarCodePress();
      } else {
        dispatch(
          showConfirm({
            title: 'Không có quyền truy cập',
            message:
              'Vui lòng cấp quyền truy cập camera để sự dụng tính năng này',
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
      }
    });
  };
  return (
    <View style={SearchButtonStyle.container}>
      <TouchableOpacity onPress={onPress} style={SearchButtonStyle.btnSearch}>
        <View style={SearchButtonStyle.icon}>
          <Image source={ic_search} />
        </View>
        <CTTypography.Text
          level="3"
          style={SearchButtonStyle.txtSearch}
          text={text}
        />
      </TouchableOpacity>
      <View style={SearchButtonStyle.viewBarCode}>
        <CTButtonIcon onPress={onBarcode} icon={ic_scan_barcode} />
      </View>
    </View>
  );
};

export default SearchButton;
