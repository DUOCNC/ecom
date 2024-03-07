import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PayloadTask, TaskReducer} from 'model/reducer/TaskReducer';

const initialState: TaskReducer = {
  isLoad: false,
  task: null,
  taskEntity: null,
};

export const taskReducerSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    saveTask: (state, action: PayloadAction<PayloadTask>) => {
      state.isLoad = true;
      state.task = action.payload.task;
      state.taskEntity = action.payload.taskEntity;
    },
  },
});

export const {saveTask} = taskReducerSlice.actions;

export default taskReducerSlice.reducer;
