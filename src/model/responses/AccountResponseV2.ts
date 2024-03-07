import {BaseAuditResponse} from 'common';
import {PermissionResponse} from './PermissionResponse';

export interface GrantedLocation {
  locationSelection: string;
  locationIds: Array<number>;
}

export interface AccountResponseV2 extends BaseAuditResponse {
  id: number;
  login: string;
  address1: string | null;
  activated: boolean;
  authorities: Array<string>;
  birthday: string | null;
  city: string | null;
  country: string | null;
  departmentId: number | null;
  departmentName: string | null;
  displayName: string;
  district: string | null;
  email: string | null;
  gender: string;
  grantedLocation: GrantedLocation;
  imageUrl: string | null;
  langKey: string | null;
  lastName: string;
  phone: string;
  positionId: number | null;
  positionTitle: string | null;
  permissions: PermissionResponse;
}
