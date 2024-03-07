import {BaseDto} from 'model/base/BaseDto';

export interface BillingAddressSubDto extends BaseDto {
  city: string | null;
  cityId: number | null;
  country: string | null;
  countryId: number | null;
  default: boolean;
  district: string | null;
  districtId: number | null;
  email: string | null;
  fullAddress: string;
  name: string;
  phone: string;
  taxCode: string | null;
  ward: string | null;
  wardId: number | null;
  zipCode: string | null;
}
