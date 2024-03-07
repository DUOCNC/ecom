import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrderConfigReducer, OrderConfigResponse} from '../models';

const initialState: OrderConfigReducer = {
  allowChooseItem: true,
  forAllOrder: false,
  hideBonusItem: true,
  hideGift: true,
  orderConfigAction: 'open_try',
  orderConfigPrint: {
    id: 1,
    name: 'In 1 liên',
  },
  sellableInventory: true,
};

export const orderConfigSlice = createSlice({
  name: 'orderConfig',
  initialState: initialState,
  reducers: {
    saveOrderConfig: (state, action: PayloadAction<OrderConfigResponse>) => {
      const payload = action.payload;
      state.allowChooseItem = payload.allowChooseItem;
      state.forAllOrder = payload.forAllOrder;
      state.hideBonusItem = payload.hideBonusItem;
      state.hideGift = payload.hideGift;
      state.orderConfigAction = payload.orderConfigAction;
      state.orderConfigPrint = payload.orderConfigPrint;
      state.sellableInventory = payload.sellableInventory;
    },
  },
});
export const {saveOrderConfig} = orderConfigSlice.actions;

export default orderConfigSlice.reducer;
