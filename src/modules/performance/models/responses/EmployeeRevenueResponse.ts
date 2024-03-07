export interface EmployeeRevenue {
  employeeCode: string;
  revenueTotal: number;
}
export interface EmployeeRevenueResponse {
  data: Array<EmployeeRevenue> | null;
}
