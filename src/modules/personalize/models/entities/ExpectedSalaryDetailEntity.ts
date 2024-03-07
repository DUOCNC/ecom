import {DateFormatPattern} from 'common/enums';
import DateUtils from 'common/utils/DateUtilts';
import NumberUtils from 'utils/NumberUtils';

export default class ExpectedSalaryDetailEntity {
  private date: Date;
  private turnover: number;
  constructor(date: Date, turnover: number) {
    this.date = date;
    this.turnover = turnover;
  }

  getDate() {
    return DateUtils.format(this.date, DateFormatPattern.DDMMYYYY);
  }

  getTurnover() {
    return NumberUtils.formatCurrency(this.turnover);
  }
}
