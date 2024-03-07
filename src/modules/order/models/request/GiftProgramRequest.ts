import {LineItemType, SalesChannelName} from 'modules/order/enums/Promotion';

export interface GiftProgramRequest {
  customerId: number | null;
  lineItems: Array<GiftProgramItemRequest>;
  orderId: number | null;
  orderSourceId: number;
  salesChannelName: SalesChannelName;
  storeId: number | null;
}

export interface GiftProgramItemRequest {
  originalUnitPrice: number;
  productId: number;
  quantity: number;
  sku: string;
  variantId: number;
  type: LineItemType;
  priceRuleId: number | null;
  lineAmountAfterLineDiscount: number;
}
