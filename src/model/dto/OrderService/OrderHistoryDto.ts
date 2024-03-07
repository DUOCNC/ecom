export interface OrderHistoryDto {
  orderId: number | null;
  id: number;
  status: string;
  customer: string;
  customerEmail: string | null;
  customerId: number;
  customerNote: string;
  customerPhoneNumber: string;
  subStatusCode: string;
  code: string;
  total: number;
  actualQuantity: number;
  store: string;
  createdDate: string;
  assignee: string;
  assigneeCode: string;
}
