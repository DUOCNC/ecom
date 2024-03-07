import {
  EntitledMethod,
  LineItemType,
  SalesChannelName,
} from 'modules/order/enums/Promotion';

export interface GiftProgramResponse {
  orderId: number | null;
  customerId: number | null;
  storeId: number;
  salesChannelName: SalesChannelName;
  orderSourceId: number;
  lineItems: Array<GiftProgramLineItemResponse>;
  originalSubtotalPrice: null;
  total: null;
  suggestedDiscounts: null;
}
export interface GiftProgramLineItemResponse {
  originalUnitPrice: number;
  productId: number;
  quantity: number;
  sku: string;
  variantId: number;
  type: LineItemType;
  valid: boolean;
  priceRuleId: number | null;
  suggestedDiscounts: Array<GiftProgramSuggestDiscountResponse>;
  originalTotal: null;
  lineAmountAfterLineDiscount: number;
}

export interface GiftProgramSuggestDiscountResponse {
  id: number;
  title: string;
  entitledMethod: EntitledMethod;
  value: null;
  valueType: null;
}
