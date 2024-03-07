import {BaseDto} from 'model/base/BaseDto';

export interface BillingAddressSearchSubDto {}

export interface ShippingAddressSearchSubDto {}
export type DiscountType = 'percent' | 'money';

export interface OrderSenderAddressSearch {
  id: number;
  code: string;
  name: string;
  rank: null | any;
  rankName: null | any;
  square: number;
  countryId: number;
  countryName: string;
  cityId: number;
  cityName: string;
  status: string;
  statusName: null | any;
  zipCode: null | any;
  districtId: number;
  districtName: string;
  wardId: number;
  wardName: string;
  address: string;
  hotline: string;
  managerCode: null | any;
  vmCode: null | any;
  finderCode: null | any;
  mail: null | any;
  numberOfAccount: null | any;
  referenceId: number;
  type: string;
}
export interface OrderShipmentSearchDto {
  id: number;
  deliveryServiceProviderId: number;
  deliveryServiceProviderCode: string;
  deliveryServiceProviderName: string;
  deliveryTransportType: string;
  deliveryServiceProviderType: string;
  handoverId: null | any;
  service: string;
  whoPaid: null | any;
  feeType: string;
  feeBaseOn: string;
  deliveryFee: null | any;
  referenceStatus: string;
  referenceStatusExplanation: string;
  cancelReason: string;
  trackingCode: string;
  trackingUrl: string;
  receivedDate: null | any;
  expectedReceivedDate: null | any;
  deliveryServiceNote: null | any;
  shippingFeePaidToThreePls: number;
  shippingFeeInformedToCustomer: null | any;
  senderAddressId: number;
  senderAddress: OrderSenderAddressSearch;
  requirements: string;
  requirementsName: null | any;
  noteToShipper: string;
  cod: number;
  shipperCode: string;
  shipperName: string;
  shipperPhone: string;
  pushingNote: string;
  pushingStatus: string;
  shippingAddress: OrderShippingAddressSearch;
}
export interface OrderShippingAddressSearch {
  id: null | number;
  name: string;
  email: string;
  phone: string;
  secondPhone: null | any;
  country: null | any;
  cityId: number;
  city: string;
  districtId: number;
  district: string;
  wardId: number;
  ward: string;
  zipCode: null | any;
  fullAddress: string;
  channel: null | any;
}
export interface OrderFulfillmentLineItemSearchSubDto {
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
export interface OrderFulfillmentSearchDto {
  accountCode: string | null;
  assigneeCode: string | null;
  deliveryType: string;
  paymentStatus: string;
  shipment: any;
  stockLocationId: number;
  storeId: number;
  items: Array<OrderFulfillmentLineItemSearchSubDto>;
  total: number;
  totalDiscount: number;
  totalLineAmountAfterLineDiscount: number;
  totalQuantity: number;
  totalTax: number;
}
export interface OrderDiscountSearchSubDto {
  amount: number;
  discountCode: string | null;
  promotionId: number | null;
  rate: number;
  reason: string | null;
  source: string | null;
  value: number;
}

export interface PaymentSearchSubDto extends BaseDto {
  amount: number;
  bankAccount: string | null;
  paidAmount: number;
  paymentMethod: string;
  paymentMethodCode: string;
  paymentMethodId: number;
  point: number | null;
  refTransactionCode: string | null;
  reference: string | null;
  returnAmount: number | null;
  shortLink: string | null;
  source: string | null;
  status: string;
  type: string;
}

export interface OrderSearchDto extends BaseDto {
  account: string | null;
  accountCode: string | null;
  actualQuantity: number;
  assignee: string | null;
  assigneeCode: string | null;
  billingAddress: BillingAddressSearchSubDto;
  cancelledOn: string | null;
  channelId: number;
  company: string;
  companyCity: string | null;
  companyDistrict: string | null;
  coordinator: string | null;
  coordinatorCode: string | null;
  customer: string;
  customerAddress: string | null;
  customerBirthday: string | null;
  customerCity: string | null;
  customerCode: string | null;
  customerDistrict: string | null;
  customerEmail: string | null;
  customerId: number;
  customerNote: string | null;
  customerPhoneNumber: string;
  customerWard: string | null;
  discounts: Array<OrderDiscountSearchSubDto>;
  ecommerceShopId: number;
  ecommerceShopName: string;
  finalizedOn: string | null;
  returnStatus: string;
  referenceCode: string;
  receivedStatus: string | null;
  reason: string | null;
  payments: Array<PaymentSearchSubDto>;
  paymentStatus: string;
  packedStatus: string | null;
  otherReason: string | null;
  orderReturns: Array<any>;
  orderDiscountValue: number | null;
  orderDiscountRate: number | null;
  note: string | null;
  marketer: string | null;
  marketerCode: string | null;
  lastCoordinatorConfirmOn: string;
  shippingAddress: ShippingAddressSearchSubDto;
  shippingFeeInformedToCustomer: number | null;
  sourceId: number;
  sourceCode: string;
  source: string;
  status: string;
  store: string;
  storeCode: string;
  storeFullAddress: string | null;
  storeId: number;
  subReason: string | null;
  subStatusId: number;
  subStatusCode: string;
  subStatus: string;
  tags: Array<string> | null;
  total: number;
  totalDiscount: number;
  totalLineAmountAfterLineDiscount: number;
  totalPay: number | null;
  totalQuantity: number;
  totalWeight: number;
  fulfillments: Array<OrderFulfillmentLineItemSearchSubDto>;
}
