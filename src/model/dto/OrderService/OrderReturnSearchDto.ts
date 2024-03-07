import {BaseDto} from 'model/base/BaseDto';

export interface OrderDiscountSearchSubDto {
  amount: number;
  discountCode: string | null;
  promotionId: number | null;
  rate: number;
  reason: string | null;
  source: string | null;
  value: number;
}

export interface ReturnReasonSearchSubDto {
  id: number;
  code: string;
  name: string;
}

export interface OrderReturnLineItemSubDto {}

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

export interface OrderReturnSearchDto extends BaseDto {
  account: string | null;
  accountCode: string | null;
  codeOrder: string;
  codeOrderReturn: string;
  actualQuantity: number;
  assignee: string | null;
  assigneeCode: string | null;
  coordinator: string | null;
  coordinatorCode: string | null;
  customerName: string;
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
  referenceCode: string;
  received: boolean;
  reason: string | null;
  reasonId: number | null;
  payments: Array<PaymentSearchSubDto>;
  paymentStatus: string;
  packedStatus: string | null;
  otherReason: string | null;
  returningStore: string | null;
  returningStoreId: number | null;
  orderReturns: Array<any>;
  orderDiscountValue: number | null;
  orderDiscountRate: number | null;
  note: string | null;
  marketer: string | null;
  marketerCode: string | null;
  lastCoordinatorConfirmOn: string;
  sourceId: number;
  sourceCode: string;
  source: string;
  status: string;
  store: string;
  storeCode: string;
  items: Array<OrderReturnLineItemSubDto>;
  storeFullAddress: string | null;
  storeId: number;
  subReason: string | null;
  total: number;
  totalAmount: number | null;
  totalDiscount: number;
  totalLineAmountAfterLineDiscount: number;
  totalPay: number | null;
  totalQuantity: number;
  returnReason: Array<ReturnReasonSearchSubDto>;
}
