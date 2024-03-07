import {NumberUtils, StringUtils} from 'common';
import {EnumValuePricePromotion} from 'modules/order/enums';
import {SuggestedDiscountEntity} from '.';
import {DiscountItemResponse} from '../responses';
import ApplyDiscountEntity from './ApplyDiscountEntity';
import {EntitledMethodEnum} from 'modules/order/enums/Promotion';

export default class DiscountItemEntity {
  private keyword: string;
  private searchType: string;
  private originalUnitPrice: number;
  private productId: number;
  private quantity: number;
  private sku: string;
  private variantId: number;
  private appliedDiscount: ApplyDiscountEntity | null;
  private taxable: boolean;
  private type: string | null;
  private suggestedDiscounts: Array<SuggestedDiscountEntity>;

  private constructor(
    keyword: string,
    searchType: string,
    originalUnitPrice: number,
    productId: number,
    quantity: number,
    sku: string,
    variantId: number,
    appliedDiscount: ApplyDiscountEntity | null,
    taxable: boolean,
    type: string | null,
    suggestedDiscounts: Array<SuggestedDiscountEntity>,
  ) {
    this.keyword = keyword;
    this.searchType = searchType;
    this.originalUnitPrice = originalUnitPrice;
    this.productId = productId;
    this.quantity = quantity;
    this.sku = sku;
    this.variantId = variantId;
    this.appliedDiscount = appliedDiscount;
    this.taxable = taxable;
    this.type = type;
    this.suggestedDiscounts = suggestedDiscounts;
  }

  public static clone(discountItem: DiscountItemEntity) {
    return new DiscountItemEntity(
      discountItem.keyword,
      discountItem.searchType,
      discountItem.originalUnitPrice,
      discountItem.productId,
      discountItem.quantity,
      discountItem.sku,
      discountItem.variantId,
      discountItem.appliedDiscount,
      discountItem.taxable,
      discountItem.type,
      discountItem.suggestedDiscounts,
    );
  }

  public static createFromResponse(response: DiscountItemResponse) {
    const suggestedDiscounts = response.suggestedDiscounts.map(s =>
      SuggestedDiscountEntity.createFromResponse(s),
    );
    let appliedDiscount: ApplyDiscountEntity | null = null;
    if (response.appliedDiscount) {
      appliedDiscount = ApplyDiscountEntity.createFromResponse(
        response.appliedDiscount,
      );
    }
    return new DiscountItemEntity(
      response.keyword,
      response.searchType,
      response.originalUnitPrice,
      response.productId,
      response.quantity,
      response.sku,
      response.variantId,
      appliedDiscount,
      response.taxable,
      response.type,
      suggestedDiscounts,
    );
  }

  setSuggestedDiscounts(suggestedDiscounts: Array<SuggestedDiscountEntity>) {
    this.suggestedDiscounts = suggestedDiscounts;
  }

  getSuggestedDiscounts() {
    if (this.suggestedDiscounts.length > 0) {
      return this.suggestedDiscounts;
    } else {
      return [];
    }
  }

  getKeyword() {
    return this.keyword;
  }

  getSearchType() {
    return this.searchType;
  }

  getOriginalUnitPrice() {
    return this.originalUnitPrice;
  }

  getEntitledMethod() {
    let discount: ApplyDiscountEntity | SuggestedDiscountEntity;
    if (this.appliedDiscount) {
      discount = this.appliedDiscount;
    } else {
      discount = this.suggestedDiscounts[0];
    }
    if (!discount) {
      return null;
    }
    return discount.getEntitledMethod();
  }

  getTitleByDiscountType() {
    let discount: ApplyDiscountEntity | SuggestedDiscountEntity;
    if (this.appliedDiscount) {
      discount = this.appliedDiscount;
    } else {
      discount = this.suggestedDiscounts[0];
    }
    if (!discount) {
      return '';
    }
    if (discount.getValueType() === EnumValuePricePromotion.PERCENTAGE) {
      return `${discount.getValue()}%`;
    }
    if (discount.getValueType() === EnumValuePricePromotion.FIXED_AMOUNT) {
      if (discount.getValue() >= this.originalUnitPrice) {
        return `${NumberUtils.formatCurrency(this.originalUnitPrice)}`;
      }
      return `${NumberUtils.formatCurrency(discount.getValue())}`;
    }
    if (discount.getValueType() === EnumValuePricePromotion.FIXED_PRICE) {
      if (this.originalUnitPrice <= discount.getValue()) {
        return NumberUtils.formatCurrency(0);
      }
      return `${NumberUtils.formatCurrency(
        this.originalUnitPrice - discount.getValue(),
      )}`;
    }
    return `${NumberUtils.formatCurrency(discount.getValue())}`;
  }

