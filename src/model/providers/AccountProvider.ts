import {PermissionEntity} from 'model/entities';
import {AccountResponse, AccountResponseV2} from 'model/responses';

export default class AccountProvider {
  id: number;
  code: string;
  fullName: string;
  locationIds: Array<number>;
  positionId: number;
  position: string;
  birthday: string | null;
  phone: string;
  address: string | null;
  city: string | null;
  district: string | null;
  gender: string | null;
  permissions: PermissionEntity | undefined;
  authorities: Array<string>;
  departmentId: number | null;
  departmentName: string | null;

  constructor(
    id: number,
    code: string,
    fullName: string,
    locationIds: Array<number>,
    positionId: number,
    position: string,
    birthday: string | null,
    phone: string,
    address: string | null,
    city: string | null,
    district: string | null,
    gender: string | null,
    permissions: PermissionEntity | undefined,
    authorities: Array<string>,
    departmentId: number | null,
    departmentName: string | null,
  ) {
    this.id = id;
    this.code = code;
    this.fullName = fullName;
    this.locationIds = locationIds;
    this.positionId = positionId;
    this.position = position;
    this.birthday = birthday;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.district = district;
    this.gender = gender;
    this.permissions = permissions;
    this.authorities = authorities;
    this.departmentId = departmentId;
    this.departmentName = departmentName;
  }

  static createV1(response: AccountResponse): AccountProvider {
    let locationIds = response.accountStores.map(store => store.storeId);
    let job = response.accountJobs.length > 0 ? response.accountJobs[0] : null;
    let positionId = job == null ? -1 : job.positionId;
    let position = 'Không có vị trí';
    if (job && job.position) {
      position = job.position;
    }
    return new AccountProvider(
      response.id,
      response.code,
      response.fullName,
      locationIds,
      positionId,
      position,
      response.birthday,
      response.phone,
      response.address,
      response.city,
      response.district,
      response.gender,
      new PermissionEntity(response.permissions),
      response.authorities,
      response.departmentId,
      response.departmentName,
    );
  }

  getPermissions() {
    this.permissions;
  }
  static createV2(account: AccountResponseV2): AccountProvider {
    let locationIds = account.grantedLocation.locationIds;
    let positionId = account.positionId == null ? -1 : account.positionId;
    let position =
      account.positionTitle == null ? 'Không có vị trí' : account.positionTitle;
    return new AccountProvider(
      account.id,
      account.login,
      account.displayName,
      locationIds,
      positionId,
      position,
      account.birthday,
      account.phone,
      account.address1,
      account.city,
      account.district,
      account.gender,
      undefined,
      account.authorities,
      account.departmentId,
      account.departmentName,
    );
  }

  getAuthorities() {
    return this.authorities;
  }

  checkPermissionByKey(key: string) {
    return this.authorities.findIndex(e => e === key) !== -1;
  }
}
