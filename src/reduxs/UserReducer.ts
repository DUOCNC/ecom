import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AccountResponse} from 'model/responses/AccountResponse';
import {RootState} from 'reduxs/MainStore';
import LocalStorageUtils from 'utils/LocalStorageUtils';

export interface RdUser {
  isLoading: boolean;
  isAuthentication: boolean;
  user: AccountResponse | null;
  isLoadDetail: boolean;
}

const initialState: RdUser = {
  isLoading: true,
  isLoadDetail: false,
  isAuthentication: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    firstLoadUserFail: state => {
      state.isAuthentication = false;
      state.isLoading = false;
    },
    firstLoadUserSuccess: state => {
      state.isAuthentication = true;
    },
    logout: state => {
      LocalStorageUtils.removeToken();
      state.isLoading = false;
      state.isAuthentication = false;
      state.user = null;
      state.isLoadDetail = false;
    },
    loginSuccess: state => {
      state.isAuthentication = true;
      state.isLoadDetail = false;
    },
    saveUser: (state, action: PayloadAction<AccountResponse>) => {
      state.isLoading = false;
      state.isLoadDetail = true;
      state.user = action.payload;
      state.isAuthentication = true;
    },
    updateUser: (state, action: PayloadAction<AccountResponse>) => {
      state.user = action.payload;
    },
  },
});
export const {logout, saveUser, firstLoadUserFail, loginSuccess, updateUser} =
  userSlice.actions;

export const selectNetwork = (state: RootState) => state.network;

export default userSlice.reducer;
