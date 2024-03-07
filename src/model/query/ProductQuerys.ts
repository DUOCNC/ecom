export interface ProductQuery {
  page?: number;
  limit?: number;
  sort_type?: string;
  sort_column?: string;
  info?: string;
  status?: string;
  codes?: Array<string>;
}
