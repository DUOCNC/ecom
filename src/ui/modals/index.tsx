import {ModalType} from 'config/ModalConfig';
import {useAppDispatch, useAppSelector} from 'hook/CustomReduxHook';
import React, {ReactElement, useMemo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import ConfirmModal from './ConfirmModal';
import ImageViewerModal from './ImageViewerModal';
import LoadingModal from './LoadingModal';
import ModalStyle from './style';
import {hideModal} from 'reduxs/Modals/ModalReducer';

export interface BaseModalProps {
  isVisible?: boolean;
  component?: ReactElement;
  style?: StyleProp<ViewStyle>;
  enablePressBack?: boolean;
}

const AppModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector(state => state.modal);
  const {type, modal, data} = modalState;
  const {component, isVisible, style, enablePressBack} = modal;

  const view = useMemo(() => {
    switch (type) {
      case ModalType.Empty:
        return <View />;
      case ModalType.Loading:
        return <LoadingModal />;
      case ModalType.Confirm:
        return <ConfirmModal {...data} />;
      case ModalType.ImageViewer:
        return <ImageViewerModal {...data} />;
      default:
        return component;
    }
  }, [component, data, type]);
  return (
    <Modal
      onBackButtonPress={() => {
        if (data?.onBackButtonPress) {
          data?.onBackButtonPress();
          return;
        }

        if (enablePressBack) {
          dispatch(hideModal());
        }
      }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={[ModalStyle.container, style]}
      backdropOpacity={0.4}
      useNativeDriverForBackdrop={true}
      isVisible={isVisible}>
      {view}
    </Modal>
  );
};

export default AppModal;
