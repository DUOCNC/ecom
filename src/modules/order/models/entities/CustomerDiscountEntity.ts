import {DateUtils, NumberUtils, StringUtils} from 'common';
import {CustomerDiscountResponse} from '../responses/CustomerDiscountResponse';
import {DateFormatPattern} from 'common/enums';
import {
  DiscountValueType,
  EntitledMethodEnum,
} from 'modules/order/enums/Promotion';

export default class CustomerDiscountEntity {
  private customerId: number;
  private code: string;
  private valueType: string;
  private value: number;
  private entitledMethod: string;
  private asyncUsageCount: number;
  private usageLimit: number;
  private disabled: boolean;
  private createdDate: string;
  private expiredDate: string;
  private title: string;
  private orderCode: string | null;
  private remainingCount: number;

  constructor(
    customerId: number,
    code: string,
    valueType: string,
    value: number,
    entitledMethod: string,
    asyncUsageCount: number,
    usageLimit: number,
    disabled: boolean,
    createdDate: string,
    expiredDate: string,
    title: string,
    orderCode: string | null,
    remainingCount: number,
  ) {
    this.customerId = customerId;
    this.code = code;
    this.valueType = valueType;
    this.value = value;
    this.entitledMethod = entitledMethod;
    this.asyncUsageCount = asyncUsageCount;
    this.usageLimit = usageLimit;
    this.disabled = disabled;
    this.createdDate = createdDate;
    this.expiredDate = expiredDate;
    this.title = title;
    this.orderCode = orderCode;
    this.remainingCount = remainingCount;
  }

  static fromResponse(
    response: CustomerDiscountResponse,
  ): CustomerDiscountEntity {
    return new CustomerDiscountEntity(
      response.customerId,
      response.code,
      response.valueType,
      response.value,
      response.entitledMethod,
      response.asyncUsageCount,
      response.usageLimit,
      response.disabled,
      response.createdDate,
      response.expiredDate,
      response.title,
      response.orderCode,
      response.remainingCount,
    );
  }

  // Getters
  getCustomerId(): number {
    return this.customerId;
  }

  getCode(): string {
    return this.code;
  }

  getValueType(): string {
    return this.valueType;
  }

  getValue(): number {
    return this.value;
  }

  getEntitledMethod(): string {
    return this.entitledMethod;
  }

  getAsyncUsageCount(): number {
    return this.asyncUsageCount;
  }

  getUsageLimit(): number {
    return this.usageLimit;
  }

  isDisabled(): boolean {
    return this.disabled;
  }

  getCreatedDate(): string {
    return this.createdDate;
  }

  getExpiredDate(): string {
    return this.expiredDate;
  }

  getTitle(): string {
    return this.title;
  }

  getOrderCode(): string | null {
    return this.orderCode;
  }

  getRemainingCount(): number {
    return this.remainingCount;
  }

  // Setters
  setCustomerId(customerId: number): void {
    this.customerId = customerId;
  }

  setCode(code: string): void {
    this.code = code;
  }

  setValueType(valueType: string): void {
    this.valueType = valueType;
  }

  setValue(value: number): void {
    this.value = value;
  }

  setEntitledMethod(entitledMethod: string): void {
    this.entitledMethod = entitledMethod;
  }

  setAsyncUsageCount(asyncUsageCount: number): void {
    this.asyncUsageCount = asyncUsageCount;
  }

  setUsageLimit(usageLimit: number): void {
    this.usageLimit = usageLimit;
  }

  setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  setCreatedDate(createdDate: string): void {
    this.createdDate = createdDate;
  }

  setExpiredDate(expiredDate: string): void {
    this.expiredDate = expiredDate;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setOrderCode(orderCode: string | null): void {
    this.orderCode = orderCode;
  }

  setRemainingCount(remainingCount: number): void {
    this.remainingCount = remainingCount;
  }

  getDueDate(): string {
    if (this.expiredDate) {
      return DateUtils.formatDateFromServer(
        this.expiredDate,
        DateFormatPattern.DDMMYYYY,
      );
    }
    return '---';
  }
  getTitleByMethod() {
    const title = 'Giảm giá trên sản phẩm';
    if (this.entitledMethod === EntitledMethodEnum.ORDER_THRESHOLD) {
      return 'Giảm giá trên đơn hàng';
    }
    return title;
  }
  getDiscountValue() {
    let value = NumberUtils.formatCurrency(this.value);
    if (this.valueType === DiscountValueType.percentage) {
      value = StringUtils.format('{0}%', this.value);
    }
    return value;
  }
}
