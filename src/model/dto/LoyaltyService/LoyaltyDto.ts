export interface LoyaltyDto {
  card: string | null;
  customerId: number | null;
  levelChangeTime: string | null;
  loyaltyLevel: string | null;
  loyaltyLevelId: number | null;
  moneyMaintainCurrentLevel: string | null;
  point: number;
  totalMoneySpend: number;
  totalOrderCount: number;
  totalSubtractLockPoint: number;
  remainAmountToLevelUp: number;
}
