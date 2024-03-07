import {OrderEntity} from '../entities';

export interface CreateCustomerRequest {
  createdName: string;
  createdBy: string;
  updatedName: string;
  updatedBy: string;
  operatorKcId: string;
  requestId: string;
  code: string;
  fullName: string;
  cardNumber: string;
  phone: string;
  identityNumber: string;
  email: string;
  gender: string;
  birthday: string;
  website: string;
  weddingDate: string;
  company: string;
  taxCode: string;
  countryId: number;
  districtId: number | string;
  district: string;
  wardId: number | string;
  ward: string;
  fullAddress: string;
  customerTypeId: number;
  customerGroupId: number;
  responsibleStaffCode: string;
  description: string;
  status: string;
  version: string;
  cityId: number | string;
  // billingAddresses: [];
  // shippingAddresses: [];
  contacts: Array<ContactCustomer>;
  // notes: [];
  // familyInfo: [];
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactNote: string;
  country: string;
  city: string;
  responsibleStaff: string;
  regionCode: string;
}

export interface ContactCustomer {
  name: string;
  phone: string;
  note: string;
  email: string;
}

export interface YoScanOrder {
  title: string;
  key: string;
  data: OrderEntity;
  activeTab?: number;
}
