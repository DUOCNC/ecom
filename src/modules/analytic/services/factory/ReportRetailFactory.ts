import {ReportTabButton} from 'modules/analytic/enums';
import {
  ReportRetailAverageEntity,
  ReportRetailCustomerEntity,
  ReportRetailRevenueEntity,
} from 'modules/analytic/models/entities/ReportRetailEntity';

class ReportRetailFactory {
  private constructor() {}

  static getReportRetail(activeTab: string) {
    switch (activeTab) {
      case ReportTabButton.customer:
        return new ReportRetailCustomerEntity();
      case ReportTabButton.average:
        return new ReportRetailAverageEntity();
      default:
        return new ReportRetailRevenueEntity();
    }
  }
}

export default ReportRetailFactory;
