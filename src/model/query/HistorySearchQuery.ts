export interface HistorySearchQuery {
  from?: Date;
  to?: Date;
  type: string;
  page?: number;
  limit?: number;
  sort_type?: string;
  sort_column?: string;
}
