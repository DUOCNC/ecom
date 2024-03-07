export interface DiscountSubDto {
  id: number | null;
  rate: number;
  reason: string;
  source: string;
  orderId: number | null;
  promotionId: number | null;
  discountCode: string | null;
  amount: number;
  value: number;
}
