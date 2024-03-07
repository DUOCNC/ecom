export interface PromotionRequest {
  variantId?: number;
  productId?: number;
  coupon?: string;
  query?: string;
  states?: string;
  startsDateMin?: Date;
  startsDateMax?: Date;
  endsDateMin?: Date;
  endsDateMax?: Date;
  disabled?: boolean;
  page?: number;
  limit?: number;
  sortType?: string;
  sortColumn?: string;
  entitledMethods?: string;
  type: string;
  store_ids?: number | undefined;
  orderType?: string;
}
