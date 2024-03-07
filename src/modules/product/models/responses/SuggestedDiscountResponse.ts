export interface SuggestedDiscountResponse {
  priceRuleId: number;
  title: string;
  valueType: string;
  value: number;
  allocationLimit: number | null;
}
