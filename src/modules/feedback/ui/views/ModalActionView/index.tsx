import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {DimentionUtils, Typography, useBottomSheetBackHandler} from 'common-ui';
import {colors} from 'assets/v2';
import {Image, TouchableOpacity, View} from 'react-native';
import {ic_edit, ic_trash_full} from 'assets/images';
import style from './style';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {feedbackService} from 'modules/feedback/services';
import {showError, showSuccess} from 'utils/ToastUtils';
import {hideModal, showConfirm, showLoading} from 'reduxs/Modals/ModalReducer';
import {useAppDispatch} from 'hook';
import {FeedbackEntity} from 'modules/feedback/models/entities';

interface ModalActionProps {
  feedback: FeedbackEntity;
  reload: () => void;
  firstDate: Date;
  secondDate: Date;
}

export type ModalSlotRef = {
  open: () => void;
  close: () => void;
};

export type ModalSlotView = ForwardRefRenderFunction<
  ModalSlotRef,
  ModalActionProps
>;

const ModalSlotView: ModalSlotView = (
  {feedback, reload, firstDate, secondDate},
  ref,
) => {
  const modalRef = createRef<BottomSheetModal>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const onClose = () => {
    modalRef.current?.close();
  };
  const onOpen = () => {
    modalRef.current?.present();
  };
  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);
  useImperativeHandle(ref, () => ({
    close: onClose,
    open: onOpen,
  }));
  const onPressEdit = () => {
    navigation.navigate(MainRouteConfig.FeedbackEdit, {
      feedbackId: feedback.getId(),
      onGoBack: () => reload(),
      firstDate,
      secondDate,
    });
    onClose();
  };

  const onPressDelete = () => {
    dispatch(
      showConfirm({
        title: 'Xoá lốt khách',
        message: 'Bạn có chắc chắn muốn xóa lốt khách này không?',
        okText: 'Xác nhận',
        cancelText: 'Huỷ',
        onOk: () => {
          feedbackService.deleteFeedback(
            feedback.getId(),
            () => {
              onClose();
              showSuccess('Xoá lốt khách hàng thành công');
              setTimeout(() => {
                reload();
              }, 500);
            },
            () => {
              dispatch(hideModal());
              showError('Xoá lốt khách hàng thất bại');
            },
            () => {
              dispatch(showLoading());
            },
          );
        },
        onCancel: () => {
          dispatch(hideModal());
        },
      }),
    );
  };

  return (
    <BottomSheetModal
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.4}
          pressBehavior="close"
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
      onChange={handleSheetPositionChange}
      handleComponent={null}
      containerStyle={{backgroundColor: colors.base.tranparents}}
      snapPoints={[DimentionUtils.scale(170)]}
      ref={modalRef}>
      <View style={style.container}>
        <View style={style.header}>
          <Typography text={feedback.getCode()} textType="medium" type="h3" />
        </View>
        <View style={style.body}>
          <TouchableOpacity style={style.actionItem} onPress={onPressEdit}>
            <Image style={style.iconAction} source={ic_edit} />
            <Typography style={style.text} text="Sửa" />
          </TouchableOpacity>
          <TouchableOpacity style={style.actionItem} onPress={onPressDelete}>
            <Image style={style.iconAction} source={ic_trash_full} />
            <Typography style={style.text} text="Xoá" />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default forwardRef(ModalSlotView);
