export interface PerformanceRequest {
  date: string;
}

export interface RevenueRequest {
  beginDate: string;
  endDate: string;
  storeName?: string | null;
  rsm?: string | null;
}
