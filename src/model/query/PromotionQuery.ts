export interface PromotionQuery {
  variant_id?: number;
  product_id?: number;
  coupon?: string;
  query?: string;
  states?: string;
  starts_date_min?: Date;
  starts_date_max?: Date;
  ends_date_min?: Date;
  ends_date_max?: Date;
  disabled?: boolean;
  page?: number;
  limit?: number;
  sort_type?: string;
  sort_coloumn?: string;
  type: string;
}
