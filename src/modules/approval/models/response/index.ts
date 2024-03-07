import {EnumTypeHrm} from '../../config';
import {Moment} from 'moment';

export interface HrmApplications {
  data: HrmApplications;
  personnelName: string;
  personnelCode: string;
  departmentId: string;
  positionId: string;
  appApprovalStatus: 'Đã duyệt' | 'Không duyệt' | 'Chờ duyệt';
  appApprovalCurrentId: string;
  approvedCurrentJobTitle: string;
  jobTitle: string;
  approvedCurrentPositionId: string;
  approvedCurrentDepartmentId: string;
  approvedJobTitle: string;
  approvedPositionId: string;
  approvedDepartmentId: string | null;
  reason: string;
  desc: string;
  createdById: string;
  dateCreated: string;
  dateStart: string;
  dateEnd: string;
  timeCreated: string | null;
  date: string | null;
  dateApprove: string | null;
  timeApprove: string | null;
  commentApproved: string;
  appApprovalIds: string;
  hasSalary: string | null;
  exportKey: string | null;
  dayNumber: number;
  reasonHourNumber: number;
  dayNumberShift: number;
  files: Files[];
  // Onsite Requests
  vehicle?: string;
  dateFrom?: string;
  dateTo?: string;
  timeStart?: string;
  timeEnd?: string;
  numberDay?: number;
  address?: string;
  hotelAddress?: string;
  travelBy?: string;
  content?: string;
  isWorkAbroad?: string | boolean;
  totalMoney?: number;
  vehicleId?: string;
  surcharges?: Surcharge[];
  appSubObject: null;
  id: number;
  inoutinfo: Inoutinfo[] | null;
  detail: HrmDetail[];
  hasTimekeepingCalculate: boolean;
  dateOfApplication?: string;
  reasonId?: string;
  appSubObjectCode?: string;
  isChange?: string;
}

export interface Inoutinfo {
  id: string;
  appApprovalStatus: string;
  createdById: string;
  date: string;
  dateCreated: string;
  dateUpdated: string;
  departmentId: string;
  jobTitle: string;
  personnelCode: string;
  personnelId: string;
  personnelName: string;
  positionId: string;
  postId: string;
  reason: string;
  status: string;
  time: string;
  updatedById: string;
  userId: string;
  reasonName: string;
}

export interface HrmDetail {
  id: number;
  appApprovalStatus: 'WAITING' | 'Đã duyệt' | 'Không duyệt' | 'Chờ duyệt';
  createdById: number;
  date: null;
  dateCreated: string;
  dateEnd: string;
  dateStart: string;
  dateUpdated: string;
  departmentId: null;
  end: string;
  jobTitle: string | null;
  personnelCode: string | null;
  personnelId: number;
  personnelName: string | null;
  positionId: number | null;
  postId: number;
  reason: string;
  reasonHourNumber: number;
  reasonName: string | null;
  shiftOther: string | null;
  start: string;
  status: number;
  time: string;
  timeEnd: string;
  timeStart: string;
  updatedById: number;
  userId: number;

  endTime: string;
  hours: string;
  startTime: string;
  timeAdd: string;

  dateChange: string;
  dateOther: string;
  isChange: 'OTHER' | 'PRIVATE';
  shiftChange: string;
  dayNumberShift: number;

  shiftsStart: string;
  shiftsEnd: string;

  isAttendance: string;
  type: string;
  gpsLocationIds: string;
  dateOfApplication?: moment.Moment | null | string;

  dateFrom: string;
  dateTo: string;
  partnerId?: string;
  shiftIds?: string;
  timeTotal?: string;

  key: React.Key;
  codeShiftother: string;
  codeShiftchange: string;
}

interface Files {
  filename: string;
  path: string;
  title: string;
}

export type ParamHrmList = {
  s?: string;
  tagIds?: string;
  appApprovalStatus?: string;
  appApprovalCurrentId?: string;
  departmentId?: string;
  appSubObject?: string;
  appApprovalIds?: string;
  personnelCode?: string;
  createdById?: string;
  userId?: string;
  type?: EnumTypeHrm;
  // Paging
  total?: number;
  limit?: number;
  page?: number;
  pageSize?: number;
};

