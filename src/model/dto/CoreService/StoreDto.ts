import {BaseDto} from 'model/base/BaseDto';

export interface StoreDto extends BaseDto {
  name: string;
  rank: number;
  rank_name: string;
  square: number;
  address: string;
  hotline: string;
  vm_code: string | null;
  vm: string | null;
  mail: string | null;
  begin_date: string | Date;
  department_id: number | null;
  department: string | null;
  department_h3_id: number | null;
  department_h3: string | null;
  department_h4_id: number | null;
  department_h4: string | null;
  status: string;
  zip_code: string | null;
  country_id: number | null;
  country_name: string | null;
  city_id: number | null;
  city_name: string | null;
  district_id: number | null;
  district_name: string | null;
  ward_id: number | null;
  ward_name: string | null;
  latitude: number | null;
  longitude: number | null;
  is_saleable: boolean;
  is_stocktaking: boolean;
  type: string;
  reference_id: number | null;
  status_name: string;
  type_name: string;
}

export interface StoreDistanceDto extends StoreDto {
  m: number;
  km: number;
}
