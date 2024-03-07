import {DateUtils, StringUtils} from 'common';
import Optional from 'common/helper/Optional';
import {CustomerVisitorRequest} from '../requests';
import {CustomerVisitorResponse} from '../responses';
import DayVisitorEntity from './DayVisitorEntity';

export default class CustomerVisitorEntity {
  month: number;
  year: number;
  storeIds: Array<number>;
  assigneeCode: string;
  assigneeName: string;
  dayVistors: Array<DayVisitorEntity>;
  source: string;

  private constructor() {
    this.month = 0;
    this.year = 0;
    this.storeIds = [];
    this.assigneeCode = '';
    this.assigneeName = '';
    this.dayVistors = [];
    this.source = 'assignee';
  }

  static create() {
    return new CustomerVisitorEntity();
  }

  static createWithParam(
    date: Date,
    storeIds: Array<number>,
    assigneeCode: string,
    assigneeName: string,
    source?: string,
  ) {
    let customerVisitor = new CustomerVisitorEntity();
    customerVisitor.month = date.getMonth() + 1;
    customerVisitor.year = date.getFullYear();
    customerVisitor.storeIds = storeIds;
    customerVisitor.assigneeCode = assigneeCode.toLowerCase();
    customerVisitor.assigneeName = assigneeName;
    customerVisitor.source = source ? source.toLowerCase() : 'assignee';
    return customerVisitor;
  }