export interface HrmList {
  id: number;
  personnelName: string;
  personnelCode: string;
  departmentId: string;
  positionId: string;
  jobTitle: string;
  appApprovalStatus: 'Đã duyệt' | 'Không duyệt' | 'Chờ duyệt';
  appApprovalCurrentId: string;
  approvedCurrentJobTitle: string;
  approvedCurrentPositionId: string;
  approvedCurrentDepartmentId: string;
  approvedJobTitle: string;
  approvedPositionId: string;
  approvedDepartmentId: null | string;
  reason: null | string;
  desc: string;
  createdById: string;
  dateCreated: string;
  dateStart: string;
  dateEnd: string;
  timeCreated: string;
  date: null | string;
  dateApprove: string;
  timeApprove: string;
  commentApproved: string;
  appApprovalIds: string;
  hasSalary: string;
  exportKey: string;
  dayNumber: number;
  reasonHourNumber: number;
  dayNumberShift: number;
  files: Files[];
  appSubObject: string;
  appSubObjectCode: string;
  isChange: 'OTHER' | 'PRIVATE';
  appSubObjectId: number;
}

export interface TimekeepingLocations {
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  radius: number;
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface ReasonHrm {
  applicationTypeId: number;
  description: string;
  hasSalary: boolean;
  hasTimekeeping: boolean;
  hasTimekeepingCalculate: boolean;
  name: string;
}

export interface UserHrm {
  code: string;
  fullName: string;
  id: string;
  name?: string;
  ID?: string;
}
export interface IDetailCreateHrm {
  key: React.Key;
  //
  date_start?: moment.Moment | null | string;
  date_end?: moment.Moment | null | string;
  shifts_start?: string | null;
  shifts_end?: string | null;
  time_start?: Moment | string;
  time_end?: Moment | string;
  date?: moment.Moment | null | string;
  time?: moment.Moment | null | string;
  reason?: string;
  has_timekeeping_calculate?: boolean;
  start_time?: moment.Moment | null | string;
  end_time?: moment.Moment | null | string;
  is_attendance?: string;
  type?: string;
  note?: string;
  gps_location_ids?: string;
  date_of_application?: moment.Moment | null | string;
  shift_ids?: string[] | string;
  // Shift changes
  date_change?: Moment | string;
  shift_change?: string;
  date_other?: Moment | string;
  shift_other?: string | string[];
  partner_id?: string;
  shift_current?: string;
  // Onsite
  date_from?: Moment | string;
  date_to?: Moment | string;
  // Resigns
  date_created?: Moment | string; // date when request is submitted
}

export interface IBodyRequestCreateHrm {
  personnel_id: number | string;
  detail?: IDetailCreateHrm[];
  //
  id: string;
  personnel_name?: string;
  personnel_code?: string;
  department_id?: string;
  position_id?: string;
  job_title?: string;
  app_approval_status?: string;
  app_approval_current_id?: string;
  approved_current_job_title?: string;
  approved_current_position_id?: string;
  approved_current_department_id?: string;
  approved_job_title?: string;
  approved_position_id?: string;
  reason?: string;
  desc?: string;
  created_by_id?: string; // "Hồ Minh Trường";
  date_created?: string;
  time_created?: string;
  date?: string;
  date_of_application?: string;
  date_approve?: string;
  time_approve?: string;
  comment_approved?: string;
  app_approval_ids?: string;
  app_sub_object_id?: number;
  app_sub_object?: string; // "Đơn xin nghỉ";
  is_change?: string; // "OTHER";
  has_timekeeping_calculate?: boolean;
  files?: [];

  // Onsite Requests
  has_salary?: string;
  vehicle_id?: string;
  date_from?: string;
  date_to?: string;
  time_start?: string;
  time_end?: string;
  number_day?: number;
  address?: string;
  hotel_address?: string;
  travel_by?: string;
  content?: string;
  is_work_abroad?: string;
  total_money?: number;
  surcharges?: Surcharge[];

  // Resigns
  reason_id?: string;
}

export type Surcharge = {
  key: React.Key;
  name?: string;
  money?: number | string;
  typeId?: string;
  type?: string;
};

export type SystemShift = {
  code: string;
  title: string;
  timeStart: string;
  timeEnd: string;
  timeBreakStart: string;
  timeBreakEnd: string;
  timeStartInterval: string;
  timeEndInterval: string;
  totalHour: string;
  numberWork: string;
  active: string;
  typeChangeApply: string;
  timeChange: string;
  timeChangeBefore: string;
  isOverDay: string;
  isLateSoonBreak: string;
  workforceBreaktime: string;
  requiredCheckBreak: string;
  timeStartIntervalBreak: string;
  timeEndIntervalBreak: string;
  isShiftHoliday: string;
  isCheckinoutAuto: string;
  isCheckoutAuto: string;
  jsonAutoShifts: string;
  isMultipleInterval: string;
  gpsLocationIds: string;
  applyObject: string;
  isTimechangeLeave: string;
  id: string;
};

export type EmployeeShift = {
  id: number;
  name: string;
  code: string;
  date: string;
  start: string;
  end: string;
  timeStart: string;
  timeEnd: string;
};
