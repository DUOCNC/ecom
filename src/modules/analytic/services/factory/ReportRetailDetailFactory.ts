import {ReportTabButton} from 'modules/analytic/enums';
import {
  ReportRetailAverageDetailEntity,
  ReportRetailCustomerDetailEntity,
  ReportRetailRevenueDetailEntity,
} from 'modules/analytic/models/entities/ReportRetailEntity';

class ReportRetailDetailFactory {
  private constructor() {}

  static getReportRetailDetail(activeTab: string) {
    switch (activeTab) {
      case ReportTabButton.customer:
        return new ReportRetailCustomerDetailEntity();
      case ReportTabButton.average:
        return new ReportRetailAverageDetailEntity();
      default:
        return new ReportRetailRevenueDetailEntity();
    }
  }
}

export default ReportRetailDetailFactory;
