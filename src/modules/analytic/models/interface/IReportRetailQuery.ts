import {ReportQuery} from 'model/query/ReportQuery';

export interface IReportRetailQuery {
  onPress: (e: ReportQuery, viewType: string) => void;
  pDate?: string;
  pViewType?: string;
  loading?: boolean;
}
