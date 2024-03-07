import NumberUtils from 'utils/NumberUtils';
import {ReportCustomerDetailResponse} from '../responses';

export class ReportCustomerEmployeeEntity {
  private totalValue: number = 0;
  constructor(totalValue: number) {
    this.totalValue = totalValue;
  }

  setReportCustomerDetailEntity(customerRes: ReportCustomerDetailResponse) {
    this.setTotalValue(customerRes.totalValue);
  }

  private setTotalValue(value: number | null) {
    if (value) {
      this.totalValue = value;
    }
  }
  getTotalValue() {
    return NumberUtils.formatNumber(this.totalValue);
  }
}
