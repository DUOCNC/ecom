import {ColumnResponse} from './ColumnResponse';

export interface ResultResponse {
  columns: ColumnResponse[];
  data: Array<any[]>;
  summary: (number | null)[];
}
