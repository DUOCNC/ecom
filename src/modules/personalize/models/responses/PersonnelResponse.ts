import {FormatValueSalary} from 'modules/personalize/models/entities/PersonnelEntity';

export interface MetaDataResponse {
  name: string;
  value: number;
  format: FormatValueSalary;
}

export interface SalaryResponse {
  name: string;
  value: number;
  metaData: Array<MetaDataResponse>;
  format: FormatValueSalary;
}

export interface PersonnelResponse {
  accountCode: string;
  accountName: string;
  position: string;
  totalSalary: number;
  totalIncomeSalary: number;
  totalDeductionSalary: number;
  incomeSalaries: Array<SalaryResponse>;
  deductionSalaries: Array<SalaryResponse>;
}
