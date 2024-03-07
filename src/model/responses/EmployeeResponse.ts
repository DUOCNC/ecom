export interface ContractResponse {
  id: number;
  code: string;
  description: string | null;
  type: string;
  subType: string;
  employeeCode: string;
  departmentCode: string;
  departmentName: string;
  companyName: string;
  companyCode: string;
  positionName: string;
  jobTitle: string;
  dateStart: string;
  dateEnd: string;
  workPlace: string | null;
  jobStatus: string | null;
  dateReg: string;
  status: string;
  certificateStatus: string;
  econtractStatus: string;
  econtractLastSigned: string | null;
}

export interface EmployeeResponse {
  id: number;
  code: string;
  displayName: string;
  firstName: string;
  lastName: string;
  role: string;
  departmentName: string;
  contracts: ContractResponse[];
}
