import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiReducer} from 'common';
import {AccountResponse} from 'model';

const initialState: ApiReducer<AccountResponse> = {
  isLoad: false,
  data: null,
  error: false,
  loading: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    loadingProfile: state => {
      state.loading = true;
      state.error = false;
    },
    saveProfile: (state, action: PayloadAction<AccountResponse>) => {
      state.isLoad = true;
      state.loading = false;
      state.data = action.payload;
    },
    clearProfile: state => {
      state.data = initialState.data;
      state.error = initialState.error;
      state.isLoad = initialState.isLoad;
      state.loading = initialState.loading;
    },
  },
});
export const {loadingProfile, saveProfile, clearProfile} = profileSlice.actions;

export default profileSlice.reducer;
