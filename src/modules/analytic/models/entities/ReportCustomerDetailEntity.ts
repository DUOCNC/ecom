import NumberUtils from 'utils/NumberUtils';
import {ReportCustomerDetailResponse} from '../responses';

export class ReportCustomerDetailEntity {
  private totalValue: number | undefined;
  private totalToday: number | undefined;
  private totalYesterday: number | undefined;
  private totalLastMonth: number | undefined;
  private totalThisMonth: number | undefined;
  private thisMonth: number | undefined;
  private lastMonth: number | undefined;
  private totalMissRevenue: number;
  constructor() {
    this.totalMissRevenue = 0;
  }

  setReportCustomerDetailEntity(customerRes: ReportCustomerDetailResponse) {
    this.setTotalValue(customerRes.totalValue);
    this.setTotalToday(customerRes.totalToday);
    this.setTotalYesterday(customerRes.totalYesterday);
    this.setTotalThisMonth(customerRes.totalThisMonth);
    this.setTotalLastMonth(customerRes.totalLastMonth);
    this.setTotalMissRevenue(customerRes.totalMissRevenue);
    this.setThisMonth(customerRes.thisMonth);
    this.setLastMonth(customerRes.lastMonth);
  }

  private setThisMonth(value: number | undefined) {
    this.thisMonth = value;
  }

  private setLastMonth(value: number | undefined) {
    this.lastMonth = value;
  }

  private setTotalValue(value: number | undefined) {
    this.totalValue = value;
  }
  private setTotalToday(value: number | undefined) {
    this.totalToday = value;
  }
  private setTotalYesterday(value: number | undefined) {
    this.totalYesterday = value;
  }
  private setTotalThisMonth(value: number | undefined) {
    this.totalThisMonth = value;
  }
  private setTotalLastMonth(value: number | undefined) {
    this.totalLastMonth = value;
  }
  private setTotalMissRevenue(value: number | undefined) {
    if (value) {
      this.totalMissRevenue = value;
    }
  }
  getTotalValue() {
    if (this.totalValue === undefined) {
      return '--';
    }
    return NumberUtils.formatNumber(this.totalValue);
  }
  getTotalToday() {
    if (this.totalToday === undefined) {
      return '--';
    }
    return NumberUtils.formatNumber(this.totalToday);
  }
  getTotalCompareByDate() {
    return (this.totalToday ?? 0) - (this.totalYesterday ?? 0);
  }
  getTotalYesterday() {
    if (this.totalYesterday === undefined) {
      return '--';
    }
    return NumberUtils.formatNumber(this.totalYesterday);
  }
  getThisMonth() {
    if (this.thisMonth === undefined) {
      return '--';
    }
    return NumberUtils.formatNumber(this.thisMonth);
  }
  getLastMonth() {
    if (this.lastMonth === undefined) {
      return '--';
    }
    return NumberUtils.formatNumber(this.lastMonth);
  }

  getTotalThisMonth() {
    if (this.totalThisMonth === undefined) {
      return '--';
    }
    return NumberUtils.formatNumber(this.totalThisMonth);
  }
  getTotalLastMonth() {
    if (this.totalLastMonth === undefined) {
      return '--';
    }
    return NumberUtils.formatNumber(this.totalLastMonth);
  }
  getTotalCompareByMonth() {
    return (this.totalThisMonth ?? 0) - (this.totalLastMonth ?? 0);
  }

  getCompareByMonth() {
    return (this.thisMonth ?? 0) - (this.lastMonth ?? 0);
  }
  getTotalMissRevenue() {
    return NumberUtils.formatCurrency(this.totalMissRevenue);
  }
  getTotal() {
    return [
      this.totalValue,
      this.totalToday,
      this.totalYesterday,
      this.totalThisMonth,
      this.totalLastMonth,
      this.totalMissRevenue,
      this.thisMonth,
      this.lastMonth,
    ];
  }
}
