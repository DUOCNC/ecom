import {WardResponse} from '../responses';

export interface WardDetailStorage {
  districtId: number;
  data: Array<WardResponse>;
  expire: number;
}

export interface WardStorage {
  wards: Array<WardDetailStorage>;
}
