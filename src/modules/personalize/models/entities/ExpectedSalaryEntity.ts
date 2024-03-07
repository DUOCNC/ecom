import {DateFormatPattern} from 'common/enums';
import DateUtils from 'common/utils/DateUtilts';
import StringUtils from 'common/utils/StringUtils';
import NumberUtils from 'utils/NumberUtils';
import {IExpectedSalary} from 'modules/personalize/models';
import {AnalyticResponse} from 'modules/personalize/models';
import ExpectedSalaryEntityDetail from './ExpectedSalaryDetailEntity';

export abstract class ExpectedSalaryEntity implements IExpectedSalary {
  private readonly fromDate: Date;
  private readonly toDate: Date;
  private readonly userCode: string;
  private turnover: number = 0;
  private gift: number = 0;
  private detail: Array<ExpectedSalaryEntityDetail> = [];

  constructor(fromDate: Date, toDate: Date, userCode: string) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.userCode = userCode;
  }
  abstract getQuery(): string;

  getFromDate() {
    return DateUtils.format(this.fromDate, DateFormatPattern.YYYYMMDD);
  }

  getToDate() {
    return DateUtils.format(this.toDate, DateFormatPattern.YYYYMMDD);
  }

  getUserCode() {
    return this.userCode.toLocaleLowerCase();
  }

  setAnalytic(analytic: AnalyticResponse<any>) {
    if (analytic.result == null) {
      return;
    }
    let result = analytic.result;
    if (result.summary == null) {
      return;
    }
    let {summary, data} = result;
    if (summary === null || summary[1] === null || data == null) {
      return;
    }
    this.setTurnover(summary[1]);
    this.setTurnoverDetail(data);
  }
  setTurnoverDetail(data: Array<Array<any>>) {
    this.detail = data.map(
      value => new ExpectedSalaryEntityDetail(new Date(value[0]), value[1]),
    );
  }

  private setTurnover(turnover: number) {
    this.turnover = turnover;
  }

  getTotal(isMask: boolean) {
    let turnoverRate = (this.turnover * this.getRate()) / 100;
    const total = parseInt(turnoverRate.toFixed(2), 10) + this.gift;
    if (isMask) {
      return total.toString().replace(/\S/g, '*');
    }
    return NumberUtils.formatCurrency(total);
  }

  getTurnover() {
    return NumberUtils.formatCurrency(this.turnover);
  }

  getGift() {
    return NumberUtils.formatCurrency(this.gift);
  }

  getDetail() {
    return this.detail;
  }

  abstract getRate(): number;
}

class AssigneeExpectedSalaryEntity extends ExpectedSalaryEntity {
  getRate(): number {
    return 3;
  }

  getQuery() {
    return StringUtils.format(
      "SHOW total_sales BY day FROM offline_sales WHERE assignee_code IN ('{0}') SINCE {1} UNTIL {2} ORDER BY day DESC",
      this.getUserCode(),
      this.getFromDate(),
      this.getToDate(),
    );
  }
}

class StaffExpectedSalaryEntity extends ExpectedSalaryEntity {
  getQuery() {
    return StringUtils.format(
      "SHOW total_sales BY day FROM offline_sales WHERE staff_code IN ('{0}') SINCE {1} UNTIL {2} ORDER BY day DESC",
      this.getUserCode(),
      this.getFromDate(),
      this.getToDate(),
    );
  }

  getRate(): number {
    return 0.5;
  }
}

class LeadExpectedSalaryEntity extends ExpectedSalaryEntity {
  getQuery() {
    return StringUtils.format(
      'SHOW total_sales  BY day FROM offline_sales SINCE {0} UNTIL {1} ORDER BY day DESC',
      this.getFromDate(),
      this.getToDate(),
    );
  }

  getRate(): number {
    return 0.8;
  }
}

class ProbationaryLeadExpectedSalaryEntity extends ExpectedSalaryEntity {
  getQuery() {
    return StringUtils.format(
      'SHOW total_sales  BY day FROM offline_sales SINCE {0} UNTIL {1} ORDER BY day DESC',
      this.getFromDate(),
      this.getToDate(),
    );
  }

  getRate(): number {
    return 0.68;
  }
}

class ProbationaryAssigneeExpectedSalaryEntity extends ExpectedSalaryEntity {
  getQuery() {
    return StringUtils.format(
      "SHOW total_sales BY day FROM offline_sales WHERE assignee_code IN ('{0}') SINCE {1} UNTIL {2} ORDER BY day DESC",
      this.getUserCode(),
      this.getFromDate(),
      this.getToDate(),
    );
  }

  getRate(): number {
    return 3;
  }
}

export {
  AssigneeExpectedSalaryEntity,
  StaffExpectedSalaryEntity,
  LeadExpectedSalaryEntity,
  ProbationaryLeadExpectedSalaryEntity,
  ProbationaryAssigneeExpectedSalaryEntity,
};
