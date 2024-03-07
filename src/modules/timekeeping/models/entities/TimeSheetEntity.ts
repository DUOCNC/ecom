import moment from 'moment';
import {TimeSheetResponse} from '../responses';
import {NumberUtils, StringUtils} from 'common';
import {colors} from 'assets/v2';
import {WorkDayStatus} from 'modules/timekeeping/enums';
import {DateFormatPattern} from 'common/enums';
import {ShiftEntity} from '.';

export class WorkdayDateEntity {
  date: string;
  calWorkHour: number;
  calWorkDay: number;
  checkin: string | null;
  checkout: string | null;
  shifts: Array<ShiftEntity>;

  constructor(data: {
    date: string;
    calWorkHour: number;
    calWorkDay: number;
    checkin: string | null;
    checkout: string | null;
    shifts: Array<ShiftEntity>;
  }) {
    this.date = data.date;
    this.calWorkHour = data.calWorkHour;
    this.calWorkDay = data.calWorkDay;
    this.checkin = data.checkin;
    this.checkout = data.checkout;
    this.shifts = data.shifts;
  }

  static createEmpty(): WorkdayDateEntity {
    return new WorkdayDateEntity({
      date: '',
      calWorkHour: 0,
      calWorkDay: 0,
      checkin: null,
      checkout: null,
      shifts: [],
    });
  }

  getDate(): string {
    return this.date;
  }

  setDate(value: string) {
    this.date = value;
  }

  getCalWorkHour(): string {
    if (!this.calWorkHour || this.calWorkHour === 0.0) {
      return '0';
    }
    return NumberUtils.formatNumber(parseFloat(this.calWorkHour.toFixed(2)));
  }

  getCalWorkHourValue() {
    if (!this.calWorkHour || this.calWorkHour === 0.0) {
      return 0;
    }
    return this.calWorkHour;
  }

  setCalWorkHour(value: number) {
    this.calWorkHour = value;
  }

  getCalWorkDay(): string {
    if (!this.calWorkDay || this.calWorkDay === 0.0) {
      return '0';
    }
    return NumberUtils.formatNumber(parseFloat(this.calWorkDay.toFixed(2)));
  }

  setCalWorkDay(value: number) {
    this.calWorkDay = value;
  }

  getCheckin(): string {
    if (!this.checkin) {
      return '';
    }
    return StringUtils.format('{0}', moment(this.checkin).format('HH:mm'));
  }

  getCheckinTimeSheetTab(): string {
    if (!this.checkin) {
      return '--:--';
    }
    return StringUtils.format('{0}', moment(this.checkin).format('HH:mm'));
  }

  setCheckin(value: string | null) {
    this.checkin = value;
  }

  getCheckout(): string {
    if (!this.checkout) {
      return '';
    }
    return StringUtils.format('{0}', moment(this.checkout).format('HH:mm'));
  }

  getCheckoutTimeSheetTab(): string {
    if (!this.checkout) {
      return '--:--';
    }
    return StringUtils.format('{0}', moment(this.checkout).format('HH:mm'));
  }

  setCheckout(value: string | null) {
    this.checkout = value;
  }

  getBorderCoder() {
    if (this.date === '') {
      return colors.error.o500;
    }
    let color = colors.secondary.o200;
    const today = moment();
    if (this.calWorkDay > 1 || this.calWorkDay === 1) {
      color = colors.success.o400;
    }
    if (this.calWorkDay === 0) {
      if (
        moment(this.date, DateFormatPattern.YYYYMMDD).isBefore(
          moment(today, DateFormatPattern.YYYYMMDD),
        )
      ) {
        color = colors.error.o500;
      }
    }
    if (this.calWorkDay < 1 && this.calWorkDay > 0) {
      color = colors.warning.o500;
    }
    if (moment().isSame(this.date, 'day')) {
      color = colors.secondary.o200;
    }
    return color;
  }

