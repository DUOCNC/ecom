import {DateUtils, NumberUtils, StringUtils} from 'common';
import {DateFormatPattern} from 'common/enums';
import {SuggestedDiscountResponse} from '../responses';
import {EnumValuePricePromotion} from 'modules/order/enums';
import {EntitledMethodEnum} from 'modules/order/enums/Promotion';

export default class ApplyDiscountEntity {
  private priceRuleId: number;
  private title: string;
  private valueType: string;
  private value: number;
  private allocationLimit: number | null;
  private endsDate: Date | null;
  private code: string;
  private invalid: boolean;
  private invalidDescription: string;
  private taxable: boolean;
  private entitledMethod: EntitledMethodEnum;
  private otpEnabled: boolean;
  private manual?: boolean;

  private constructor(
    priceRuleId: number,
    title: string,
    valueType: string,
    value: number,
    allocationLimit: number | null,
    endsDate: Date | null,
    code: string,
    invalid: boolean,
    invalidDescription: string,
    taxable: boolean,
    entitledMethod: EntitledMethodEnum,
    otpEnabled: boolean,
    manual?: boolean,
  ) {
    this.priceRuleId = priceRuleId;
    this.title = title;
    this.valueType = valueType;
    this.value = value;
    this.allocationLimit = allocationLimit;
    this.endsDate = endsDate;
    this.code = code;
    this.taxable = taxable;
    this.invalid = invalid;
    this.invalidDescription = invalidDescription;
    this.entitledMethod = entitledMethod;
    this.otpEnabled = otpEnabled;
    this.manual = manual ?? false;
  }

  static createFromResponse(response: SuggestedDiscountResponse) {
    return new ApplyDiscountEntity(
      response.priceRuleId,
      response.title,
      response.valueType,
      response.value,
      response.allocationLimit,
      response.endsDate,
      response.code,
      response.invalid,
      response.invalidDescription,
      response.taxable,
      response.entitledMethod,
      response.otpEnabled,
      response.manual,
    );
  }
  getCode() {
    return this.code;
  }

  getEntitledMethod() {
    return this.entitledMethod;
  }

  getValueType() {
    return this.valueType;
  }

  getValue() {
    return this.value;
  }

  getTitle() {
    return this.title;
  }

  getPriceRuleId() {
    return this.priceRuleId;
  }
  getAllocationLimit() {
    return this.allocationLimit;
  }

  //tổng giá giảm
  getAmountDiscountValue(variantPrice: number) {
    if (this.getValueType() === EnumValuePricePromotion.PERCENTAGE) {
      return (this.getValue() * variantPrice) / 100;
    }
    if (this.getValueType() === EnumValuePricePromotion.FIXED_AMOUNT) {
      if (this.getValue() >= variantPrice) {
        return variantPrice;
      }
      return this.getValue();
    }
    if (this.getValueType() === EnumValuePricePromotion.FIXED_PRICE) {
      if (this.getValue() >= variantPrice) {
        return 0;
      }
      return variantPrice - this.getValue();
    }
    return this.getValue();
  }

  getAmountDiscount(variantPrice: number) {
    return NumberUtils.formatCurrency(
      this.getAmountDiscountValue(variantPrice),
    );
  }

  //giá sau khi giảm
  getPriceAfterDiscountValue(variantPrice: number) {
    if (this.getValueType() === EnumValuePricePromotion.FIXED_PRICE) {
      if (this.getValue() >= variantPrice) {
        return variantPrice;
      }
      return this.getValue();
    }
    return variantPrice - this.getAmountDiscountValue(variantPrice);
  }

  getPriceAfterDiscount(variantPrice: number) {
    return NumberUtils.formatCurrency(
      this.getPriceAfterDiscountValue(variantPrice),
    );
  }

  getEndDate() {
    return this.endsDate;
  }
  getTaxable() {
    return this.taxable;
  }
  getDueDate(): any {
    if (this.endsDate) {
      return StringUtils.format(
        'HSD: {0}',
        DateUtils.format(this.endsDate, DateFormatPattern.DDMMYYYY),
      );
    }
    if (!this.endsDate) {
      return 'HSD: Không có HSD';
    }
    return 'Không có thời hạn';
  }
  getInvalid() {
    return this.invalid;
  }
  getInvalidDescription() {
    return this.invalidDescription;
  }
  getOtpEnabled() {
    return this.otpEnabled;
  }
  setOtpEnabled(value: boolean) {
    this.otpEnabled = value;
  }
  getManual() {
    return this.manual;
  }
  setManual(value: boolean) {
    this.manual = value;
  }
}
