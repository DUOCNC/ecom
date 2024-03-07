import {createSlice} from '@reduxjs/toolkit';
import {ThemeType} from 'config/ThemeConfig';

export interface RdTheme {
  type: ThemeType;
}

const initialState: RdTheme = {
  type: ThemeType.LIGHT,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {},
});

export const {} = themeSlice.actions;

export default themeSlice.reducer;
