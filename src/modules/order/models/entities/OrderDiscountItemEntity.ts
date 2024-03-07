import {NumberUtils} from 'common';

export default class OrderDiscountItemEntity {
  private id: number;
  private amount: number;
  private orderLineId: number | null;
  private orderId: number | null;
  private rate: number;
  private reason: string;
  private source: string;
  private promotionId: number | null;
  private promotionTitle: string;
  private discountCode: string | null;
  private value: number;
  private taxable: boolean = false;

  private constructor(
    id: number,
    amount: number,
    orderLineId: number,
    orderId: number | null,
    rate: number,
    reason: string,
    source: string,
    promotionId: number | null,
    promotionTitle: string,
    discountCode: string | null,
    value: number,
    taxable: boolean,
  ) {
    this.id = id;
    this.amount = amount;
    this.orderLineId = orderLineId;
    this.orderId = orderId;
    this.rate = rate;
    this.reason = reason;
    this.source = source;
    this.promotionId = promotionId;
    this.promotionTitle = promotionTitle;
    this.discountCode = discountCode;
    this.value = value;
    this.taxable = taxable;
  }

  getKey(): string {
    return this.id.toString();
  }
  getAmountValue() {
    return this.amount;
  }
  getAmount() {
    return NumberUtils.formatCurrency(this.amount);
  }
  getPromotionId() {
    return this.promotionId;
  }
  getPromotionTitle() {
    return this.promotionTitle;
  }
}
