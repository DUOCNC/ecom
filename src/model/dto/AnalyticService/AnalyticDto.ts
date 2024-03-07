export interface AnalyticDto {
  aggregates: {[key: string]: AggregateSubDto};
  properties: PropertiesSubDto;
  query: QuerySubDto;
  result: ResultSubDto;
}

export interface AggregateSubDto {
  name: string;
}

export interface PropertiesSubDto {
  'Sản phẩm:'?: {
    variant_sku7: string;
  };
}

export interface QuerySubDto {
  columns: Array<QueryColumnSubDto>;
  conditions: Array<string[]>;
  cube: string;
  from: Date;
  limitCount: number;
  orderBy: Array<string[]>;
  rows: string[];
  timeSeries: boolean;
  to: Date;
}

export interface QueryColumnSubDto {
  field: string;
}

export interface ResultSubDto {
  columns: ColumnSubDto[];
  data: Array<any[]>;
  summary: (number | null)[];
}

export interface ColumnSubDto {
  field: string;
  type: string;
  format: string;
}