  getPriceAfterDiscountValue() {
    let discount: ApplyDiscountEntity | SuggestedDiscountEntity;
    if (this.appliedDiscount) {
      discount = this.appliedDiscount;
    } else {
      discount = this.suggestedDiscounts[0];
    }
    if (!discount) {
      return 0;
    }
    return discount.getPriceAfterDiscountValue(this.originalUnitPrice);
  }

  getPriceAfterDiscount() {
    let discount: ApplyDiscountEntity | SuggestedDiscountEntity;
    if (this.appliedDiscount) {
      discount = this.appliedDiscount;
    } else {
      discount = this.suggestedDiscounts[0];
    }
    if (!discount) {
      return '';
    }
    return discount.getPriceAfterDiscount(this.originalUnitPrice);
  }

  getPriceAfterDiscountNumber() {
    let discount: ApplyDiscountEntity | SuggestedDiscountEntity;
    if (this.appliedDiscount) {
      discount = this.appliedDiscount;
    } else {
      discount = this.suggestedDiscounts[0];
    }
    if (!discount) {
      return 0;
    }
    return discount.getPriceAfterDiscountValue(this.originalUnitPrice);
  }

  getTagDiscount() {
    let discount: ApplyDiscountEntity | SuggestedDiscountEntity;
    if (this.appliedDiscount) {
      discount = this.appliedDiscount;
    } else {
      discount = this.suggestedDiscounts[0];
    }
    if (!discount) {
      return 0;
    }
    if (discount.getValueType() === EnumValuePricePromotion.PERCENTAGE) {
      return NumberUtils.formatCurrency(
        (discount.getValue() / 100) * this.originalUnitPrice,
      );
    }
    if (discount.getValueType() === EnumValuePricePromotion.FIXED_AMOUNT) {
      if (discount.getValue() >= this.originalUnitPrice) {
        return '100%';
      }
      return StringUtils.format(
        '{0}%',
        ((discount.getValue() / this.originalUnitPrice) * 100).toFixed(2),
      );
    }
    if (discount.getValueType() === EnumValuePricePromotion.FIXED_PRICE) {
      if (this.originalUnitPrice <= discount.getValue()) {
        return '0%';
      }
      return StringUtils.format(
        '{0}%',
        (
          ((this.originalUnitPrice - discount.getValue()) /
            this.originalUnitPrice) *
          100
        ).toFixed(2),
      );
    }
    return NumberUtils.formatCurrency(
      this.originalUnitPrice - discount.getValue(),
    );
  }

  getApplyDiscount() {
    return this.appliedDiscount;
  }

  getAmountAfterDiscountValue() {
    let discount: ApplyDiscountEntity | SuggestedDiscountEntity;
    if (this.appliedDiscount) {
      discount = this.appliedDiscount;
    } else {
      discount = this.suggestedDiscounts[0];
    }
    if (discount === null) {
      return 0;
    }
    return discount.getAmountDiscountValue(this.originalUnitPrice);
  }

  getAmountDiscountValue() {
    let discount: ApplyDiscountEntity | SuggestedDiscountEntity;
    if (this.appliedDiscount) {
      discount = this.appliedDiscount;
    } else {
      discount = this.suggestedDiscounts[0];
    }
    if (!discount) {
      return 0;
    }
    return discount.getAmountDiscountValue(this.originalUnitPrice);
  }

  getQuantity() {
    return this.quantity;
  }

  getRateValue() {
    if (this.getAmountDiscountValue() === 0) {
      return 0;
    }
    return parseFloat(
      ((this.getAmountDiscountValue() / this.originalUnitPrice) * 100).toFixed(
        2,
      ),
    );
  }
}
