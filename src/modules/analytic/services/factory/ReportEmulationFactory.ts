import {ReportTabButton} from 'modules/analytic/enums';
import {
  ReportEmulationAverageASMEntity,
  ReportEmulationAverageEntity,
  ReportEmulationAveragePOSEntity, ReportEmulationCRVASMEntity, ReportEmulationCRVEntity, ReportEmulationCRVPOSEntity,
  ReportEmulationCustomerASMEntity,
  ReportEmulationCustomerEntity,
  ReportEmulationCustomerPOSEntity,
  ReportEmulationRevenueASMEntity,
  ReportEmulationRevenueEntity,
  ReportEmulationRevenuePOSEntity,
} from 'modules/analytic/models/entities/ReportEmulationEntity';
class ReportEmulationFactory {
  private constructor() {}

  static getReportEmulation(activeTab: string) {
    switch (activeTab) {
      case ReportTabButton.customer:
        return new ReportEmulationCustomerEntity();
      case ReportTabButton.average:
        return new ReportEmulationAverageEntity();
      case ReportTabButton.crv:
        return new ReportEmulationCRVEntity();
      default:
        return new ReportEmulationRevenueEntity();
    }
  }

  static getReportEmulationASM(activeTab: string) {
    switch (activeTab) {
      case ReportTabButton.customer:
        return new ReportEmulationCustomerASMEntity();
      case ReportTabButton.average:
        return new ReportEmulationAverageASMEntity();
      case ReportTabButton.crv:
        return new ReportEmulationCRVASMEntity();
      default:
        return new ReportEmulationRevenueASMEntity();
    }
  }

  static getReportEmulationPOS(activeTab: string) {
    switch (activeTab) {
      case ReportTabButton.customer:
        return new ReportEmulationCustomerPOSEntity();
      case ReportTabButton.average:
        return new ReportEmulationAveragePOSEntity();
      case ReportTabButton.crv:
        return new ReportEmulationCRVPOSEntity();
      default:
        return new ReportEmulationRevenuePOSEntity();
    }
  }
}

export default ReportEmulationFactory;
