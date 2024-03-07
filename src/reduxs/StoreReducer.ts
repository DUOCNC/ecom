import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiReducer} from 'common';
import {StoreResponse} from 'model';

const initialState: ApiReducer<Array<StoreResponse>> = {
  isLoad: false,
  data: [],
  error: false,
  loading: false,
};

export const storeSlice = createSlice({
  name: 'stores',
  initialState: initialState,
  reducers: {
    loadingStore: state => {
      state.loading = true;
      state.error = false;
    },
    saveStores: (state, action: PayloadAction<Array<StoreResponse>>) => {
      state.isLoad = true;
      state.loading = false;
      state.data = action.payload;
    },
  },
});
export const {loadingStore, saveStores} = storeSlice.actions;

export default storeSlice.reducer;
