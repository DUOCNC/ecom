export interface VariantQuery {
  page?: number;
  limit?: number;
  sort_type?: string;
  sort_column?: string;
  info?: string;
  status?: string;
  saleable?: boolean;
  store_ids?: Array<number>;
  variant_ids?: Array<number>;
}
