import {StringUtils} from 'common';
import {DateFormatPattern} from 'common/enums';
import {ReportCustomerTab} from 'modules/analytic/enums/ReportConfig';
import moment from 'moment';
import {CustomerVisitorDetailResponse} from '../responses';
import {CustomerSaleResponse} from '../responses/CustomerSaleResponse';
import DayVisitorEntity from './DayVisitorEntity';
import {ReportAssigneeEntity} from './ReportAssigneeEntity';

export class ReportCustomerVisitorDetailEntity {
  private storeIds: Array<number>;
  private month: number;
  private year: number;
  private dayVisitors: Array<Array<DayVisitorEntity>>;
  private source: string;

  constructor() {
    this.month = 0;
    this.year = 0;
    this.storeIds = [];
    this.dayVisitors = [];
    this.source = ReportCustomerTab.receptionist;
  }

  static createWithParam(date: Date, storeIds: Array<number>, source?: string) {
    let customerVisitor = new ReportCustomerVisitorDetailEntity();
    customerVisitor.month = date.getMonth() + 1;
    customerVisitor.year = date.getFullYear();
    customerVisitor.storeIds = storeIds;
    customerVisitor.source = source
      ? source.toLowerCase()
      : ReportCustomerTab.receptionist;
    return customerVisitor;
  }

  getMonth() {
    return this.month;
  }

  getStoreIds() {
    return this.storeIds;
  }

  getYear() {
    return this.year;
  }

  getSource() {
    return this.source;
  }

  setDataVisitor(visitor: Array<CustomerVisitorDetailResponse>) {
    let dayVisitors: Array<DayVisitorEntity[]> = [];
    visitor.forEach(v => {
      let dayVisitor = Object.keys(v)
        .filter(key => key.includes('day'))
        .map(key => {
          let asKey = key as keyof CustomerVisitorDetailResponse;
          let dataAfterSplit = key.split('day');
          if (dataAfterSplit.length < 2) {
            return new DayVisitorEntity(0, 0, 0, '', '');
          }
          let dayOfMonth = parseInt(dataAfterSplit[1], 10);
          let count = 0;
          let value = v[asKey];
          if (value !== undefined && typeof value === 'number') {
            count = value;
          }
          return new DayVisitorEntity(
            dayOfMonth,
            count,
            v.storeId,
            v.assigneeName,
            v.assigneeCode,
          );
        })
        .filter(obj => obj.getDayOfMonth() !== 0);
      dayVisitors.push(dayVisitor);
    });
    this.dayVisitors = dayVisitors;
  }

  private getVisitor(storeActive: number, date: Date) {
    if (storeActive === -1) {
      return null;
    }
    let visitors: Array<DayVisitorEntity> = [];
    for (let i = 0; i < this.dayVisitors.length; i++) {
      const v = this.dayVisitors[i]
        .filter(visitor => visitor.getStoreId() === storeActive)
        .find(
          visitor =>
            visitor.getDayOfMonth() === date.getDate() &&
            visitor.getVisitor() !== 0,
        );
      if (v) {
        visitors.push(v);
      }
    }
    return visitors;
  }

  getEmployee(date: Date, customers?: Array<CustomerSaleResponse>) {
    let visitors = this.getVisitor(this.storeIds[0], date) ?? [];
    let employee: Array<ReportAssigneeEntity> = [];
    let employeeSale: Array<ReportAssigneeEntity> = [];
    for (let i = 0; i < visitors.length; i++) {
      const visitor = visitors[i];
      employee.push(
        ReportAssigneeEntity.create(
          visitor.getAssigneeName(),
          visitor.getAssigneeCode(),
          0,
          visitor.getVisitor(),
        ),
      );
    }
    if (customers && customers.length > 0) {
      for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];
        employeeSale.push(
          ReportAssigneeEntity.create(
            customer.assigneeName,
            customer.assigneeCode,
            customer.customers,
            employee
              .find(e => e.getCode() === customer.assigneeCode)
              ?.getCustomerReceivedValue() ?? 0,
          ),
        );
      }
    }
    return this.mergeEmployee(employee, employeeSale);
  }

  getQuery() {
    let query = StringUtils.format(
      'month.equals={0}&year.equals={1}',
      this.month,
      this.year,
    );
    if (this.storeIds.length > 0) {
      const storeQuery = this.storeIds.map((storeId, index) =>
        StringUtils.format('storeId.in[{0}]={1}', index, storeId),
      );
      query = StringUtils.format('{0}&{1}', query, storeQuery);
    }
    if (this.source !== '') {
      query = StringUtils.format('{0}&source.in[0]={1}', query, this.source);
    }
    return query;
  }

  getCustomerSaleQuery(storeName: string, date: Date) {
    let query = StringUtils.format(
      "SHOW customers BY assignee_name,assignee_code FROM offline_sales WHERE pos_location_name IN ('{0}') SINCE {1} UNTIL {2} ORDER BY total_sales DESC",
      storeName,
      moment(date).format(DateFormatPattern.YYYYMMDD),
      moment(date).format(DateFormatPattern.YYYYMMDD),
    );
    return query;
  }

  private mergeEmployee(
    arr1: Array<ReportAssigneeEntity>,
    arr2: Array<ReportAssigneeEntity>,
  ) {
    let mergedArr = arr1.concat(arr2);
    let uniqueEmployees: Array<ReportAssigneeEntity> = [];
    mergedArr.forEach(employee => {
      let matchedIndex = uniqueEmployees.findIndex(function (item) {
        return item.getCode() === employee.getCode();
      });
      if (matchedIndex === -1) {
        uniqueEmployees.push(employee);
      } else {
        uniqueEmployees[matchedIndex] = employee;
      }
    });
    uniqueEmployees.sort((a, b) => {
      return b.getCustomerReceivedValue() - a.getCustomerReceivedValue();
    });
    uniqueEmployees = uniqueEmployees.filter(
      e => !(e.getCustomerValue() === 0 && e.getCustomerReceivedValue() === 0),
    );
    return uniqueEmployees;
  }
}
