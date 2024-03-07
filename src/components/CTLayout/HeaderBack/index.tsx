import {useNavigation} from '@react-navigation/native';
import {back} from 'assets/images';
import {Font} from 'components/Base/Text';
import CTButtonIcon from 'components/Button/CTButtonIcon';
import CTTypography from 'components/CTTypography';
import {useAppDispatch} from 'hook/CustomReduxHook';
import React, {ReactNode} from 'react';
import {View, ViewStyle, StyleProp} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import style from './style';

interface HeaderBackProps {
  right?: ReactNode;
  title: string;
  onBackPress?: () => void;
  style?: StyleProp<ViewStyle>;
  isDirty?: boolean;
  hideBack?: boolean;
  bottom?: ReactNode;
}

const HeaderBack: React.FC<HeaderBackProps> = ({
  title,
  right,
  onBackPress,
  isDirty,
  style: customStyle,
  hideBack,
  bottom,
}) => {
  const dispatch = useAppDispatch();
  const top = useSafeAreaInsets().top;
  const navigation = useNavigation();
  const onBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    if (isDirty) {
      dispatch(
        showConfirm({
          title: 'Thông báo',
          message:
            'Nếu quay lại bạn có muốn hủy thông tin đã thay đổi. Bạn có muốn quay lại?',
          okText: 'Quay lại',
          cancelText: 'Đóng',
          onOk: () => {
            dispatch(hideModal());
            navigation.goBack();
          },
          onCancel: () => {
            dispatch(hideModal());
          },
        }),
      );
      return;
    }
    navigation.goBack();
  };
  return (
    <View
      style={[
        style.container,
        {
          paddingTop: top,
        },
        customStyle,
      ]}>
      <View style={style.rowBar}>
        <View style={[style.edge]}>
          {!hideBack && (
            <CTButtonIcon onPress={onBack} style={style.btnBack} icon={back} />
          )}
        </View>
        <View style={style.center}>
          <CTTypography.Text level="2" font={Font.Medium} text={title} />
        </View>
        <View style={[style.edge]}>{right}</View>
      </View>
      {bottom}
    </View>
  );
};

export default HeaderBack;
