import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiReducer} from 'common';
import {CategoryResponse} from '../models';

const initialState: ApiReducer<Array<CategoryResponse>> = {
  isLoad: false,
  data: [],
  error: false,
  loading: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    loadingCategoryResponse: state => {
      state.loading = true;
      state.error = false;
    },
    saveCategoryResponse: (
      state,
      action: PayloadAction<Array<CategoryResponse>>,
    ) => {
      state.isLoad = true;
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    errorCategoryResponse: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  loadingCategoryResponse,
  saveCategoryResponse,
  errorCategoryResponse,
} = categorySlice.actions;

export default categorySlice.reducer;
