import {AggregateResponse} from './AggregateResponse';
import {QueryResponse} from './QueryResponse';
import {ResultResponse} from './ResultResponse';

export interface AnalyticResponse<T> {
  aggregates: {[key: string]: AggregateResponse};
  properties: T;
  query: QueryResponse;
  result: ResultResponse;
}

export interface ConversionAssigneeList {
  name: string;
}

export interface ConversionEachAssigneeList extends ConversionAssigneeList {
  customers: number;
  customersReceived: number;
}
export interface ConvertRateEachAssigneeList extends ConversionAssigneeList {
  customerBuyCount: number;
  convertRate: number;
}
export interface NotBuyEachAssigneeList extends ConversionAssigneeList {
  customerNotBuyCount: number;
  missedRevenue: number;
}