  getWorkStatus() {
    if (this.date === '') {
      return WorkDayStatus.LEAVE;
    }
    const today = moment();
    let status = WorkDayStatus.FUTURE;
    if (this.calWorkDay >= 1) {
      status = WorkDayStatus.COMPLETE;
    }
    if (this.calWorkDay === 0) {
      if (
        moment(this.date, DateFormatPattern.YYYYMMDD).isBefore(
          moment(today, DateFormatPattern.YYYYMMDD),
        )
      ) {
        status = WorkDayStatus.LEAVE;
      }
    }
    if (this.calWorkDay < 1 && this.calWorkDay > 0) {
      status = WorkDayStatus.NOT_ENOUGH_WORKING_HOURS;
    }
    if (moment().isSame(this.date, 'day')) {
      status = WorkDayStatus.TODAY;
    }
    return status;
  }

  getViewDate() {
    return moment(this.date).format('DD/MM/YYYY');
  }

  getShifts() {
    return this.shifts;
  }
}

export class TimeSheetEntity {
  id: number;
  calWorkday: number;
  calWorkHour: number;
  numberWorkday: number;
  late: number;
  soon: number;
  lateMinute: number;
  soonMinute: number;
  leaveNoReason: number;
  noCheckInOut: number;
  calWorkHourNight: number | null;
  calWorkHourLight: number;
  workdayOvertime: number;
  workHourOvertime: number | null;
  calMealDayOvertime: number;
  calMealDayShift: number;
  calMealDay: number;
  calFineLate: number;
  calFineSoon: number;
  calFineLeaveNoReason: number;
  calFineNoCheckInOut: number;
  calFine: number;
  calWorkdayLate: number;
  calWorkdaySoon: number;
  calWorkdayLeaveNoReason: number;
  calWorkdayNoCheckInOut: number;
  dates: Array<WorkdayDateEntity>;

  constructor(data: {
    id: number;
    calWorkday: number;
    calWorkHour: number;
    numberWorkday: number;
    late: number;
    soon: number;
    lateMinute: number;
    soonMinute: number;
    leaveNoReason: number;
    noCheckInOut: number;
    calWorkHourNight: number | null;
    calWorkHourLight: number;
    workdayOvertime: number;
    workHourOvertime: number | null;
    calMealDayOvertime: number;
    calMealDayShift: number;
    calMealDay: number;
    calFineLate: number;
    calFineSoon: number;
    calFineLeaveNoReason: number;
    calFineNoCheckInOut: number;
    calFine: number;
    calWorkdayLate: number;
    calWorkdaySoon: number;
    calWorkdayLeaveNoReason: number;
    calWorkdayNoCheckInOut: number;
    dates: Array<WorkdayDateEntity>;
  }) {
    this.id = data.id;
    this.calWorkday = data.calWorkday;
    this.calWorkHour = data.calWorkHour;
    this.numberWorkday = data.numberWorkday;
    this.late = data.late;
    this.soon = data.soon;
    this.lateMinute = data.lateMinute;
    this.soonMinute = data.soonMinute;
    this.leaveNoReason = data.leaveNoReason;
    this.noCheckInOut = data.noCheckInOut;
    this.calWorkHourNight = data.calWorkHourNight;
    this.calWorkHourLight = data.calWorkHourLight;
    this.workdayOvertime = data.workdayOvertime;
    this.workHourOvertime = data.workHourOvertime;
    this.calMealDayOvertime = data.calMealDayOvertime;
    this.calMealDayShift = data.calMealDayShift;
    this.calMealDay = data.calMealDay;
    this.calFineLate = data.calFineLate;
    this.calFineSoon = data.calFineSoon;
    this.calFineLeaveNoReason = data.calFineLeaveNoReason;
    this.calFineNoCheckInOut = data.calFineNoCheckInOut;
    this.calFine = data.calFine;
    this.calWorkdayLate = data.calWorkdayLate;
    this.calWorkdaySoon = data.calWorkdaySoon;
    this.calWorkdayLeaveNoReason = data.calWorkdayLeaveNoReason;
    this.calWorkdayNoCheckInOut = data.calWorkdayNoCheckInOut;
    this.dates = data.dates;
  }

