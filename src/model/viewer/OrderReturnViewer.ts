import {LineItemViewer} from './LineItemViewer';
import {PaymentViewer} from './PaymentViewer';

export interface OrderReturnViewer {
  order_id: number;
  order_code: string;
  total: string;
  source: string;
  channel: string;
  reason: string;
  refund_date: string;
  store: string;
  return_status: boolean;
  return_status_name: string;
  note: string;
  store_phone: string;
  store_full_address: string;
  quantity: string;
  items: Array<LineItemViewer>;
  point_refund: string;
  amount: string;
  bgPayment: string;
  borderPayment: string;
  txtPayment: string;
  payment: string;
  payments: Array<PaymentViewer>;
}
