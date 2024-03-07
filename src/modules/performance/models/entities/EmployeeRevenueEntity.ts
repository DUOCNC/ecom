import {FormatDatePattern} from 'utils/DateUtils';
import {EmployeeRevenueResponse} from '../responses';
import {EmployeeRevenue} from '../responses/EmployeeRevenueResponse';
import moment from 'moment';

export default class EmployeeRankEntity {
  private scope: 'all' | 'rsm' | 'store' | '';
  private viewDate: string;
  private employeeCode: string;
  private employeeRevenues: Array<EmployeeRevenue> | null;
  private onTop: boolean = false;
  constructor(
    scope: 'all' | 'rsm' | 'store' | '',
    viewDate: string,
    employeeCode: string,
    employeeRevenues: Array<EmployeeRevenue> | null,
    onTop: boolean,
  ) {
    this.scope = scope;
    this.viewDate = viewDate;
    this.employeeCode = employeeCode;
    this.employeeRevenues = employeeRevenues;
    this.onTop = onTop;
  }

  static createEmpty() {
    return new EmployeeRankEntity(
      '',
      moment().format(FormatDatePattern['YYYY/MM/DD']),
      '',
      null,
      false,
    );
  }

  static fromResponse(
    scope: 'all' | 'rsm' | 'store' | '',
    viewDate: string,
    employeeCode: string,
    res: EmployeeRevenueResponse,
  ) {
    if (!res.data) {
      return new EmployeeRankEntity('', viewDate, employeeCode, null, false);
    }
    if (scope === 'all' || scope === 'rsm') {
      const employeeRevenues = res.data.slice(0, 10);
      if (
        employeeRevenues.findIndex(
          (e: EmployeeRankEntity) =>
            e.employeeCode.toLocaleLowerCase() ===
            employeeCode.toLocaleLowerCase(),
        ) !== -1
      ) {
        return new EmployeeRankEntity(
          scope,
          viewDate,
          employeeCode,
          res.data,
          true,
        );
      }
    }
    const employeeRevenues = res.data.slice(0, 3);
    if (
      employeeRevenues.findIndex(
        (e: EmployeeRankEntity) =>
          e.employeeCode.toLocaleLowerCase() ===
          employeeCode.toLocaleLowerCase(),
      ) !== -1
    ) {
      return new EmployeeRankEntity(
        scope,
        viewDate,
        employeeCode,
        res.data,
        true,
      );
    }
    return new EmployeeRankEntity('', viewDate, employeeCode, null, false);
  }

  getContent() {
    let content = [
      'Hãy cố gắng một chút nữa',
      ' để ghi danh mình vào top seller',
      ' nào!',
    ];
    if (this.scope === 'all' && this.employeeRevenues) {
      if (this.onTop) {
        content = [
          'Chúc mừng bạn đã lọt top',
          ' 10 CGTV có doanh thu cao nhất',
          ' toàn hệ thống.',
        ];
      }
    }
    if (this.scope === 'rsm' && this.employeeRevenues) {
      if (this.onTop) {
        content = [
          'Chúc mừng bạn đã lọt top',
          ' 10 CGTV có doanh thu cao nhất',
          ' toàn vùng.',
        ];
      }
    }
    if (this.scope === 'store' && this.employeeRevenues) {
      if (this.onTop) {
        content = [
          'Chúc mừng bạn đã lọt top',
          ' 3 CGTV có doanh thu cao nhất',
          ' cửa hàng.',
        ];
      }
    }
    return content;
  }

  getEmployeeCode() {
    return this.employeeCode;
  }

  getViewDate() {
    return this.viewDate;
  }

  getEmployeeRevenues() {
    return this.employeeRevenues;
  }

  getScope() {
    return this.scope;
  }

  getOnTop() {
    return this.onTop;
  }
}
