export interface OrderQuery {
  limit?: number;
  page?: number;
  is_online?: boolean;
  search_term?: string;
  store_ids?: Array<number>;
  channel_codes?: string;
  sub_status_code?: string;
  store_and_financial_store?: number;
}
