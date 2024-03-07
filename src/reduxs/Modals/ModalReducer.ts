import {IConfirmModal} from 'ui/modals/ConfirmModal/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ModalType} from 'config/ModalConfig';
import {BaseModalProps} from 'ui/modals';
import {ImageViewerProps} from 'ui/modals/ImageViewerModal';

export interface RdModal {
  type: ModalType;
  modal: BaseModalProps;
  data?: any;
}

const initialState: RdModal = {
  type: ModalType.Empty,
  modal: {
    isVisible: false,
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    showLoading: state => {
      state.type = ModalType.Loading;
      state.modal = {
        isVisible: true,
      };
    },
    showConfirm: (state, action: PayloadAction<IConfirmModal>) => {
      state.type = ModalType.Confirm;
      state.modal = {
        isVisible: true,
      };
      state.data = action.payload;
    },
    showImageViewer: (state, action: PayloadAction<ImageViewerProps>) => {
      state.type = ModalType.ImageViewer;
      state.modal = {
        isVisible: true,
      };
      state.data = action.payload;
    },
    hideModal: state => {
      state.modal = {
        isVisible: false,
      };
    },
  },
});
export const {showLoading, hideModal, showConfirm, showImageViewer} =
  modalSlice.actions;

export default modalSlice.reducer;
