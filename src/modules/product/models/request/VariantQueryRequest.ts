export interface VariantQueryRequest {
  skus?: Array<string>;
  storeIds?: Array<number>;
  limit?: number;
  page?: number;
  info?: string;
}
