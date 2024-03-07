export interface DiscountItemSubDto {
  id: number | null;
  amount: number;
  order_line_id: number | null;
  rate: number;
  reason: string;
  source: string;
  promotion_id: number | null;
  discount_code: string | null;
  value: number;
}
