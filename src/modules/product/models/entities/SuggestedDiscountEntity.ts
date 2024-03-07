import {SuggestedDiscountResponse} from '../responses';

export default class SuggestedDiscountEntity {
  private priceRuleId: number;
  private title: string;
  private valueType: string;
  private value: number;
  private allocationLimit: number | null;

  private constructor(
    priceRuleId: number,
    title: string,
    valueType: string,
    value: number,
    allocationLimit: number | null,
  ) {
    this.priceRuleId = priceRuleId;
    this.title = title;
    this.valueType = valueType;
    this.value = value;
    this.allocationLimit = allocationLimit;
  }

  static createFromResponse(response: SuggestedDiscountResponse) {
    return new SuggestedDiscountEntity(
      response.priceRuleId,
      response.title,
      response.valueType,
      response.value,
      response.allocationLimit,
    );
  }

  getValueType() {
    return this.valueType;
  }

  getValue() {
    return this.value;
  }
}
