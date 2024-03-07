import {StringUtils} from 'common';
import {DateFormatPattern} from 'common/enums';
import {ReportCustomerTab} from 'modules/analytic/enums/ReportConfig';
import moment from 'moment';
import NumberUtils from 'utils/NumberUtils';
import {ReportQueryRequest} from '../requests';
import {CustomerVisitorResponse} from '../responses';

export default class CustomerVisitorEntity {
  private from: string;
  private to: string;
  private posLocationNames: string[] | undefined;
  private customerVisitorData: CustomerVisitorItemEntity;
  private readonly today = moment(new Date()).format(
    DateFormatPattern.YYYYMMDD,
  );
  constructor() {
    this.from = this.today;
    this.to = this.today;
    this.posLocationNames = [];
    this.customerVisitorData = new CustomerVisitorItemEntity();
  }

  static createWithParam(request: ReportQueryRequest) {
    let customerVisitor = new CustomerVisitorEntity();
    customerVisitor.from = moment(request.from_date).format(
      DateFormatPattern.YYYYMMDD,
    );
    customerVisitor.to = moment(request.to_date).format(
      DateFormatPattern.YYYYMMDD,
    );
    customerVisitor.posLocationNames = [request.pos_location_name ?? ''];
    return customerVisitor;
  }

  setCustomerVisitor(data: Array<CustomerVisitorResponse>) {
    let customerVisitorItemEntity = new CustomerVisitorItemEntity();
    customerVisitorItemEntity.setCustomerVisitorItemEntity(data);
    this.customerVisitorData = customerVisitorItemEntity;
  }

  getCustomerVisitor() {
    return this.customerVisitorData;
  }

  getQuery(source?: ReportCustomerTab) {
    source = source ?? ReportCustomerTab.receptionist;
    let query = StringUtils.format(
      'from={0}&to={1}&source={2}',
      this.from,
      this.to,
      source,
    );
    if (this.posLocationNames) {
      query = StringUtils.format(
        '{0}&posLocationNames={1}',
        query,
        this.posLocationNames,
      );
    }

    return query;
  }
}

export class CustomerVisitorItemEntity {
  private departmentLv2: string;
  private posLocationName: string;
  private value: number;

  constructor() {
    this.departmentLv2 = '';
    this.posLocationName = '';
    this.value = 0;
  }

  private setDepartmentLv2(departmentLv2: string | null) {
    if (departmentLv2) {
      return (this.departmentLv2 = departmentLv2);
    }
  }

  private setPosLocationName(posLocationName: string | null) {
    if (posLocationName) {
      return (this.posLocationName = posLocationName);
    }
  }

  private setValue(value: number | null) {
    if (value) {
      this.value = value;
    }
  }

  static create() {
    return new CustomerVisitorItemEntity();
  }

  setCustomerVisitorItemEntity(data: Array<CustomerVisitorResponse>) {
    if (data && data[0] && data[0].posLocationName) {
      this.setDepartmentLv2(data[0].departmentLv2);
      this.setPosLocationName(data[0].posLocationName);
      this.setValue(data[0].value);
    }
  }

  getDepartmentLv2() {
    return this.departmentLv2;
  }
  getPosLocationName() {
    return this.posLocationName;
  }
  getValue() {
    return this.value;
  }
  getTextValue() {
    return NumberUtils.formatNumber(this.value);
  }
}
