import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NetworkReducer} from 'model';

const initialState: NetworkReducer = {
  isConnected: false,
  type: null,
};

export const networkSlice = createSlice({
  name: 'network',
  initialState: initialState,
  reducers: {
    connectionConnected: (state, action: PayloadAction<string>) => {
      state.isConnected = true;
      state.type = action.payload;
    },
    connectionDisconnected: state => {
      state.isConnected = false;
    },
  },
});

export const {connectionConnected, connectionDisconnected} =
  networkSlice.actions;

export default networkSlice.reducer;
