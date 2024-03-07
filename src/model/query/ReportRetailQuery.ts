import {ReportQuery} from './ReportQuery';

export interface VariantQuery {
  page?: number;
  limit?: number;
  sort_type?: string;
  sort_column?: string;
  info?: string;
  status?: string;
  saleable?: boolean;
  store_ids?: Array<number>;
  variant_ids?: Array<number>;
}

export interface ReportRetailQuery {
  date: Date;
  type: string;
}

export interface IReportRetailQuery {
  onPress: (e: ReportQuery, viewType: string) => void;
  pDate?: string;
  pViewType?: string;
  loading?: boolean;
  departmentLv2?: string;
  departmentLv3?: string;
}
