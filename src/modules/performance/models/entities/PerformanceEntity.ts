import {NumberUtils, StringUtils} from 'common';
import {PerformanceResponse} from '../responses';
import {AwardEntity} from './AwardEntity';

export class PerformanceEntity {
  private date: Date;
  private employeeCode: string | null;
  private rsm: string | null;
  private store: string | null;
  private numberCustomer: number | null;
  private numberCustomerConsultative: number | null;
  private numberOrder: number | null;
  private revenue: number | null;
  private workHour: number | null;
  private constructor(
    date: Date,
    employeeCode: string | null,
    numberCustomer: number | null,
    numberCustomerConsultative: number | null,
    numberOrder: number | null,
    revenue: number | null,
    workHour: number | null,
    rsm: string | null,
    store: string | null,
  ) {
    this.date = date;
    this.employeeCode = employeeCode;
    this.numberCustomer = numberCustomer;
    this.numberCustomerConsultative = numberCustomerConsultative;
    this.numberOrder = numberOrder;
    this.revenue = revenue;
    this.workHour = workHour;
    this.rsm = rsm;
    this.store = store;
  }

  static createFromResponse(
    performanceResponse: PerformanceResponse,
    date: Date,
  ) {
    if (performanceResponse.data == null) {
      return new PerformanceEntity(
        date,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      );
    }
    let {data} = performanceResponse;
    return new PerformanceEntity(
      date,
      data.employeeCode,
      data.numberCustomer,
      data.numberCustomerConsultative,
      data.numberOrder,
      data.revenue,
      data.workHour,
      data.rsm,
      data.store,
    );
  }

  static createFromDate(date: Date) {
    return new PerformanceEntity(
      date,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    );
  }

  getRevenue() {
    if (this.revenue == null) {
      return NumberUtils.formatCurrencyWithoutCurrency(0);
    }
    return NumberUtils.formatCurrencyWithoutCurrency(this.revenue);
  }

  getNumberOrder() {
    if (this.numberOrder == null) {
      return '-';
    }
    return NumberUtils.formatNumber(this.numberOrder);
  }

  getWorkHour(): string {
    if (this.workHour == null || this.workHour === 0) {
      return '-';
    }
    return NumberUtils.formatNumber(this.workHour);
  }

  getPerformance() {
    if (
      this.revenue === null ||
      this.workHour === null ||
      this.revenue === 0 ||
      this.workHour === 0
    ) {
      return '-';
    }
    let average = this.revenue / this.workHour;
    let averageString = NumberUtils.formatCurrency(Math.ceil(average));
    return StringUtils.format('{0}', averageString);
  }

  getAverage(): string {
    if (
      this.revenue === null ||
      this.numberOrder === null ||
      this.revenue === 0 ||
      this.numberOrder === 0
    ) {
      return '-';
    }
    let average = this.revenue / this.numberOrder;
    return NumberUtils.formatCurrency(+average.toFixed(2));
  }

  getNumberCustomer(): string {
    if (this.numberCustomer === null || this.numberCustomer === 0) {
      return '-';
    }
    return NumberUtils.formatNumber(this.numberCustomer);
  }

  getRate(): string {
    if (
      this.numberCustomer === null ||
      this.numberCustomerConsultative === null ||
      this.numberCustomer === 0 ||
      this.numberCustomerConsultative === 0
    ) {
      return '-';
    }
    let rate = (this.numberCustomer / this.numberCustomerConsultative) * 100;
    return StringUtils.format('{0}%', NumberUtils.formatNumber(+rate.toFixed(2)));
  }

  public getAchievementRecognition(awards: Array<AwardEntity>) {
    if (awards.length > 2) {
      return 'Wow, bạn đang là một trong những người đạt top seller nhiều nhất công ty.';
    }
    if (awards.length === 1 || awards.length === 2) {
      return 'Wow, cố gắng một chút là bạn sẽ trở thành một trong những người đạt top seller nhiều nhất công ty đó.';
    }
    if (awards.length === 0) {
      return 'Tiếc quá, bạn cần cố gắng một chút nữa để ghi tên mình vào bảng vàng top seller.';
    }
  }

  getStore() {
    return this.store;
  }
  getRsm() {
    return this.rsm;
  }
  getEmployeeCode() {
    return this.employeeCode;
  }
}
