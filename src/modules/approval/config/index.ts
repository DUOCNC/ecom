enum EnumImportStatus {
  error = 'ERROR',
  success = 'SUCCESS',
  done = 'DONE',
  processing = 'PROCESSING',
  removed = 'REMOVED',
}

enum EnumUploadStatus {
  error = 'error',
  success = 'success',
  done = 'done',
  uploading = 'uploading',
  removed = 'removed',
}

enum EnumJobStatus {
  finish = 'FINISH',
  error = 'ERROR',
  success = 'SUCCESS',
  processing = 'PROCESSING',
}

enum EnumStoreMienBac {
  PROD = 338,
  UAT = 448,
  DEV = 448,
}
export const storeMienBac = {
  DEV: EnumStoreMienBac.DEV,
  UAT: EnumStoreMienBac.UAT,
  PROD: EnumStoreMienBac.PROD,
};

enum EnumStoreMienTrung {
  PROD = 19,
  UAT = 365,
  DEV = 365,
}

export const storeMienTrung = {
  DEV: EnumStoreMienTrung.DEV,
  UAT: EnumStoreMienTrung.UAT,
  PROD: EnumStoreMienTrung.PROD,
};

enum EnumStoreMienNam {
  PROD = 386,
  UAT = 449,
  DEV = 449,
}

export const storeMienNam = {
  DEV: EnumStoreMienNam.DEV,
  UAT: EnumStoreMienNam.UAT,
  PROD: EnumStoreMienNam.PROD,
};

enum EnumStoreOnline {
  PROD = 385,
  UAT = 450,
  DEV = 450,
}

export const storeOnline = {
  DEV: EnumStoreOnline.DEV,
  UAT: EnumStoreOnline.UAT,
  PROD: EnumStoreOnline.PROD,
};

enum EnumOptionValueOrPercent {
  SL = 'SL',
  PERCENT = '%',
}

enum EnumOptionDepositAmount {
  VND = 'VND',
  PERCENT = '%',
  DEFAULT = '',
}

enum EnumGiftType {
  BY_ITEM = 'gift_by_item',
  BY_ORDER = 'gift_by_order',
}

enum EnumStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

enum EnumBusinessUnit {
  ecommerce = 'ecommerce',
  global = 'global',
  online = 'online',
  offline = 'offline',
}

enum EnumOTPConfirm {
  CONFIRM = 'confirm',
  UN_CONFIRM = 'un_confirm',
  NO_CONFIRM = 'no_confirm',
}

enum EnumGrantedLocationSelection {
  ALL = 'ALL',
  SPEC = 'SPEC',
}

enum EnumTypeHrm {
  CHECKOUTS = 'checkin-outs',
  ABSENCE = 'absences',
  LEAVES = 'leaves',
  SHIFTCHANGE = 'shift-changes',
  OVERTIME = 'overtimes',
  ONSITE = 'missions',
  SHIFT_MORES = 'shift-mores',
  SHIFT_REGISTER = 'shift-registers',
  RESIGNATION = 'resigns',
  REGULATION = 'regulations',
}

const EnumTxtTypeHrm: Partial<Record<EnumTypeHrm, string>> = {
  [EnumTypeHrm.LEAVES]: 'Đơn xin nghỉ',
  [EnumTypeHrm.ABSENCE]: 'Đơn vắng mặt',
  [EnumTypeHrm.CHECKOUTS]: 'Đơn checkin/out',
  [EnumTypeHrm.OVERTIME]: 'Đơn làm thêm',
  [EnumTypeHrm.SHIFTCHANGE]: 'Đơn đổi ca',
  [EnumTypeHrm.SHIFT_MORES]: 'Đơn tăng ca',
  // [EnumTypeHrm.SHIFT_REGISTER]: "Đơn đăng ký ca",
  [EnumTypeHrm.ONSITE]: 'Đơn công tác',
  [EnumTypeHrm.RESIGNATION]: 'Đơn thôi việc',
  // [EnumTypeHrm.REGULATION]: "Đơn làm theo chế độ",
};

enum TypeActionApplication {
  APPROVAL = 'approval',
  REJECT = 'reject',
}

enum EnumLocation {
  /**
   * Cửa hàng & kho
   */
  store = 'store',
  /**
   * Kho online
   */
  ware_house = 'ware_house',
  /**
   * Kho phân phối
   */
  distribution_center = 'distribution_center',
  /**
   * Kho dự trữ
   */
  stockpile = 'stockpile',
  disposal_warehouse = 'disposal_warehouse',
  hub_store = 'hub_store',
}

enum ResearchAndDevelopmentManagerPositionId {
  DEV = 111,
  UAT = 111,
  PROD = 111,
  DEFAULT = 111,
}

type TabLabel = 'Tất cả' | 'Chờ duyệt' | 'Đã duyệt' | 'Không duyệt';

const tabs: {key: string; title: TabLabel}[] = [
  {
    key: 'all',
    title: 'Tất cả',
  },
  {
    key: 'pendingApproval',
    title: 'Chờ duyệt',
  },
  {
    key: 'approved',
    title: 'Đã duyệt',
  },
  {
    key: 'rejected',
    title: 'Không duyệt',
  },
];

const getRequestType = (object: string) => {
  switch (object) {
    case 'Đơn xin nghỉ':
      return 'leaves';
    case 'Đơn vắng mặt':
      return 'absences';
    case 'Đơn checkin/out':
      return 'checkin_outs';
    case 'Đơn đổi ca':
      return 'shift_changes';
    case 'Đơn tăng ca':
      return 'shift_mores';
    case 'Đơn làm thêm':
      return 'overtimes';
    case 'Đơn đăng ký ca':
      return 'shift_registers';
    case 'Đơn công tác':
      return 'missions';
    case 'Đơn thôi việc':
      return 'resigns';
    default:
      throw new Error('app sub object is invalid!');
  }
};

const timeShifts = [
  {
    value: 'Nửa ca đầu',
    label: 'Nửa ca đầu',
  },
  {
    value: 'Nửa ca sau',
    label: 'Nửa ca sau',
  },
];

export {
  EnumUploadStatus,
  EnumImportStatus,
  EnumJobStatus,
  EnumOptionValueOrPercent,
  EnumStoreMienBac,
  EnumStoreMienTrung,
  EnumStoreMienNam,
  EnumStoreOnline,
  EnumGiftType,
  EnumOptionDepositAmount,
  EnumStatus,
  EnumBusinessUnit,
  EnumOTPConfirm,
  EnumGrantedLocationSelection,
  EnumLocation,
  ResearchAndDevelopmentManagerPositionId,
  EnumTypeHrm,
  EnumTxtTypeHrm,
  TypeActionApplication,
  tabs,
  getRequestType,
  timeShifts,
};
