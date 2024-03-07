import {AnalyticResponse} from '../responses';

export interface IReportRetail {
  getBarChartData(arr: Array<any> | null): void;
}

export interface IReportRetailDetail {
  getDataDetail(
    report: AnalyticResponse<any>,
    reportOld: AnalyticResponse<any>,
  ): void;
}
