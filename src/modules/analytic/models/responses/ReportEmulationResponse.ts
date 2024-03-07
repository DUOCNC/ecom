export interface ReportEmulationItemResponse {
  departmentName: string;
  revenue: number;
  averageOrderValue: number;
  numberCustomers: number;
  salesGrowthRatio: number;
  aovGrowthRatio: number;
  customersGrowthRatio: number;
  crTrafficAssignee: number;
  crTrafficAssigneeGrowthRatio: number;
  crSlotCreated: number;
  crSlotCreatedGrowthRatio: number;
  trafficAssigneeQuantity: number;
  numberSlotCreated: number;
  numberSlotBought: number;
}

export interface ReportEmulationResponse {
  viewType: string;
  summary: ReportEmulationItemResponse;
  items: ReportEmulationItemResponse[];
}
