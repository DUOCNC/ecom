import {EnumValuePricePromotion} from 'modules/order/enums/Promotion';

export interface PromotionRequest {
  variantId?: number;
  productId?: number;
  coupon?: string;
  query?: string;
  states?: string;
  startsDateMin?: Date;
  startsDateMax?: Date;
  endsDateMin?: Date;
  endsDateMax?: Date;
  disabled?: boolean;
  page?: number;
  limit?: number;
  sortType?: string;
  sortColumn?: string;
  type: string;
}

export interface AppliedDiscountRequest {
  code: string;
}

export interface DiscountItemRequest {
  keyword?: string | null;
  searchType?: EnumValuePricePromotion | null;
  originalUnitPrice?: number;
  productId?: number;
  quantity?: number;
  sku?: string;
  variantId?: number;
  appliedDiscount?: AppliedDiscountRequest | null;
}

export interface DiscountRequest {
  orderId: number | null;
  customerId?: number | null;
  storeId?: number | null;
  salesChannelName: string;
  lineItems: Array<DiscountItemRequest>;
  keyword?: string | null;
  searchType?: EnumValuePricePromotion;
  appliedDiscount?: AppliedDiscountRequest | null;
  orderSourceId?: number;
  customerLevelId?: number | null;
}
