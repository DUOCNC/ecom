export interface OrderReturnQuery {
  limit?: number;
  page?: number;
  is_online?: boolean;
  search_term?: string;
  store_ids?: Array<number>;
}
