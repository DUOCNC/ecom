export interface Performance {
  date: string;
  employeeCode: string;
  numberCustomer: number;
  numberCustomerConsultative: number;
  numberOrder: number;
  revenue: number;
  workHour: number;
  rsm: string;
  store: string;
}
export interface PerformanceResponse {
  data: Performance | null;
}
