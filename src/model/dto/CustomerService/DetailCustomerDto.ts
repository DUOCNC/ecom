import {BaseDto} from 'model/base/BaseDto';
import {BillingAddressSubDto} from '../OrderService/BillingAddressSubDto';

export interface ShippingAddressSubDto extends BaseDto {
  city: string | null;
  city_id: number | null;
  country: string | null;
  country_id: number | null;
  default: boolean;
  district: string | null;
  district_id: number | null;
  email: string | null;
  full_address: string;
  name: string;
  phone: string;
  tax_code: string | null;
  ward: string | null;
  ward_id: number | null;
  zip_code: string | null;
}

export interface ContactSubDto extends BaseDto {
  name: string | null;
  note: string | null;
  title: string | null;
}

export interface NoteSubDto extends BaseDto {
  content: string;
}

export interface ReportSubDto extends BaseDto {
  averageOrderValue: number | null;
  channelIds: string | null;
  firstOrderPlace: string | null;
  firstOrderTime: string | null;
  storeIds: string | null;
  lastOrderType: string | null;
  lastOrderTime: string | null;
  numberOfDaysWithoutPurchase: number | null;
  remainAmountToLevelUp: number | null;
  sourceIdOfFirstOrderOnline: number | null;
  sourceIdOfLastOrderOnline: number | null;
  sourceIds: string | null;
  sourceOfFirstOrderOnline: string | null;
  sourceOfLastOrderOnline: string | null;
  storeIdOfFirstOrderOffline: number | null;
  storeIdOfLastOrderOffline: number | null;
  storeOfFirstOrderOffline: string | null;
  storeOfLastOrderOffline: string | null;
  totalFinishedOrder: number;
  totalPaidAmount: number;
  totalRefundedAmount: number;
  totalReturnedOrder: number;
}

export interface DetailCustomerDto extends BaseDto {
  assignedString: string | null;
  assignedStore: string | null;
  assignedStoreId: number | null;
  billingAddresses: Array<BillingAddressSubDto>;
  birthday: string | null;
  cardNumber: string | null;
  channel: string | null;
  channelCode: string | null;
  channelId: number | null;
  city: string | null;
  cityId: number | null;
  company: string | null;
  companyId: string | null;
  contacts: Array<ContactSubDto>;
  country: string | null;
  countryId: number | null;
  customerGroup: string | null;
  customerGroupId: number | null;
  customerLevel: string | null;
  customerLevelId: number | null;
  customerType: string | null;
  customerTypeId: number | null;
  description: string | null;
  district: string | null;
  districtId: number | null;
  email: string | null;
  fullAddress: string | null;
  fullName: string;
  gender: string | null;
  identityNumber: string | null;
  notes: Array<NoteSubDto>;
  phone: string;
  point: number | null;
  report: ReportSubDto;
  responsibleStaff: string | null;
  responsibleStaffCode: string | null;
  shippingAddresses: Array<ShippingAddressSubDto>;
  source: string | null;
  sourceCode: string | null;
  sourceId: number | null;
  status: string;
  tags: string | null;
  taxCode: string | null;
  utm: string | null;
  ward: string | null;
  wardId: number | null;
  website: string | null;
  weddingString: string | null;
  zipCode: string | null;
  weddingDate: Date | null;
}
