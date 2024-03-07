import {ReportConversionChart} from 'modules/analytic/enums/ReportConfig';
import {
  CrAssigneePurchaseEntity,
  CrReceptionistPurchaseEntity,
  CrSlotAssignBoughtEntity,
  CrSlotCreatedBoughtEntity,
  CustomerPurchaseEntity,
  NumberSlotAssignEntity,
  NumberSlotBoughtEntity,
  NumberSlotCreatedEntity,
  NumberSlotNotBoughtEntity,
  TrafficAssigneeQuantityEntity,
  TrafficNotBoughtQuantityEntity,
  TrafficReceptionistQuantityEntity,
} from 'modules/analytic/models/entities/ReportConversionChartEntity';

class ReportConversionFactory {
  private constructor() {}

  static getReportConversion(selected: string) {
    switch (selected) {
      case ReportConversionChart.trafficReceptionistQuantity:
        return new TrafficReceptionistQuantityEntity();
      case ReportConversionChart.trafficAssigneeQuantity:
        return new TrafficAssigneeQuantityEntity();
      case ReportConversionChart.trafficNotBoughtQuantity:
        return new TrafficNotBoughtQuantityEntity();
      case ReportConversionChart.numberSlotNotBought:
        return new NumberSlotNotBoughtEntity();
      case ReportConversionChart.numberSlotCreated:
        return new NumberSlotCreatedEntity();
      case ReportConversionChart.numberSlotBought:
        return new NumberSlotBoughtEntity();
      case ReportConversionChart.numberSlotAssign:
        return new NumberSlotAssignEntity();
      case ReportConversionChart.customerPurchase:
        return new CustomerPurchaseEntity();
      case ReportConversionChart.crSlotCreatedBought:
        return new CrSlotCreatedBoughtEntity();
      case ReportConversionChart.crSlotAssignBought:
        return new CrSlotAssignBoughtEntity();
      case ReportConversionChart.crReceptionistPurchase:
        return new CrReceptionistPurchaseEntity();
      case ReportConversionChart.crAssigneePurchase:
        return new CrAssigneePurchaseEntity();
      default:
        return new TrafficReceptionistQuantityEntity();
    }
  }
}

export default ReportConversionFactory;
