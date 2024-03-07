import {DistrictResponse} from '../responses';

export interface CityDistrictDetailStorage {
  countryId: number;
  data: Array<DistrictResponse>;
  expire: number;
}

export interface CityDistrictStorage {
  cityDistricts: Array<CityDistrictDetailStorage>;
}
