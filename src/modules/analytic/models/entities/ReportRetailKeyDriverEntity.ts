export default class ReportRetailKeyDriverEntity {
  private readonly id: number;
  private readonly title: string;

  constructor(value: number, title: string) {
    this.id = value;
    this.title = title;
  }

  getValue() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
}
