import {Font} from 'components/Base/Text';
import {CTButton} from 'components/Button';
import CTTypography from 'components/CTTypography';
import {useAppDispatch} from 'hook/CustomReduxHook';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {hideModal} from 'reduxs/Modals/ModalReducer';
import style from './style';

export interface IConfirmModal {
  title?: string;
  message?: string | ReactNode;
  okText?: string | ReactNode;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  buttonType?: 'default' | 'destruction';
  cancelButtonType?: 'default' | 'destruction';
  isDisableCancelButton?: boolean;
  onBackButtonPress?: () => void;
}

const ConfirmModal: React.FC<IConfirmModal> = (props: IConfirmModal) => {
  const {
    title,
    message,
    okText,
    cancelText,
    onOk,
    onCancel,
    cancelButtonType = 'default',
    buttonType = 'destruction',
    isDisableCancelButton = false,
  } = props;
  const dispatch = useAppDispatch();
  return (
    <View style={style.container}>
      <View style={style.rowTitle}>
        <CTTypography.Text
          level="1"
          font={Font.Medium}
          text={title ? title : 'Thông báo'}
        />
      </View>
      <View style={style.rowMessage}>
        {typeof message === 'string' ? (
          <CTTypography.Text
            level="3"
            style={style.txtMessage}
            text={message}
          />
        ) : (
          message
        )}
      </View>
      <View style={style.rowButton}>
        {!isDisableCancelButton && (
          <CTButton
            text={cancelText ? cancelText : 'Đóng'}
            type="plain"
            style={style.btn}
            level="2"
            buttonType={cancelButtonType}
            onPress={() => {
              if (onCancel) {
                onCancel();
              } else {
                dispatch(hideModal());
              }
            }}
            font={Font.Regular}
          />
        )}
        {!isDisableCancelButton && <View style={style.center} />}
        <CTButton
          level="2"
          style={style.btn}
          onPress={() => {
            onOk && onOk();
          }}
          font={Font.Medium}
          type="plain"
          text={okText ? okText : 'Xác nhận'}
          buttonType={buttonType}
        />
      </View>
    </View>
  );
};

export default ConfirmModal;
