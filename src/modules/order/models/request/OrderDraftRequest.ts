import {EntitledMethodEnum} from 'modules/order/enums/Promotion';
import OrderLineEntity from '../entities/OrderLineEntity';

export interface OrderDraftRequest {
  storeId: number;
  store: string;
  order?: OrderYoscan;
}

export interface ExpiredDraftRequest {
  barcode: string;
}

export interface OrderYoscan {
  customerId: number;
  items: Array<OrderItem>;
}

export interface OrderItem {
  note: string;
  discountRate: any;
  showNote: boolean;
  available: number;
  discountAmount: number;
  type: string;
  lineAmountAfterLineDiscount: number;
  price: number;
  variant: string;
  variantBarcode: string;
  discountType: string;
  variantId: number;
  id: number | null;
  sku: string;
  productType: string;
  gifts: Array<OrderLineEntity>;
  discountItems: Array<DiscountItem>;
  product: string | null;
  amount: number;
  committed: number;
  quantity: number;
  productId: number;
  onHold: number;
  taxable: boolean;
  weight: null;
  variantImage: string;
  taxRate: number;
  unit: string;
  productCode: string;
  onHand: number;
  taxInclude: boolean;
  position: number;
  discountValue: number | null;
  weightUnit: null;
}

export interface DiscountItem {
  reason: string;
  amount: number;
  promotionTitle?: string;
  discountCode: string | null;
  taxable?: boolean;
  rate: any;
  orderId: null;
  source: string;
  type?: string;
  value: number | null;
  promotionId?: number;
  otpEnabled?: boolean;
  entitledMethod?: EntitledMethodEnum;
}
