export interface Metadata {
  limit: number;
  page: number;
  total: number;
}

export interface Pageable<T> {
  items: Array<T>;
  metadata: Metadata;
}
