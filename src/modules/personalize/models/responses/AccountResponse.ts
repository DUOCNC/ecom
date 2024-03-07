import AccountJobEntity from '../entities/AccountJobEntity';

export interface AccountResponse {
  accountJobs: Array<AccountJobEntity>;
  accountStores: Array<AccountStore>;
  activated: boolean;
  address: string;
  authorities: Array<string>;
  birthday: string;
  city: string;
  country: string;
  createdAt: string;
  createdBy: string;
  district: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  imageUrl: string;
  langKey: string;
  lastName: string;
  phone: string;
  updatedAt: string;
  updatedBy: string;
  login: string;
  positionId: number;
  positionTitle: string;
  departmentId: number;
  departmentName: string;
}

export interface AccountStore {
  storeId: number;
  store: string;
}
