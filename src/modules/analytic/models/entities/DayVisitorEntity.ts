export default class DayVisitorEntity {
  private dayOfMonth: number;
  private visitor: number;
  private storeId: number;
  private assigneeName: string;
  private assigneeCode: string;

  constructor(
    dayOfMonth: number,
    visitor: number,
    storeId: number,
    assigneeName: string,
    assigneeCode: string,
  ) {
    this.dayOfMonth = dayOfMonth;
    this.visitor = visitor;
    this.storeId = storeId;
    this.assigneeName = assigneeName;
    this.assigneeCode = assigneeCode;
  }

  getDayOfMonth() {
    return this.dayOfMonth;
  }

  getVisitor() {
    return this.visitor;
  }

  getStoreId() {
    return this.storeId;
  }

  getAssigneeCode() {
    return this.assigneeCode;
  }

  getAssigneeName() {
    return this.assigneeName;
  }
}
