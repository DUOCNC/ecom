export interface LoyaltyResponse {
  id: number;
  customerId: number;
  loyaltyLevelId: number;
  loyaltyLevel: string;
  point: number;
  totalOrderCount: number;
  totalMoneySpend: number;
  totalSubtractLockPoint: number | null;
  grossSale: number;
  levelChangeTime: string;
  moneyMaintainCurrentLevel: number;
  remainAmountToLevelUp: number | null;
  moneySpendInYear: number;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  card: any | null;
}
