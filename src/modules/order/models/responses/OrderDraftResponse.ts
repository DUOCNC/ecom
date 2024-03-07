import {BaseAuditResponse} from 'common';
import {OrderPrintConfigResponse} from './OrderPrintConfigResponse';

export interface OrderDraftResponse extends BaseAuditResponse {
  id: number;
  code: string;
  storeId: number;
  store: string;
  status: string;
  order: {
    customerId: number;
    items: ItemOrderDraftResponse[];
    discounts: Array<DiscountItem>;
    note: string;
    customerNote: string;
  };
}

export interface ItemOrderDraftResponse {
  sku: string;
  variantId: number;
  variant: string;
  productId: number;
  product: string;
  variantBarcode: string;
  productType: string;
  quantity: number;
  discountItems: DiscountItem[];
  note: string;
  type: string;
  position: number;
}
export interface DiscountItem {
  rate: number;
  value: number;
  amount: number;
  promotionId: number;
  reason: string;
  discountCode: string;
}
