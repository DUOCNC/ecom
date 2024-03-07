import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {back} from 'assets/images';
import CTButtonIcon from 'components/Button/CTButtonIcon';
import CTTypograpy from 'components/CTTypography';
import {useAppDispatch} from 'hook/CustomReduxHook';
import {View} from 'react-native';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import style from './style';
import CTToolbar from './CTToolbar';

export interface CTToolbarBackProps {
  showBack?: boolean;
  title?: string;
  right?: React.ReactElement;
  onBeforeBack?: () => void;
  onBack?: () => void;
  askBeforkBack?: boolean;
}

const CTToolbarBack: React.FC<CTToolbarBackProps> = (
  props: CTToolbarBackProps,
) => {
  const dispatch = useAppDispatch();
  const {showBack, title, right, onBeforeBack, askBeforkBack, onBack} = props;
  const navigtion = useNavigation();
  const ask = () => {
    dispatch(
      showConfirm({
        message:
          'Nếu quay lại bạn có muốn hủy thông tin đã nhập. Bạn có muốn quay lại?',
        onOk: () => {
          dispatch(hideModal());
          setTimeout(() => navigtion.goBack(), 200);
        },
      }),
    );
  };
  const onBackPress = () => {
    if (onBack) {
      onBack();
      return;
    }
    onBeforeBack && onBeforeBack();
    if (navigtion.canGoBack()) {
      askBeforkBack ? ask() : navigtion.goBack();
    }
  };

  return (
    <CTToolbar>
      {(showBack || right) && (
        <View style={style.rowBar}>
          {showBack && <CTButtonIcon onPress={onBackPress} icon={back} />}
          <View style={style.rowTitle}>
            <CTTypograpy.Text text={title} />
          </View>
          {right}
        </View>
      )}
    </CTToolbar>
  );
};

export default CTToolbarBack;
