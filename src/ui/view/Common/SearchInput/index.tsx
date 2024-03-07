import {Colors} from 'assets/colors';
import {ic_delete, ic_scan_barcode, ic_search} from 'assets/images';
import {CTInput} from 'components/Base';
import {CTButtonIcon} from 'components/Button';
import {useAppDispatch} from 'hook/CustomReduxHook';
import React from 'react';
import {Image, Platform, StyleProp, View, ViewStyle} from 'react-native';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import SearchInputStyle from './style';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  onBarCodePress?: () => void;
  showBarcode?: boolean;
  autoFocus?: boolean;
}

const Permission =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  autoFocus,
  onBarCodePress,
  showBarcode,
}) => {
  const dispatch = useAppDispatch();
  const onBarcode = () => {
    request(Permission).then(result => {
      if (result === RESULTS.GRANTED) {
        onBarCodePress && onBarCodePress();
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
    <View style={[SearchInputStyle.container, style]}>
      <View>
        <Image source={ic_search} style={SearchInputStyle.icon} />
      </View>
      <CTInput
        style={SearchInputStyle.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.Gray500}
        fontSize={14}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        value={value}
      />
      {value !== '' && (
        <CTButtonIcon onPress={() => onChangeText('')} icon={ic_delete} />
      )}
      {showBarcode && (
        <View style={SearchInputStyle.viewBarCode}>
          <CTButtonIcon onPress={onBarcode} icon={ic_scan_barcode} />
        </View>
      )}
    </View>
  );
};

export default SearchInput;
