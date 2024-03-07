import NumberUtils from 'utils/NumberUtils';

export class ReportAssigneeEntity {
  private name: string;
  private code: string;
  private customers: number;
  private customersReceived: number;
  constructor(
    name: string,
    code: string,
    customers: number = 0,
    customersReceived: number = 0,
  ) {
    this.name = name;
    this.code = code;
    this.customers = customers;
    this.customersReceived = customersReceived;
  }

  static create(
    name: string,
    code: string,
    customers: number = 0,
    customersReceived: number = 0,
  ) {
    return new ReportAssigneeEntity(name, code, customers, customersReceived);
  }

  setReportAssignee() {}

  getName() {
    if (!this.name) {
      return this.code;
    }
    return this.name;
  }

  getCode() {
    return this.code;
  }

  getCustomerValue() {
    return this.customers;
  }

  getCustomer() {
    return NumberUtils.formatNumber(this.customers);
  }

  getCustomerReceivedValue() {
    return this.customersReceived;
  }

  getCustomersReceived() {
    return NumberUtils.formatNumber(this.customersReceived);
  }
}
