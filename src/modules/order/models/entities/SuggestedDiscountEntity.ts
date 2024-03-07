import {DateUtils, NumberUtils, StringUtils} from 'common';
import {DateFormatPattern} from 'common/enums';
import {EnumValuePricePromotion} from 'modules/order/enums';
import moment from 'moment';
import {SuggestedDiscountResponse} from '../responses';
import ApplyDiscountEntity from './ApplyDiscountEntity';
import {EntitledMethodEnum} from 'modules/order/enums/Promotion';

export default class SuggestedDiscountEntity {
  private priceRuleId: number;
  private title: string;
  private valueType: string;
  private value: number;
  private allocationLimit: number | null;
  private endsDate: Date | null;
  private taxable: boolean;
  private code: string | null;
  private invalid: boolean;
  private invalidDescription: string | null;
  private entitledMethod: EntitledMethodEnum;
  private otpEnabled: boolean;
  private manual: boolean = false;

  private constructor(
    priceRuleId: number,
    title: string,
    valueType: string,
    value: number,
    allocationLimit: number | null,
    endsDate: Date | null,
    taxable: boolean,
    code: string | null,
    invalid: boolean,
    invalidDescription: string | null,
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
    this.taxable = taxable;
    this.code = code;
    this.invalid = invalid;
    this.invalidDescription = invalidDescription;
    this.entitledMethod = entitledMethod;
    this.otpEnabled = otpEnabled;
    this.manual = manual ?? false;
  }

  static createFromResponse(response: SuggestedDiscountResponse) {
    return new SuggestedDiscountEntity(
      response.priceRuleId,
      response.title,
      response.valueType,
      response.value,
      response.allocationLimit,
      response.endsDate,
      response.taxable,
      response.code,
      response.invalid,
      response.invalidDescription,
      response.entitledMethod,
      response.otpEnabled,
      response.manual,
    );
  }

  static createFromApplyDiscount(applyDiscount: ApplyDiscountEntity) {
    return new SuggestedDiscountEntity(
      applyDiscount.getPriceRuleId(),
      applyDiscount.getTitle(),
      applyDiscount.getValueType(),
      applyDiscount.getValue(),
      applyDiscount.getAllocationLimit(),
      applyDiscount.getEndDate(),
      applyDiscount.getTaxable(),
      applyDiscount.getCode(),
      applyDiscount.getInvalid(),
      applyDiscount.getInvalidDescription(),
      applyDiscount.getEntitledMethod(),
      applyDiscount.getOtpEnabled(),
      applyDiscount.getManual(),
    );
  }

  getCode() {
    return this.code;
  }

  getEntitledMethod() {
    return this.entitledMethod;
  }

  getInvalid() {
    return this.invalid;
  }
  getInvalidDescription() {
    return this.invalidDescription;
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

  getTaxable() {
    return this.taxable;
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

  getDueDate() {
    if (this.checkDueDate()) {
      return this.checkDueDate();
    }
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

  checkDueDate() {
    if (this.endsDate) {
      const days = moment(this.endsDate).diff(moment(new Date()), 'days') + 1;
      if (days < 4) {
        return StringUtils.format('HSD: còn {0} ngày', days);
      }
      return null;
    }
    return null;
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
