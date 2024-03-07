import {BaseDto} from 'model/base/BaseDto';

export interface CustomerDto extends BaseDto {
  assignedDate: Date;
  assignedStore: string | null;
  assignedStoreId: number | null;
  averageOrderAmount: number | null;
  birthday: Date | null;
  birthdayCompare: number | null;
  birthdayDayAndMonthCompare: number | null;
  birthdayDayAndYearCompare: number | null;
  birthdayMonthAndYearCompare: number | null;
  cardNumber: string | null;
  channelIds: Array<number> | null;
  city: string | null;
  cityId: number | null;
  company: string | null;
  customerGroup: string | null;
  customerGroupId: string | null;
  customerLevel: string | null;
  customerLevelId: number | null;
  customerType: string | null;
  customerTypeId: string | null;
  dayOfBirth: number | null;
  district: string | null;
  districtId: string | null;
  email: string | null;
  firstOrderTime: Date;
  firstOrderTimeOffline: Date;
  firstOrderTimeOnline: Date;
  firstOrderType: string | null;
  fullAddress: string | null;
  fullName: string | null;
  gender: string | null;
  identityNumber: string | null;
  lastOrderTime: Date | null;
  lastOrderTimeOffline: Date | null;
  lastOrderTimeOnline: Date | null;
  lastOrderType: Date | null;
  monthOfBirth: number | null;
  phone: string;
  point: number | null;
  responsibleStaff: string | null;
  responsibleStaffCode: string | null;
  sourceIdOfFirstOrderOnline: number | null;
  sourceIdOfLastOrderOnline: number | null;
  sourceIds: Array<number>;
  sourceOfFirstOrderOnline: string | null;
  sourceOfLastOrderOnline: string | null;
  storeIdOfFirstOrderOffline: number | null;
  storeIdOfLastOrderOffline: number | null;
  storeIds: Array<number>;
  storeOfFirstOrderOffline: string | null;
  storeOfLastOrderOffline: string | null;
  totalFinishedOrder: number | null;
  totalPaidAmount: number | null;
  totalRefundedAmount: number | null;
  totalReturnedOrder: number | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmId: number | null;
  utmMedium: string | null;
  utmSource: string | null;
  utmTerm: string | null;
  ward: string | null;
  wardId: number | null;
  website: string | null;
  weddingDate: Date | null;
  yearOfBirth: number | null;
}