import {CityResponse} from '../responses';

export interface CityDetailStorage {
  countryId: number;
  data: Array<CityResponse>;
  expire: number;
}

export interface CityStorage {
  cities: Array<CityDetailStorage>;
}
