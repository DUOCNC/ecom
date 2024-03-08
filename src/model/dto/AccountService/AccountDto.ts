import {BaseDto} from 'model/base/BaseDto';

export interface AccountStoreSubDto {
  id: number;
  account_id: number;
  store_id: number;
  store: string;
}

export interface AccountJobSubDto {
  id: number;
  account_id: number;
  department_id: number;
  department: string | null;
  position: string;
  position_id: number | null;
}

export interface PermissionDto {
  modules: Array<{
    permissions: Array<{module_code: string; code: string}>;
  }>;
}

export interface AccountDto extends BaseDto {
  country_id: number | null;
  country: string | null;
  city_id: number | null;
  city: string | null;
  ward_id: number | null;
  ward: string | null;
  district_id: number | null;
  district: string | null;
  address: string | null;
  birthday: string | null;
  phone: string;
  is_employee: boolean | null;
  role_id: number;
  role: string;
  role_name: string;
  status: string;
  temporary_password: boolean;
  user_id: string;
  full_name: string;
  gender: string;
  account_stores: Array<AccountStoreSubDto>;
  account_jobs: Array<AccountJobSubDto>;
  permissions: PermissionDto | null;
  account_permission: Array<string> | null;
}

export interface AccountModulesDto {
  permissions: Array<{module_code: string; code: string}>;
}

export interface AccountPermissionDto {
  module_code: string;
  code: string;
}

export interface AccountReasonDeleteDto extends BaseDto {
  reason: string;
  reason_id: number;
}
