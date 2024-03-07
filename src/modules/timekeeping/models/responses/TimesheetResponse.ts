export interface TimeSheetResponse {
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
  dates: string[];
}
