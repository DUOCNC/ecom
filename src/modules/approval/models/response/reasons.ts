export type LeaveReason = {
  id: string;
  active: number;
  define: string;
  desc: string;
  hasAttendance: string;
  hasPremium: string;
  hasReason: string;
  isAdd: string;
  isAddoff: string;
  isCal: string;
  isLimit: string;
  maxDay: string;
  numberAdd: string;
  salaryPercent: string;
  seniorityDay: string;
  sign: string;
  title: string;
  typeDay: string;
  requiredFinger: string;
};

export type AbsenceReason = {
  id: string;
  active: number;
  desc: string;
  hasAttendance: string;
  hasPenance: string;
  hasReason: string;
  maxDay: string;
  maxTime: string;
  requiredFinger: string;
  title: string;
  unit: string;
};

export type CheckInOutReason = {
  id: string;
  active: number;
  desc: string;
  hasPenance: string;
  hasReason: string;
  maxDay: string;
  maxTime: string;
  hasAttendance: string;
  sign: string;
  title: string;
  unit: string;
};

export type OnsiteReason = {
  title: string;
  desc: string;
  active: number;
  maxDay: string;
  hasAttendance: string;
  typeDay: string;
  id: string;
};

export type ResignReason = {
  title: string;
  hasReason: string;
  active: number;
  id: string;
};

export type OvertimeReason = AbsenceReason;

export type ShiftMoresReason = {
  title: string;
  desc: string;
  hasReason: string;
  active: number;
  maxDay: string;
  maxTime: string;
  unit: string;
  hasAttendance: string;
  id: string;
};

export type Furlough = {
  year?: number;
  furloughAccumulationOpen?: number;
  furloughAccumulationUsed?: number;
  furloughAccumulationExpired?: number;
  furloughAccumulationClosed?: number;
  furloughYearOpen?: number;
  furloughYearUsed?: number;
  furloughYearClosed?: number;
  furloughSeniorityOpen?: number;
  furloughSeniorityUsed?: number;
  furloughSeniorityClosed?: number;
  furloughAdd?: number;
  furloughTotalOpen?: number;
  furloughTotalExpired?: number;
  furloughTotalUsed?: number;
  furloughTotalClosed?: number;
  furloughTotalClosedMore?: number;
};
