import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CountryReducer, CountryResponse} from 'model';

const initialState: CountryReducer = {
  isLoad: false,
  countries: [],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: initialState,
  reducers: {
    saveCountries: (state, action: PayloadAction<Array<CountryResponse>>) => {
      state.isLoad = true;
      state.countries = action.payload;
    },
  },
});

export const {saveCountries} = countriesSlice.actions;

export default countriesSlice.reducer;