  static copy(visitor: CustomerVisitorEntity) {
    let customerVisitor = new CustomerVisitorEntity();
    customerVisitor.month = visitor.getMonth();
    customerVisitor.year = visitor.getYear();
    customerVisitor.storeIds = visitor.getStoreIds();
    customerVisitor.assigneeCode = visitor.assigneeCode;
    customerVisitor.assigneeName = visitor.assigneeName;
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

  getQuery() {
    let query = StringUtils.format(
      'month.equals={0}&year.equals={1}',
      this.month,
      this.year,
    );
    if (this.storeIds.length > 0) {
      const storeQuery = StringUtils.format(
        'storeIds={0}',
        this.storeIds.toString(),
      );
      query = StringUtils.format('{0}&{1}', query, storeQuery);
    }
    if (this.assigneeCode !== '') {
      query = StringUtils.format(
        '{0}&assigneeCode.in[0]={1}',
        query,
        this.assigneeCode,
      );
    }
    if (this.source !== '') {
      query = StringUtils.format('{0}&source.in[0]={1}', query, this.source);
    }
    return query;
  }

  setDataVisitor(visitor: CustomerVisitorResponse) {
    let dayVisitors = Object.keys(visitor)
      .filter(key => key.includes('day'))
      .map(key => {
        let asKey = key as keyof CustomerVisitorResponse;
        let dataAfterSpilit = key.split('day');
        if (dataAfterSpilit.length < 2) {
          return new DayVisitorEntity(0, 0, 0);
        }
        let dayOfMonth = parseInt(dataAfterSpilit[1], 10);
        let count = 0;
        let value = visitor[asKey];
        if (value !== undefined && typeof value === 'number') {
          count = value;
        }
        return new DayVisitorEntity(dayOfMonth, count, visitor.storeId);
      })
      .filter(obj => obj.getDayOfMonth() !== 0);
    this.dayVistors = dayVisitors;
  }

  private getVisitorToday(storeActive: number) {
    let today = new Date();
    return this.getVisitor(storeActive, today);
  }

  private getVisitorYesterday(storeActive: number) {
    let today = new Date();
    let yesterday = DateUtils.getYesterday(today);
    return this.getVisitor(storeActive, yesterday);
  }

  private getVisitor(storeActive: number, date: Date) {
    if (storeActive === -1) {
      return null;
    }
    return Optional.ofNulable(this.dayVistors)
      .orElse([])
      .filter(visitor => visitor.getStoreId() === storeActive)
      .find(visitor => visitor.getDayOfMonth() === date.getDate());
  }

  private getCountVisitorYesterday(storeActive: number) {
    const visitor = this.getVisitorYesterday(storeActive);
    if (visitor == null) {
      return 0;
    }
    return visitor.getVisitor();
  }

  getGrowPercent(storeActive: number) {
    let countToday = this.getCountVisitorToday(storeActive);
    let countYesterday = this.getCountVisitorYesterday(storeActive);
    return countToday - countYesterday;
  }

  getCountVisitorToday(storeActive: number) {
    const visitor = this.getVisitorToday(storeActive);
    if (visitor == null) {
      return 0;
    }
    return visitor.getVisitor();
  }

  updateCountToday(storeActive: number, newCount: any) {
    let visitor = this.getVisitorToday(storeActive);
    if (visitor == null) {
      let date = new Date();
      visitor = new DayVisitorEntity(date.getDate(), 0, storeActive);
      this.dayVistors.push(visitor);
    }
    visitor.setVisitor(newCount);
  }

  getRequestUpdate(storeActive: number, isCustomerGoStoreRequest: boolean) {
    const visitor = this.getVisitorToday(storeActive);
    if (visitor == null) {
      return null;
    }
    let source = isCustomerGoStoreRequest ? 'receptionist' : 'assignee';
    let customerVisitorRequest: CustomerVisitorRequest = {
      storeId: visitor.getStoreId(),
      assigneeCode: this.assigneeCode,
      assigneeName: this.assigneeName,
      month: this.month,
      year: this.year,
      source,
    };
    let date = visitor.getDayOfMonth();
    switch (date) {
      case 1:
        customerVisitorRequest.day01 = visitor.getVisitor();
        break;
      case 2:
        customerVisitorRequest.day02 = visitor.getVisitor();
        break;
      case 3:
        customerVisitorRequest.day03 = visitor.getVisitor();
        break;
      case 4:
        customerVisitorRequest.day04 = visitor.getVisitor();
        break;
      case 5:
        customerVisitorRequest.day05 = visitor.getVisitor();
        break;
      case 6:
        customerVisitorRequest.day06 = visitor.getVisitor();
        break;
      case 7:
        customerVisitorRequest.day07 = visitor.getVisitor();
        break;
      case 8:
        customerVisitorRequest.day08 = visitor.getVisitor();
        break;
      case 9:
        customerVisitorRequest.day09 = visitor.getVisitor();
        break;
      case 10:
        customerVisitorRequest.day10 = visitor.getVisitor();
        break;
      case 11:
        customerVisitorRequest.day11 = visitor.getVisitor();
        break;
      case 12:
        customerVisitorRequest.day12 = visitor.getVisitor();
        break;
      case 13:
        customerVisitorRequest.day13 = visitor.getVisitor();
        break;
      case 14:
        customerVisitorRequest.day14 = visitor.getVisitor();
        break;
      case 15:
        customerVisitorRequest.day15 = visitor.getVisitor();
        break;
      case 16:
        customerVisitorRequest.day16 = visitor.getVisitor();
        break;
      case 17:
        customerVisitorRequest.day17 = visitor.getVisitor();
        break;
      case 18:
        customerVisitorRequest.day18 = visitor.getVisitor();
        break;
      case 19:
        customerVisitorRequest.day19 = visitor.getVisitor();
        break;
      case 20:
        customerVisitorRequest.day20 = visitor.getVisitor();
        break;
      case 21:
        customerVisitorRequest.day21 = visitor.getVisitor();
        break;
      case 22:
        customerVisitorRequest.day22 = visitor.getVisitor();
        break;
      case 23:
        customerVisitorRequest.day23 = visitor.getVisitor();
        break;
      case 24:
        customerVisitorRequest.day24 = visitor.getVisitor();
        break;
      case 25:
        customerVisitorRequest.day25 = visitor.getVisitor();
        break;
      case 26:
        customerVisitorRequest.day26 = visitor.getVisitor();
        break;
      case 27:
        customerVisitorRequest.day27 = visitor.getVisitor();
        break;
      case 28:
        customerVisitorRequest.day28 = visitor.getVisitor();
        break;
      case 29:
        customerVisitorRequest.day29 = visitor.getVisitor();
        break;
      case 30:
        customerVisitorRequest.day30 = visitor.getVisitor();
        break;
      case 31:
        customerVisitorRequest.day31 = visitor.getVisitor();
        break;
    }
    return customerVisitorRequest;
  }
}