  static createEmpty(): TimeSheetEntity {
    const dates: WorkdayDateEntity[] = [];
    return new TimeSheetEntity({
      id: 0,
      calWorkday: 0,
      calWorkHour: 0,
      numberWorkday: 0,
      late: 0,
      soon: 0,
      lateMinute: 0,
      soonMinute: 0,
      leaveNoReason: 0,
      noCheckInOut: 0,
      calWorkHourNight: 0,
      calWorkHourLight: 0,
      workdayOvertime: 0,
      workHourOvertime: 0,
      calMealDayOvertime: 0,
      calMealDayShift: 0,
      calMealDay: 0,
      calFineLate: 0,
      calFineSoon: 0,
      calFineLeaveNoReason: 0,
      calFineNoCheckInOut: 0,
      calFine: 0,
      calWorkdayLate: 0,
      calWorkdaySoon: 0,
      calWorkdayLeaveNoReason: 0,
      calWorkdayNoCheckInOut: 0,
      dates,
    });
  }

  static create(data: TimeSheetResponse): TimeSheetEntity {
    const dates = Object.keys(data.dates).map(date => {
      const newDate = moment(date, 'YYYYMMDD').format('YYYY-MM-DD');
      const workday = data.dates[date];
      const workdayDateEntity = new WorkdayDateEntity({
        date: newDate,
        calWorkHour: workday.calWorkHour,
        calWorkDay: workday.calWorkday,
        checkin: workday.checkin,
        checkout: workday.checkout,
        shifts: workday.shifts,
      });
      return workdayDateEntity;
    });
    return new TimeSheetEntity({
      id: data.id,
      calWorkday: +data.calWorkday.toFixed(2),
      calWorkHour: +data.calWorkHour.toFixed(2),
      numberWorkday: +data.numberWorkday.toFixed(2),
      late: +data.late.toFixed(2),
      soon: +data.soon.toFixed(2),
      lateMinute: +data.lateMinute.toFixed(2),
      soonMinute: +data.soonMinute.toFixed(2),
      leaveNoReason: +data.leaveNoReason.toFixed(2),
      noCheckInOut: +data.noCheckInOut.toFixed(2),
      calWorkHourNight: data.calWorkHourNight,
      calWorkHourLight: +data.calWorkHourLight.toFixed(2),
      workdayOvertime: +data.workdayOvertime.toFixed(2),
      workHourOvertime: data.workHourOvertime,
      calMealDayOvertime: +data.calMealDayOvertime.toFixed(2),
      calMealDayShift: +data.calMealDayShift.toFixed(2),
      calMealDay: +data.calMealDay.toFixed(2),
      calFineLate: +data.calFineLate.toFixed(2),
      calFineSoon: +data.calFineSoon.toFixed(2),
      calFineLeaveNoReason: +data.calFineLeaveNoReason.toFixed(2),
      calFineNoCheckInOut: +data.calFineNoCheckInOut.toFixed(2),
      calFine: +data.calFine.toFixed(2),
      calWorkdayLate: +data.calWorkdayLate.toFixed(2),
      calWorkdaySoon: +data.calWorkdaySoon.toFixed(2),
      calWorkdayLeaveNoReason: +data.calWorkdayLeaveNoReason.toFixed(2),
      calWorkdayNoCheckInOut: +data.calWorkdayNoCheckInOut.toFixed(2),
      dates,
    });
  }

