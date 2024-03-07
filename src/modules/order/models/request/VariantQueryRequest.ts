export interface VariantQueryRequest {
  skus?: Array<string>;
  storeIds?: Array<number>;
  limit?: number;
  page?: number;
  info?: string;
  saleable?: boolean;
}

export interface VariantLocationQueryRequest {
  store_id: number;
  info: string;
  status?: string;
}
