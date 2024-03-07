export interface ReportConversionChartResponse {
  trafficReceptionistQuantity: number;
  trafficAssigneeQuantity: number;
  customerPurchase: number;
  crAssigneePurchase: number;
  crReceptionistPurchase: number;
  trafficNotBoughtQuantity: number;
  numberSlotCreated: number;
  numberSlotAssign: number;
  numberSlotBought: number;
  numberSlotNotBought: number;
  crSlotCreatedBought: number;
  crSlotAssignBought: number;
  time: string;
}
