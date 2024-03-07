export interface HistorySearchRequest {
  from?: Date;
  to?: Date;
  type: string;
  page?: number;
  limit?: number;
  sortType?: string;
  sortColumn?: string;
}
