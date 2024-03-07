import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductStoreReducer, StoreSubReducer} from '../models';

const initialState: ProductStoreReducer = {
  initial: false,
  store: {
    id: -1,
    name: '',
  },
};

export const productStoreSlice = createSlice({
  name: 'productStore',
  initialState: initialState,
  reducers: {
    initStore: (state, action: PayloadAction<StoreSubReducer>) => {
      state.initial = true;
      state.store = {
        id: action.payload.id,
        name: action.payload.name,
      };
    },
    changeStore: (state, action: PayloadAction<StoreSubReducer>) => {
      state.store = {
        id: action.payload.id,
        name: action.payload.name,
      };
    },
  },
});
export const {initStore, changeStore} = productStoreSlice.actions;

export default productStoreSlice.reducer;
