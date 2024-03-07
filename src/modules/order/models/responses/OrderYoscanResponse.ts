import {BaseAuditResponse} from 'common';
import {LineItemTypeLowercase} from 'modules/order/enums/Promotion';
import {StatusYoscanOrderEnum} from 'modules/order/enums/Yoscan';

export interface OrderYoscanResponse extends BaseAuditResponse {
  id: number;
  code: string;
  storeId: number;
  store: string;
  status: StatusYoscanOrderEnum;
  order: OrderYoscan;
  total: number;
  totalDiscount: number;
}

export interface OrderYoscan {
  customerId: number;
  items: ItemYoscan[];
  discounts: any[];
  note: string;
  customerNote: null | string;
  point: number;
  customer: CustomerYoscan;
}

export interface DiscountItemYoscan {
  rate: number;
  value: number;
  amount: number;
  promotionId: number;
  reason: string;
  discountCode: string;
  type: string;
  promotionTitle: string;
  taxable: boolean;
}

export interface ItemYoscan {
  sku: string;
  variantId: number;
  variant: string;
  productId: number;
  product: string;
  variantBarcode: string;
  productType: string;
  quantity: number;
  price: number;
  amount: number;
  discountAmount: number;
  lineAmountAfterLineDiscount: number;
  discountItems: DiscountItemYoscan[];
  note: null | string;
  type: LineItemTypeLowercase;
  position: number;
  variantImage: string;
}

export interface CustomerYoscan {
  id: number;
  customer: string;
  phone: string;
  district: string;
  districtId: number;
  ward: string;
  wardId: number;
  fullAddress: string;
}
