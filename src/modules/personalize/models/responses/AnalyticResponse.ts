import {AggregateResponse} from './AggregateResponse';
import {QueryResponse} from './QueryResponse';
import {ResultResponse} from './ResultResponse';

export interface AnalyticResponse<T> {
  aggregates: {[key: string]: AggregateResponse};
  properties: T;
  query: QueryResponse;
  result: ResultResponse;
}
