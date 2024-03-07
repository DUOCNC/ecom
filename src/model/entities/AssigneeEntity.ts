import {AssigneeResponse} from '../responses';

export default class AssigneeEntity {
  private id: number;
  private code: string;
  private fullName: string;

  private constructor(id: number, code: string, fullName: string) {
    this.id = id;
    this.fullName = fullName;
    this.code = code;
  }

  static clone(assignee: AssigneeEntity) {
    return new AssigneeEntity(assignee.id, assignee.code, assignee.fullName);
  }

  static createFromResponse(response: AssigneeResponse) {
    return new AssigneeEntity(response.id, response.code, response.fullName);
  }

  static createEmpty() {
    return new AssigneeEntity(-1, '', '');
  }

  getId() {
    return this.id.toString();
  }
  getCode() {
    return this.code;
  }

  setCode(code: string) {
    this.code = code;
  }
  setFullName(fullName: string) {
    this.fullName = fullName;
  }

  getObjectRequest() {
    return {
      responsibleStaffCode: this.code,
      responsibleStaff: this.fullName,
    };
  }

  getName() {
    return this.fullName;
  }

  getCodeName() {
    if (this.code && this.fullName) {
      return `${this.code.toUpperCase()} - ${this.fullName}`;
    }
    return '';
  }
}
