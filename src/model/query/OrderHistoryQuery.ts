export interface OrderHistoryQuery {
  limit?: number;
  page?: number;
  customer_ids: number;
  is_online?: boolean;
  search_term?: string;
}
