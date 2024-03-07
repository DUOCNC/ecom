export interface QueryResponse {
  columns: Array<{field: string}>;
  conditions: Array<string[]>;
  cube: string;
  from: Date;
  limitCount: number;
  orderBy: Array<string[]>;
  rows: string[];
  timeSeries: boolean;
  to: Date;
}
