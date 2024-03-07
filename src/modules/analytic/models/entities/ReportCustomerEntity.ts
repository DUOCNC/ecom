import NumberUtils from 'utils/NumberUtils';
import {ResultResponse} from '../responses';
import CustomerVisitorEntity from './CustomerVisitorEntity';

export class ReportCustomerEntity {
  private customers: number;
  private customerRate: number | undefined;
  private customerVisitor: CustomerVisitorEntity;
  private customerReceived: CustomerVisitorEntity;
  private customerNotBuy: number | undefined;
  private totalMissRevenue: number;
  constructor() {
    this.customers = 0;
    this.customerVisitor = new CustomerVisitorEntity();
    this.customerReceived = new CustomerVisitorEntity();
    this.totalMissRevenue = 0;
  }

  setReportCustomerEntity(
    res: ResultResponse | null,
    customerVisitor: CustomerVisitorEntity,
    customerReceived: CustomerVisitorEntity,
    resSamePeriod?: ResultResponse | null,
  ) {
    this.customerVisitor = customerVisitor;
    this.customerReceived = customerReceived;
    if (!res || !res.data) {
      return;
    }
    let [customers, customerVisitors, rate, customersReceived, customerNotBy] =
      [0, 0, 0, 0, 0];
    customerVisitors = customerVisitor.getCustomerVisitor().getValue();
    customersReceived = customerReceived.getCustomerVisitor().getValue();
    if (res.data.length === 1) {
      customers = res.data[0][2];
    }
    if (res.summary) {
      customers = res.summary[2] ?? 0;
    }
    this.setCustomer(customers);
    if (
      customerVisitors !== 0 &&
      customersReceived !== 0 &&
      (customerVisitors < customers || customerVisitors === customers) &&
      customers < customersReceived
    ) {
      this.setCustomerNotBuy(undefined);
      return;
    }
    customerNotBy =
      customerVisitors - customers < 0 ? 0 : customerVisitors - customers;
    this.setCustomerNotBuy(customerNotBy);
    //doanh thu bỏ lỡ
    if (resSamePeriod && resSamePeriod.summary) {
      let [customersPeriod, totalSalePeriod, averageCustomer] = [
        resSamePeriod.summary[2] ?? 0,
        resSamePeriod.summary[1] ?? 0,
        0,
      ];
      if (customersPeriod !== 0) {
        averageCustomer = totalSalePeriod / customersPeriod; //TB doanh thu trước đó
        if (
          this.customerNotBuy &&
          this.customerNotBuy !== 0 &&
          averageCustomer > 0
        ) {
          this.setTotalMissRevenue(
            parseFloat((averageCustomer * this.customerNotBuy).toFixed(2)),
          );
        }
      }
    }

    if (customerVisitors === 0 && customers > 0) {
      return;
    }
    if (customerVisitors === 0) {
      this.setCustomerRate(0);
      return;
    }
    rate = parseFloat(((customers / customerVisitors) * 100).toFixed(2));
    this.setCustomerRate(rate);
  }

  private setCustomer(value: number | null) {
    if (value) {
      this.customers = value;
    }
  }

  private setCustomerRate(value: number | undefined) {
    if (value || value === 0) {
      this.customerRate = value;
    }
  }

  private setCustomerNotBuy(value: number | undefined) {
    if (value || value === 0) {
      this.customerNotBuy = value;
    }
  }

  private setTotalMissRevenue(value: number | null) {
    if (value) {
      this.totalMissRevenue = value;
    }
  }

  getCustomerRate() {
    if (this.customerRate === undefined) {
      return '--';
    }
    return NumberUtils.formatNumber(this.customerRate);
  }

  getCustomer() {
    return NumberUtils.formatNumber(this.customers);
  }

  getCustomerVisitor() {
    return NumberUtils.formatNumber(
      this.customerVisitor.getCustomerVisitor().getValue(),
    );
  }

  getCustomerNotBuyValue() {
    return this.customerNotBuy;
  }

  getCustomerNotBuy() {
    if (this.customerNotBuy === undefined) {
      return '--';
    }
    return NumberUtils.formatNumber(this.customerNotBuy);
  }

  getTotalMissRevenueValue() {
    return this.totalMissRevenue;
  }

  getTotalMissRevenue() {
    return NumberUtils.formatCurrency(this.totalMissRevenue);
  }

  getCustomerReceived() {
    return NumberUtils.formatNumber(
      this.customerReceived.getCustomerVisitor().getValue(),
    );
  }
}
