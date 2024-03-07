import {ReportConversionTab} from 'modules/analytic/enums';

export default class ReportConversionTabEntity {
  private readonly code: ReportConversionTab;
  private readonly title: string;

  constructor(code: ReportConversionTab, title: string) {
    this.code = code;
    this.title = title;
  }

  getCode() {
    return this.code;
  }
  getTitle() {
    return this.title;
  }
}
