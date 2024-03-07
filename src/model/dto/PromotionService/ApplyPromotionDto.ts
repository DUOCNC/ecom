export interface ApplyDiscountSubDto {
  allocation_limit: number | null;
  code: string;
  invalid: boolean;
  invalid_description: string;
  price_rule_id: number | null;
  title: string | null;
  value: number | null;
  value_type: string | null;
}

export interface SuggestedDiscountOrderSubDto {
  allocation_limit: number | null;
  price_rule_id: number;
  title: string;
  value: number;
  value_type: string;
}

export interface PromotionLineItemSubDto {
  applied_discount: ApplyDiscountSubDto | null;
  category_code: string | null;
  category_id: number;
  category_name: string;
  collections: Array<string> | null;
  color: string;
  custom: boolean;
  discounted_total: number | null;
  discounted_unit_price: number | null;
  original_total: number;
  original_unit_price: number;
  product_id: number;
  product_name: string;
  product_tags: Array<string>;
  quantity: number;
  size: string;
  sku: string;
  suggested_discounts: Array<SuggestedDiscountOrderSubDto>;
  taxable: boolean;
  total_discount: number | null;
  variant_id: number;
}

export interface ApplyPromotionDto {
  applied_discount: ApplyDiscountSubDto | null;
  assignee_code: string;
  birthday_date: string | null;
  customer_group_id: number | null;
  customer_id: number | null;
  customer_loyalty_level_id: number | null;
  customer_type_id: number | null;
  gender: number | null;
  order_id: number | null;
  order_source_id: number;
  original_subtotal_price: number;
  sales_channel_name: string;
  store_id: number;
  subtotal_price: number | null;
  suggested_discounts: Array<SuggestedDiscountOrderSubDto>;
  tax_exempt: boolean;
  taxes_included: boolean;
  wedding_date: string;
  line_items: Array<PromotionLineItemSubDto>;
}
