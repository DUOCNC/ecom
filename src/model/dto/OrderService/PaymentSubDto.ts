export interface PaymentSubDto {
  id: number;
  fulfillmentId: number | null;
  paymentMethodId: number;
  paymentMethodCode: string;
  paymentMethod: string;
  amount: number;
  paidAmount: number;
  returnAmount: number;
  status: string;
  expiredAt: string | null;
  shortLink: string | null;
  payUrl: string | null;
  refTransactionCode: string | null;
  bankName: string | null;
  bankCode: string | null;
  bankAccountHolder: string | null;
  bankAccountNumber: string | null;
  bankAccountId: number | null;
  point: number | null;
  note: string;
  invoiceId: string | null;
  type: string | null;
  customerId: number | null;
}
