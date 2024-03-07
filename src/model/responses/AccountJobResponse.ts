export interface AccountJobResponse {
  id: number;
  accountId: number;
  departmentId: number | null;
  department: string | null;
  positionId: number;
  position: string | null;
}
