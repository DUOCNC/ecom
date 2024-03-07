export default class DayVisitorEntity {
  private dayOfMonth: number;
  private visitor: number;
  private storeId: number;

  constructor(dayOfMonth: number, visitor: number, storeId: number) {
    this.dayOfMonth = dayOfMonth;
    this.visitor = visitor;
    this.storeId = storeId;
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

  setVisitor(newCount: any) {
    this.visitor = newCount;
  }
}
