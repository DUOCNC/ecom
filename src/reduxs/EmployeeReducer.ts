import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {EmployeeReducer} from 'model/reducer/EmployeeReducer';
import {EmployeeResponse} from 'model/responses/EmployeeResponse';

const initialState: EmployeeReducer = {
  data: null,
  loading: false,
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialState,
  reducers: {
    loadingEmployee: state => {
      state.loading = !state.loading;
    },
    saveEmployee: (state, action: PayloadAction<EmployeeResponse>) => {
      state.data = action.payload;
    },
    clearEmployee: state => {
      state.data = initialState.data;
      state.loading = false;
    },
  },
});

export const {saveEmployee, loadingEmployee, clearEmployee} =
  employeeSlice.actions;
export default employeeSlice.reducer;
