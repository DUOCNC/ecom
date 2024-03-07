export interface CustomerDiscountResponse {
  customerId: number;
  code: string;
  valueType: string;
  value: number;
  entitledMethod: string;
  asyncUsageCount: number;
  usageLimit: number;
  disabled: boolean;
  createdDate: string;
  expiredDate: string;
  title: string;
  orderCode: string | null;
  remainingCount: number;
}
