export interface StoreQuery {
  query?: string;
  status?: string;
  country_id?: number;
  city_id?: number;
  district_id?: number;
  ward_id?: number;
  saleable?: boolean;
  stocktaking?: boolean;
}
