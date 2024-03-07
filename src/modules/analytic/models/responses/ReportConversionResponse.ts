export interface ReportConversionResponse {
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
  trafficReceptionistQuantityGrowthRatio: number;
  trafficAssigneeQuantityGrowthRatio: number;
  customerPurchaseGrowthRatio: number;
  crAssigneePurchaseGrowthRatio: number;
  crReceptionistPurchaseGrowthRatio: number;
  trafficNotBoughtQuantityGrowthRatio: number;
  numberSlotCreatedGrowthRatio: number;
  numberSlotAssignGrowthRatio: number;
  numberSlotBoughtGrowthRatio: number;
  numberSlotNotBoughtGrowthRatio: number;
  crSlotCreatedBoughtGrowthRatio: number;
  crSlotAssignBoughtGrowthRatio: number;
}
