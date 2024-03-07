import {CountryResponse} from 'model/responses';

export interface CountryReducer {
  isLoad: boolean;
  countries: Array<CountryResponse>;
}
