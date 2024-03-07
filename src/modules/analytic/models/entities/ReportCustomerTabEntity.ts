import {ReportCustomerTab} from 'modules/analytic/enums/ReportConfig';

export default class ReportCustomerTabEntity {
  private readonly code: ReportCustomerTab;
  private readonly title: string;

  constructor(code: ReportCustomerTab, title: string) {
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
