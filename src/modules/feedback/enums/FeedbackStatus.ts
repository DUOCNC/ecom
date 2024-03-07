export enum FeedbackStatus {
  BOUGHT = 'BOUGHT', //Đã mua
  NOT_BUY = 'NOT_BOUGHT', //Không mua
  PENDING = 'PENDING', //Đợi tiếp nhận
  IN_PROGRESS = 'IN_PROGRESS', //Đang tiếp
  EMPTY_ADVISOR = 'EMPTY_ADVISOR', //Chưa có CGTV
  DELETED = 'DELETED', //Chưa có CGTV
  ALL = 'ALL', //Chưa có CGTV
}
export enum FeedbackActionUpdateStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  SELF_ASSIGNED = 'SELF_ASSIGNED',
  ASSIGNED_BY = 'ASSIGNED_BY',
  BOUGHT = 'BOUGHT',
  NOT_BUY = 'NOT_BOUGHT',
}

export enum FeedbackQuestion {
  ADULT = 5,
  CHILDREN = 6,
  REASON = 7,
  REASON_DETAIL = 8,
  BEHAVIOR_NOT_BUY = 9, // var
}
