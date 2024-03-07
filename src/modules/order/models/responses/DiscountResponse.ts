import {BaseAuditResponse} from 'common';
import {EntitledMethodEnum} from 'modules/order/enums/Promotion';

export interface SuggestedDiscountResponse {
  priceRuleId: number;
  title: string;
  valueType: string;
  value: number;
  allocationLimit: number;
  allocationCount: number;
  isRegistered: boolean;
  taxable: boolean;
  endsDate: Date;
  code: string;
  invalid: boolean;
  invalidDescription: string;
  entitledMethod: EntitledMethodEnum;
  otpEnabled: boolean;
  manual: boolean;
}

export interface DiscountItemResponse {
  keyword: string;
  searchType: string;
  originalUnitPrice: number;
  productId: number;
  quantity: number;
  sku: string;
  variantId: number;
  taxable: boolean;
  type: string;
  suggestedDiscounts: Array<SuggestedDiscountResponse>;
  appliedDiscount: SuggestedDiscountResponse;
}

export interface DiscountResponse extends BaseAuditResponse {
  orderId: number;
  customerId: number;
  storeId: number;
  salesChannelName: string;
  lineItems: Array<DiscountItemResponse>;
  keyword: string;
  searchType: string;
  appliedDiscount: SuggestedDiscountResponse;
  suggestedDiscounts: Array<SuggestedDiscountResponse>;
}
