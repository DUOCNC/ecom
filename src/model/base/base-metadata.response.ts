export interface BaseMetadata {
  total: number;
  limit: number;
  page: number;
  pageSize?: number;
  status?: 'active' | 'inactive';
}

export interface PageResponse<T> {
  data: any;
  metadata: BaseMetadata;
  items: Array<T>;
}

export interface PageResponseV2<T> {
  headers?: {
    ['x-total-count']: string;
  };
  data: Array<T>;
}
