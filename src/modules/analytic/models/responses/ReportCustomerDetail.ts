export interface ReportCustomerDetailResponse {
  totalValue: number | undefined;
  totalToday: number | undefined;
  totalYesterday: number | undefined;
  totalThisMonth: number | undefined;
  totalLastMonth: number | undefined;
  totalMissRevenue?: number | undefined;
  thisMonth?: number | undefined;
  lastMonth?: number | undefined;
}
