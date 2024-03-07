import {AccountJobResponse} from 'model';

export default class AccountJobEntity {
  id: number;
  accountId: number;
  positionId: number;
  position: string | null;
  departmentId: number | null;
  department: string | null;

  constructor(
    id: number,
    accountId: number,
    positionId: number,
    position: string | null,
    departmentId: number | null,
    department: string | null,
  ) {
    this.id = id;
    this.accountId = accountId;
    this.positionId = positionId;
    this.position = position;
    this.departmentId = departmentId;
    this.department = department;
  }

  public static createFromResponse(accountJob: AccountJobResponse) {
    return new AccountJobEntity(
      accountJob.id,
      accountJob.accountId,
      accountJob.positionId,
      accountJob.position,
      accountJob.departmentId,
      accountJob.department,
    );
  }

  getKey() {
    if (this.id) {
      return this.id.toString();
    }
    return '';
  }

  getJobId() {
    return this.positionId;
  }

  getDepartment() {
    if (this.department == null) {
      return 'Không có phòng ban';
    }
    return this.department.trim();
  }

  getPosition() {
    if (this.position == null) {
      return 'Không có phòng ban';
    }
    return this.position.trim();
  }
}
