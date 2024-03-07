import {Font} from 'components/Base/Text';
import {CTButton} from 'components/Button';
import CTTypography from 'components/CTTypography';
import {useAppDispatch} from 'hook/CustomReduxHook';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {hideModal} from 'reduxs/Modals/ModalReducer';
import style from './style';

export interface IInfoModal {
  title?: string;
  message?: string | ReactNode;
  okText?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

const InfoModal: React.FC<IInfoModal> = (props: IInfoModal) => {
  const {title, message, okText, onCancel} = props;
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
            numberOfLines={2}
            style={style.txtMessage}
            text={message}
          />
        ) : (
          message
        )}
      </View>
      <View style={style.rowButton}>
        <CTButton
          level="2"
          style={style.btn}
          onPress={() => {
            if (onCancel) {
              onCancel();
            } else {
              dispatch(hideModal);
            }
          }}
          font={Font.Regular}
          type="plain"
          text={okText ? okText : 'Đóng'}
        />
      </View>
    </View>
  );
};

export default InfoModal;
