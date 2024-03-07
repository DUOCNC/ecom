export interface ReportEmulationRequest {
  beginDate?: string;
  endDate?: string;
  sort?:
    | 'sales'
    | 'aov'
    | 'customer_purchase'
    | 'cr_traffic_assignee'
    | 'cr_slot_created';
  timeType?: 'day' | 'week' | 'month' | string;
  departmentLv3?: string;
  departmentLv2?: string;
  viewDate?: string;
  ydCode?: string | null;
}
