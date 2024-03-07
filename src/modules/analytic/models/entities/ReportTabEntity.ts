export default class ReportTabEntity {
  private readonly code: string;
  private readonly title: string;
  private readonly key: string;

  constructor(code: string, title: string, key: string) {
    this.code = code;
    this.title = title;
    this.key = key;
  }

  getCode() {
    return this.code;
  }
  getTitle() {
    return this.title;
  }
  getKey() {
    return this.key;
  }
}
