import {CountryResponse} from '../responses';

export interface CountryStorage {
  expire: number;
  countries: Array<CountryResponse>;
}
