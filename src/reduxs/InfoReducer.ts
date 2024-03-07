import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppInfo, InfoReducer} from 'model';

const initialState: InfoReducer = {
  isLoad: false,
  info: null,
};

export const infoSlice = createSlice({
  name: 'info',
  initialState: initialState,
  reducers: {
    saveInfo: (state, action: PayloadAction<AppInfo>) => {
      state.isLoad = true;
      state.info = action.payload;
    },
    skipOnboard: state => {
      if (state.info == null) {
        return;
      }
      state.info.firstLoad = false;
    },
  },
});
export const {saveInfo, skipOnboard} = infoSlice.actions;

export default infoSlice.reducer;
