export interface AppliedDiscountSubRequest {
  code: string | null;
}

export interface PromotionLineItemSubRequest {
  custom: boolean;
  product_id: number;
  product_name: string;
  variant_id: number;
  sku: string;
  collections: Array<string>;
  product_tags: Array<string>;
  color: string | null;
  size: string | null;
  quantity: number;
  original_total: number;
  original_unit_price: number;
  taxable: boolean;
  applied_discount: AppliedDiscountSubRequest | null;
}

export interface PromotionApplyRequest {
  order_id: number | null;
  customer_id: number | null;
  applied_discount: AppliedDiscountSubRequest | null;
  gender: string | null;
  customer_group_id: string | null;
  customer_loyalty_level_id: string | null;
  customer_type_id: string | null;
  birthday_date: Date | null;
  wedding_date: Date | null;
  store_id: number | null;
  sales_channel_name: string;
  order_source_id: number;
  assignee_code: string | null;
  line_items: Array<PromotionLineItemSubRequest>;
  taxes_included: boolean;
  tax_exempt: boolean;
}
