import {BaseDto} from 'model/base/BaseDto';

export interface DistrictDto extends BaseDto {
  name: string;
  city_id: number;
  city_name: string;
}