  getId() {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getCalWorkday() {
    return this.calWorkday;
  }

  setCalWorkday(value: number) {
    this.calWorkday = value;
  }

  getCalWorkHour() {
    return this.calWorkHour;
  }

  setCalWorkHour(value: number) {
    this.calWorkHour = value;
  }

  getNumberWorkday() {
    return this.numberWorkday;
  }

  setNumberWorkday(value: number) {
    this.numberWorkday = value;
  }

  getLate() {
    return this.late;
  }

  setLate(value: number) {
    this.late = value;
  }

  getSoon() {
    return this.soon;
  }

  setSoon(value: number) {
    this.soon = value;
  }

  getLateMinute() {
    return NumberUtils.formatNumber(this.lateMinute);
  }

  setLateMinute(value: number) {
    this.lateMinute = value;
  }

  getSoonMinute() {
    return NumberUtils.formatNumber(this.soonMinute);
  }

  setSoonMinute(value: number) {
    this.soonMinute = value;
  }

  getLeaveNoReason() {
    return this.leaveNoReason;
  }

  setLeaveNoReason(value: number) {
    this.leaveNoReason = value;
  }

  getNoCheckInOut() {
    return this.noCheckInOut;
  }

  setNoCheckInOut(value: number) {
    this.noCheckInOut = value;
  }

  getCalWorkHourNight() {
    if (!this.calWorkHourNight) {
      return 0;
    }
    return NumberUtils.getNumberOrNull(+this.calWorkHourNight.toFixed(2));
  }

  setCalWorkHourNight(value: number | null) {
    this.calWorkHourNight = value;
  }

  getCalWorkHourLight() {
    return NumberUtils.getNumberOrNull(this.calWorkHourLight);
  }

  setCalWorkHourLight(value: number) {
    this.calWorkHourLight = value;
  }

  getWorkdayOvertime() {
    return this.workdayOvertime;
  }

  setWorkdayOvertime(value: number) {
    this.workdayOvertime = value;
  }

  getWorkHourOvertime() {
    if (!this.workHourOvertime) {
      return 0;
    }
    return NumberUtils.formatNumber(+this.workHourOvertime.toFixed(2));
  }

  setWorkHourOvertime(value: number | null) {
    this.workHourOvertime = value;
  }

  getCalMealDayOvertime() {
    return NumberUtils.formatNumber(this.calMealDayOvertime);
  }

  setCalMealDayOvertime(value: number) {
    this.calMealDayOvertime = value;
  }

  getCalMealDayShift() {
    return this.calMealDayShift;
  }

  setCalMealDayShift(value: number) {
    this.calMealDayShift = value;
  }

  getCalMealDay() {
    return this.calMealDay;
  }

  setCalMealDay(value: number) {
    this.calMealDay = value;
  }

  getCalFineLate() {
    return NumberUtils.formatCurrency(this.calFineLate);
  }

  setCalFineLate(value: number) {
    this.calFineLate = value;
  }

  getCalFineSoon() {
    return NumberUtils.formatCurrency(this.calFineSoon);
  }

  setCalFineSoon(value: number) {
    this.calFineSoon = value;
  }

  getCalFineLeaveNoReason() {
    return NumberUtils.formatCurrency(this.calFineLeaveNoReason);
  }

  setCalFineLeaveNoReason(value: number) {
    this.calFineLeaveNoReason = value;
  }

  getCalFineNoCheckInOut() {
    return NumberUtils.formatCurrency(this.calFineNoCheckInOut);
  }

  setCalFineNoCheckInOut(value: number) {
    this.calFineNoCheckInOut = value;
  }

  getCalFine() {
    return NumberUtils.formatCurrency(this.calFine);
  }

  setCalFine(value: number) {
    this.calFine = value;
  }

  getCalWorkdayLate() {
    return this.calWorkdayLate;
  }

  setCalWorkdayLate(value: number) {
    this.calWorkdayLate = value;
  }

  getCalWorkdaySoon() {
    return this.calWorkdaySoon;
  }

  setCalWorkdaySoon(value: number) {
    this.calWorkdaySoon = value;
  }

  getCalWorkdayLeaveNoReason() {
    return this.calWorkdayLeaveNoReason;
  }

  setCalWorkdayLeaveNoReason(value: number) {
    this.calWorkdayLeaveNoReason = value;
  }

  getCalWorkdayNoCheckInOut() {
    return this.calWorkdayNoCheckInOut;
  }

  setCalWorkdayNoCheckInOut(value: number) {
    this.calWorkdayNoCheckInOut = value;
  }

  getDates(): Array<WorkdayDateEntity> {
    return this.dates;
  }

  setDates(value: Array<WorkdayDateEntity>) {
    this.dates = value;
  }
}
