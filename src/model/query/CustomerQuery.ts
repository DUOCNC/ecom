export interface CustomerQuery {
  request?: string;
  search_type?: string;
  page?: number;
  limit?: number;
}

export interface UserInteractionQuery {
  phones?: Array<string>;
  page?: number;
  limit?: number;
}
