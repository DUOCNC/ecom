import {DateFormatPattern} from 'common/enums/DateFormatPattern';
import moment, {Moment, isMoment} from 'moment';

class DateUtils {
  private constructor() {}

  static getDatePrevious(date: Date, count: number) {
    return moment(date).subtract(count, 'day').toDate();
  }

  /**
   * Lấy ngày đầu tiên của tháng
   * @param date
   * @returns StartOfDate
   */
  static getStartDateOfMonth(date: Date) {
    return moment(date).startOf('month').toDate();
  }

  /**
   * Lấy ngày đầu tiên của tháng format YYYY-MM-DD
   * @param date
   * @returns StartOfDate
   */
  static getStartDateOfMonthFormat(date: Date) {
    return moment(date).startOf('month').format('YYYY-MM-DD');
  }

  /**
   * Lấy ngày đầu tiên của tháng format DD/MM/YYYY
   * @param date
   * @returns StartOfDate
   */
  static getStartDateOfMonthFormatDDMMYYY(date: Date) {
    return moment(date).startOf('month').format('DD/MM/YYYY');
  }

  /**
   * Lấy ngày cuối cùng của tháng
   * @param date
   * @returns EndOfDate
   */
  static getLastDateOfMonth(date: Date) {
    return moment(date).endOf('month').toDate();
  }

  /**
   * Lấy ngày cuối cùng của tháng format YYYY-MM-DD
   * @param date
   * @returns StartOfDate
   */
  static getEndDateOfMonthFormat(date: Date) {
    if (date.getMonth() === new Date().getMonth()) {
      return moment().format('YYYY-MM-DD');
    }
    return moment(date).endOf('month').format('YYYY-MM-DD');
  }

  /**
   * Lấy ngày cuối cùng của tháng format DD/MM/YYYY
   * @param date
   * @returns StartOfDate
   */
  static getEndDateOfMonthFormatDDMMYYYY(date: Date) {
    if (date.getMonth() === new Date().getMonth()) {
      return moment().format('DD/MM/YYYY');
    }
    return moment(date).endOf('month').format('DD/MM/YYYY');
  }

  /**
   * Lấy ngày hiện tại format hh:mm DD/MM/YYYY
   * @returns StartOfDate
   */
  static getDateFormatHHMMDDMMYYYY(dateUpdate: Date) {
    return moment(dateUpdate).format('hh:mm DD/MM/YYYY');
  }

  /**
   * Định dạng date
   * @param date Date
   * @param pattern DateFormatPattern
   * @returns
   */
  static format(date: Date, pattern: DateFormatPattern) {
    return moment(date).format(pattern);
  }

  /**
   * Định dạng date dạng 2023-11-30T16:59:59+0000
   * @param date 2023-11-30T16:59:59+0000
   * @param pattern DateFormatPattern
   * @returns
   */
  static formatDateFromServer(date: string, pattern: DateFormatPattern) {
    return moment(date).format(pattern);
  }

  static toMoment(
    timeString: Moment | string | null | undefined,
  ): Moment | string | undefined {
    if (!timeString) return undefined;

    if (isMoment(timeString)) return timeString;

    let args = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(timeString);

    if (args) {
      const [, dd, mm, yyyy] = args;
      return moment()
        .year(+yyyy)
        .month(+mm - 1)
        .date(+dd);
    }

    args = /^(\d{2}):(\d{2}):(\d{2})$/.exec(timeString);

    if (args) {
      const [, hh, mm, ss] = args;
      return moment().hour(+hh).minute(+mm).second(+ss);
    }

    args = /^(\d{2}):(\d{2})$/.exec(timeString);

    if (args) {
      const [, hh, mm] = args;
      return moment().hour(+hh).minute(+mm);
    }

    return timeString;
  }

  static parseMoment(
    time: Moment | string | null | undefined,
    format?: string,
  ): string | undefined {
    if (!time) return undefined;

    if (typeof time === 'string') {
      const m = this.toMoment(time) as Moment;
      return moment.isMoment(m) ? m.format(format) : m;
    }

    return time.format(format);
  }

  /**
   * Lấy ngày hôm qua
   * @param date: date
   */
  static getYesterday(today: Date) {
    return moment(today).subtract(1, 'days').toDate();
  }

  /**
   * Lấy ngày hôm qua
   * @param date: date
   */
  static clearMillisecond(date: string) {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    const [match] = regex.exec(date);
    if (match) {
      return match + 'Z';
    }
    return '';
  }
}

export default DateUtils;
