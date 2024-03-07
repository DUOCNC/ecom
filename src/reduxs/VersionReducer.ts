import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PayloadVersion, VersionReducer} from 'model';

const initialState: VersionReducer = {
  isLoad: false,
  current: null,
  next: null,
};

export const versionSlice = createSlice({
  name: 'version',
  initialState: initialState,
  reducers: {
    saveVersion: (state, action: PayloadAction<PayloadVersion>) => {
      state.isLoad = true;
      state.current = action.payload.current;
      state.next = action.payload.next;
    },
  },
});

export const {saveVersion} = versionSlice.actions;

export default versionSlice.reducer;
