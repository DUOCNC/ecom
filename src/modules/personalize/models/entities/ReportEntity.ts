import {AnalyticResponse} from '../responses';
import NumberUtils from 'utils/NumberUtils';

export default class ReportEntity {
  private totalSale: number;
  private orderCount: number;
  private returnCount: number;
  private averageOrderValue: number;
  private totalSalesPosO2o: number;
  private preTotalSalesO2o: number;

  constructor() {
    this.totalSale = 0;
    this.orderCount = 0;
    this.returnCount = 0;
    this.averageOrderValue = 0;
    this.totalSalesPosO2o = 0;
    this.preTotalSalesO2o = 0;
  }

  setReport(report: AnalyticResponse<any>) {
    if (report.result.data.length === 1) {
      let firstData = report.result.data[0];
      this.setTotalSale(firstData[1]);
      this.setOrderCount(firstData[2]);
      this.setReturnCount(firstData[3]);
      this.setAverageOrderValue(firstData[4]);
      this.setTotalSalesPosO2o(firstData[5]);
      this.setPreTotalSalesO2o(firstData[6]);
      return;
    }
    if (report.result.summary !== null) {
      let summaryData = report.result.summary;
      this.setTotalSale(summaryData[1]);
      this.setOrderCount(summaryData[2]);
      this.setReturnCount(summaryData[3]);
      this.setAverageOrderValue(summaryData[4]);
      this.setTotalSalesPosO2o(summaryData[5]);
      this.setPreTotalSalesO2o(summaryData[6]);
    }
  }
  private setAverageOrderValue(averageOrderValue: number | null) {
    if (averageOrderValue == null) {
      return;
    }
    this.averageOrderValue = averageOrderValue;
  }
  private setReturnCount(returnCount: number | null) {
    if (returnCount == null) {
      return;
    }
    this.returnCount = returnCount;
  }
  private setOrderCount(orderCount: number | null) {
    if (orderCount == null) {
      return;
    }
    this.orderCount = orderCount;
  }
  private setTotalSale(totalSale: number | null) {
    if (totalSale == null) {
      return;
    }
    this.totalSale = totalSale;
  }
  private setTotalSalesPosO2o(totalSalesPosO2o: number | null) {
    if (totalSalesPosO2o == null) {
      return;
    }
    this.totalSalesPosO2o = totalSalesPosO2o;
  }
  private setPreTotalSalesO2o(preTotalSalesO2o: number | null) {
    if (preTotalSalesO2o == null) {
      return;
    }
    this.preTotalSalesO2o = preTotalSalesO2o;
  }

  getTotalSale() {
    return NumberUtils.formatCurrency(this.totalSale);
  }

  getOrderCount() {
    return NumberUtils.formatNumber(this.orderCount);
  }

  getReturnCount() {
    return NumberUtils.formatNumber(this.returnCount);
  }
  getTotalSalesPosO2o() {
    return NumberUtils.formatCurrency(this.totalSalesPosO2o);
  }
  getPreTotalSalesO2o() {
    return NumberUtils.formatCurrency(this.preTotalSalesO2o);
  }

  getAverageOrderValue() {
    if (this.totalSale > 0 && this.orderCount > 0) {
      return NumberUtils.formatCurrency(this.totalSale / this.orderCount);
    }
    return NumberUtils.formatCurrency(this.averageOrderValue);
  }
}
