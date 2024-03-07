export type DiscountType = 'percent' | 'money';
export interface OrderDiscountItemSubRequest {
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

export interface OrderFulfillmentLineItemSubRequest {
  id: number | null;
  amount: number;
  discount_amount: number;
  discount_rate: number;
  discount_type: DiscountType;
  discount_value: number;
  discount_items: Array<OrderDiscountItemSubRequest>;
  line_amount_after_line_discount: number;
  note: string;
  price: number;
  product: string;
  product_code: string;
  product_id: number;
  product_type: string;
  quantity: number;
  sku: string;
  tax_include: boolean;
  tax_rate: number;
  type: string;
  unit: string;
  variant: string;
  variant_barcode: string;
  variant_id: number;
  variant_image: string;
  weight: number;
  weight_unit: string;
  avaiable: number;
}

export interface OrderFulfillmentSubRequest {
  account_code: string | null;
  assignee_code: string | null;
  delivery_type: string;
  payment_status: string;
  shipment: any;
  stock_location_id: number;
  store_id: number;
  items: Array<OrderFulfillmentLineItemSubRequest>;
  total: number;
  total_discount: number;
  total_line_amount_after_line_discount: number;
  total_quantity: number;
  total_tax: number;
}

export interface BaseOrderLineItemSubRequest {
  id: number | null;
  amount: number;
  discount_amount: number;
  discount_rate: number;
  discount_type: DiscountType;
  discount_value: number;
  discount_items: Array<OrderDiscountItemSubRequest>;
  line_amount_after_line_discount: number;
  note: string;
  price: number;
  product: string;
  product_code: string;
  product_id: number;
  product_type: string;
  quantity: number;
  sku: string;
  tax_include: boolean;
  tax_rate: number;
  type: string;
  unit: string;
  variant: string;
  variant_barcode: string;
  variant_id: number;
  variant_image: string;
  weight: number;
  weight_unit: string;
  avaiable: number;
}
export interface OrderLineItemSubRequest extends BaseOrderLineItemSubRequest {
  gifts: Array<BaseOrderLineItemSubRequest>;
}

export interface OrderPaymentSubRequest {
  amount: number;
  customer_id: number | null;
  note: string | null;
  paid_amount: number;
  payment_method: string | null;
  payment_method_code: string | null;
  payment_method_id: number | null;
  reference: string;
  point: number | null;
  return_amount: number;
  source: string;
  status: string;
  type: string;
}
export interface OrderDiscountSubRequest {
  id: number | null;
  rate: number;
  reason: string;
  source: string;
  order_id: number | null;
  promotion_id: number | null;
  discount_code: string | null;
  amount: number;
  value: number;
}

export interface OrderRequest {
  company_id: number;
  store_id: number | null;
  items: Array<OrderLineItemSubRequest>;
  customer_id: number | null;
  customer_address: string;
  customer_city: string;
  customer_district: string;
  customer_note: string;
  customer_ward: string;
  customer: string;
  channel_id: number;
  currency: string;
  source_id: number;
  discounts: Array<OrderDiscountSubRequest>;
  total_line_amount_after_line_discount: number;
  total_discount: number;
  total: number;
  note: string;
  account_code: string | null;
  assignee_code: string | null;
  payments: Array<OrderPaymentSubRequest>;
  price_type: string;
  reference_code: string | null;
  url: string | null;
  total_tax: number | null;
  tax_treatment: null;
  discount_type: DiscountType;
  fulfillments: Array<OrderFulfillmentSubRequest>;
}
