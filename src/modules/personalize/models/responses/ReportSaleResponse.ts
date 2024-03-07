export interface ReportMetaResponse {
  currentDate: string;
  listStoreId: string;
  assigneeCode: string;
}

export interface ReportSaleOrderResponse {
  salesToday: string;
  salesTarget: string;
  salesMtd: string;
  salesMonthForecast: string;
  salesMonthForecastRatio: string;
  totalOrders: string;
  totalOrdersReturn: string;
  aov: string;
}

export interface ReportSaleResponse<T> {
  data: T;
  meta: ReportMetaResponse;
}
