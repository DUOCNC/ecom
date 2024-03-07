export interface VariantInventoryQuery {
  variant_ids?: Array<number>;
  store_ids?: Array<number>;
  page?: number;
  limit?: number;
  remain?: string;
  variant_sku7?: string;
  info?: string;
  from_price?: number;
  to_price?: number;
  collections?: string;
  sort_type?: string;
  sort_column?: string;
}
