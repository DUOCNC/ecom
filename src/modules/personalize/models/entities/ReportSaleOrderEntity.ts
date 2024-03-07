import {NumberUtils, StringUtils} from 'common';
import {ReportSaleOrderResponse} from '../responses/ReportSaleResponse';

export default class ReportSaleOrderEntity {
  private salesToday: number;
  private salesTarget: number;
  private salesMtd: number;
  private salesMonthForecast: number;
  private salesMonthForecastRatio: number;
  private totalOrders: number;
  private totalOrdersReturn: number;
  private aov: number;
  constructor(
    salesToday: number = 0,
    salesTarget: number = 0,
    salesMtd: number = 0,
    salesMonthForecast: number = 0,
    salesMonthForecastRatio: number = 0,
    totalOrders: number = 0,
    totalOrdersReturn: number = 0,
    aov: number = 0,
  ) {
    this.salesToday = salesToday;
    this.salesTarget = salesTarget;
    this.salesMtd = salesMtd;
    this.salesMonthForecast = salesMonthForecast;
    this.salesMonthForecastRatio = salesMonthForecastRatio;
    this.totalOrders = totalOrders;
    this.totalOrdersReturn = totalOrdersReturn;
    this.aov = aov;
  }

  static createFromResponse(r: ReportSaleOrderResponse): ReportSaleOrderEntity {
    return new ReportSaleOrderEntity(
      parseFloat(r.salesToday),
      parseFloat(r.salesTarget),
      parseFloat(r.salesMtd),
      parseFloat(r.salesMonthForecast),
      parseFloat(r.salesMonthForecastRatio),
      parseFloat(r.totalOrders),
      parseFloat(r.totalOrdersReturn),
      parseFloat(r.aov),
    );
  }

  static createEmpty(): ReportSaleOrderEntity {
    return new ReportSaleOrderEntity(0, 0, 0, 0, 0, 0, 0, 0);
  }

  getSalesTodayValue(): number {
    return this.salesToday;
  }

  getSalesToday(): string {
    return NumberUtils.formatCurrency(this.salesToday);
  }

  getSalesTargetValue(): number {
    return this.salesTarget;
  }

  getSalesTarget(): string {
    return NumberUtils.formatCurrency(this.salesTarget);
  }

  getSalesMtdValue(): number {
    return this.salesMtd;
  }

  getSaleRatioValue(): number {
    if (this.salesTarget === 0) {
      return 0;
    }
    return Math.round((this.salesMtd / this.salesTarget) * 100);
  }

  getSaleRatio(): string {
    return StringUtils.format('({0}%)', this.getSaleRatioValue());
  }

  getSalesMtd(): string {
    return NumberUtils.formatCurrencyWithoutCurrency(this.salesMtd);
  }

  getSalesMonthForecast(): string {
    return NumberUtils.formatCurrency(this.salesMonthForecast);
  }

  getSalesMonthForecastValue(): number {
    return this.salesMonthForecast;
  }

  getSalesMonthForecastRatioValue(): number {
    return this.salesMonthForecastRatio;
  }

  getSalesMonthForecastRatio(): string {
    return StringUtils.format(
      ' ({0}%)',
      NumberUtils.formatNumber(Math.round(this.salesMonthForecastRatio * 100)),
    );
  }

  getTotalOrdersValue(): number {
    return this.totalOrders;
  }

  getTotalOrders(): string {
    return NumberUtils.formatCurrency(this.totalOrders);
  }

  getTotalOrdersReturn(): number {
    return this.totalOrdersReturn;
  }

  getAov(): number {
    return this.aov;
  }

  getWidthSalesMtd(totalWidth: number) {
    if (this.salesTarget === 0) {
      return 0;
    }
    return (
      parseFloat((this.salesMtd / this.salesTarget).toFixed(2)) * totalWidth
    );
  }

  getWidthMonthForecast(totalWidth: number) {
    if (this.salesTarget === 0) {
      return 0;
    }
    return (
      parseFloat((this.salesMonthForecast / this.salesTarget).toFixed(2)) *
      totalWidth
    );
  }
}
