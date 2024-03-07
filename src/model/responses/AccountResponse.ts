import {BaseAuditResponse} from 'common';
import {AccountJobResponse} from './AccountJobResponse';
import {AccountStoreResponse} from './AccountStoreResponse';
import {PermissionResponse} from './PermissionResponse';

export interface AccountResponse extends BaseAuditResponse {
  id: number;
  code: string;
  countryId: number | null;
  country: string | null;
  cityId: number | null;
  city: string | null;
  wardId: number | null;
  ward: string | null;
  districtId: number | null;
  district: string | null;
  address: string | null;
  birthday: string | null;
  phone: string;
  isEmployee: boolean | null;
  roleId: number;
  role: string;
  roleName: string;
  status: string;
  temporaryPassword: boolean;
  userId: string;
  userName: string;
  fullName: string;
  gender: string;
  accountStores: Array<AccountStoreResponse>;
  accountJobs: Array<AccountJobResponse>;
  permissions: PermissionResponse;
  authorities: Array<string>;
  departmentId: number | null;
  departmentName: string;
}
