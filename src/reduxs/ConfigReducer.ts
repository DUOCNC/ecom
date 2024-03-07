import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ConfigReducer, MobileConfigResponse} from 'model';

const initialState: ConfigReducer = {
  config: {
    hideFeatureFunction: false,
    currentRouteName: '',
  },
};

export const configSlice = createSlice({
  name: 'configs',
  initialState: initialState,
  reducers: {
    saveConfig: (
      state: ConfigReducer,
      action: PayloadAction<MobileConfigResponse>,
    ) => {
      state.config = {...state.config, ...action.payload};
    },
  },
});
export const {saveConfig} = configSlice.actions;

export default configSlice.reducer;
