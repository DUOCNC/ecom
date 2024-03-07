import {BaseDto} from 'model/base/BaseDto';
import {BillingAddressSubDto} from './BillingAddressSubDto';
import {DiscountReasonDto} from './DiscountReasonSubDto';
import {DiscountSubDto} from './DiscountSubDto';
import {LineItemSubDto} from './LineItemSubDto';
import {PaymentSubDto} from './PaymentSubDto';
import {ShippingAddressSubDto} from './ShippingAddressSubDto';
import {
  DiscountType,
  OrderDiscountSearchSubDto,
  OrderShipmentSearchDto,
} from './OrderSearchDto';

export interface OrderFulfillmentDetailSubDto {
  id: number | null;
  amount: number;
  discountAmount: number;
  discountRate: number;
  discountType: DiscountType;
  discountValue: number;
  discountItems: Array<OrderDiscountSearchSubDto>;
  lineAmountAfterLineDiscount: number;
  note: string;
  price: number;
  product: string;
  productCode: string;
  productId: number;
  productType: string;
  quantity: number;
  sku: string;
  taxInclude: boolean;
  taxRate: number;
  type: string;
  unit: string;
  variant: string;
  variantBarcode: string;
  variantId: number;
  variantImage: string;
  weight: number;
  weightUnit: string;
  available: number;
  shipment: OrderShipmentSearchDto;
  code: string;
}

export interface OrderReturnOrigin {
  orderCode: string;
  orderId: number;
}

export interface OrderReturnSubDto extends BaseDto {}

export interface OrderDto extends BaseDto {
  orderReturnOrigin: OrderReturnOrigin | null;
  account: string;
  accountCode: string;
  accumulatePoint: number | null;
  actualQuantity: number;
  assignee: string | null;
  assigneeCode: string | null;
  atomicMigration: boolean;
  automaticDiscount: boolean;
  billingAddress: BillingAddressSubDto;
  campaignId: number;
  cancelAccountCode: string | null;
  cancelledOn: string | null;
  channel: string;
  channelCode: string;
  channelId: number;
  company: string;
  companyId: number;
  coordinator: string | null;
  coordinatorCode: string | null;
  createdOn: string;
  currency: string;
  customer: string;
  customerEmail: string | null;
  customerId: number;
  customerNote: string;
  customerPhoneNumber: string;
  discountReason: DiscountReasonDto;
  discounts: Array<DiscountSubDto>;
  ecommerceOpId: number | null;
  ecommerceShopName: number | null;
  expectedDeliveryProviderId: number | null;
  expectedDeliveryType: string | null;
  expectedPaymentMethodId: number | null;
  exportBill: boolean;
  finalizedAccountCode: number | null;
  finalizedOn: string;
  finishAccountCode: string | null;
  finishedOn: string | null;
  fulfillmentStatus: string | null;
  fulfillments: Array<OrderFulfillmentDetailSubDto>;
  items: Array<LineItemSubDto>;
  storeId: number;
  storeFullAddress: string;
  storeCode: string;
  store: string;
  storePhoneNumber: string;
  subStatusId: number;
  subStatusCode: string;
  subStatus: string;
  subReasonName: string | null;
  subReasonId: number | null;
  sourceId: number;
  source: string;
  sourceCode: string;
  stauts: string;
  paymentStatus: string;
  tags: string;
  taxTreatment: string;
  total: number;
  totalDiscount: number;
  totalLineAmountAfterLineDiscount: number;
  totalTax: number | null;
  url: string | null;
  note: string;
  utmTracking: string;
  payments: Array<PaymentSubDto>;
  point: number;
  orderReturns: Array<OrderReturnSubDto>;
  shippingAddress: ShippingAddressSubDto;
  shippingFeeInformedToCustomer: number | null;
  financialStoreName: string;
  specialOrder: SpecialOrderDto;
}

export interface OrderSubStatusDto extends BaseDto {
  version: number;
  companyId: number;
  company: string;
  status: string;
  note: null;
  displayOrder: number;
  isActive: boolean;
  isDelete: boolean;
  isDefault: boolean;
  default: boolean;
  active: boolean;
  delete: boolean;
  subStatus: string;
}

export interface SpecialOrderDto {
  id: number;
  code: string;
  version: number;
  createdBy: string;
  createdName: string;
  createdDate: string;
  updatedBy: string;
  updatedName: string;
  updatedDate: string;
  isDeleted: boolean;
  type: string;
  orderCarerCode: string;
  orderCarerName: string;
  orderOriginalCode: string;
  orderReturnCode: string | null;
  variantSkus: string[] | null;
  amount: number | null;
  reason: string | null;
  ecommerce: string | null;
  specialLines: any[]; // Thay any bằng kiểu dữ liệu phù hợp cho mảng specialLines
  deleted: boolean;
}
