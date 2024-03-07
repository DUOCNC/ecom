import ApplyDiscountEntity from './ApplyDiscountEntity';
import CustomerEntity from './CustomerEntity';
import OrderCustomerEntity from './OrderCustomerEntity';
import OrderLineEntity from './OrderLineEntity';
import {
  AppliedDiscountRequest,
  DiscountRequest,
} from 'modules/order/models/request/PromotionRequest';
import SuggestedDiscountEntity from './SuggestedDiscountEntity';
import {SuggestedDiscountResponse} from '../responses';
import {EnumValuePricePromotion} from 'modules/order/enums';
import {NumberUtils} from 'common';
import {
  DiscountItem,
  OrderDraftRequest,
  OrderItem,
} from 'modules/order/models/request/OrderDraftRequest';
import OrderConfigEntity from './OrderConfigEntity';
import {
  EntitledMethod,
  EntitledMethodEnum,
  LineItemTypeLowercase,
} from 'modules/order/enums/Promotion';
import {showError} from 'utils/ToastUtils';

export default class OrderEntity {
  private id: number | null = null;
  private storeId: number | null;
  private salesChannelName: string;

  private customer: OrderCustomerEntity | null;
  private lineItems: Array<OrderLineEntity>;
  private applyDiscount: ApplyDiscountEntity | null;
  private orderConfig: OrderConfigEntity = OrderConfigEntity.createEmpty();
  private suggestedDiscounts: Array<
    SuggestedDiscountEntity | ApplyDiscountEntity
  >;
  private note: string;
  private point: number = 0;
  private autoDiscount?: boolean;

  private constructor(
    storeId: number | null,
    salesChannelName: string,
    customer: OrderCustomerEntity | null,
    lineItems: Array<OrderLineEntity>,
    applyDiscount: ApplyDiscountEntity | null,
    suggestedDiscounts: Array<SuggestedDiscountEntity | ApplyDiscountEntity>,
    orderConfig: OrderConfigEntity,
    note: string,
    point: number,
    autoDiscount: boolean,
  ) {
    this.storeId = storeId;
    this.salesChannelName = salesChannelName;
    this.customer = customer;
    this.lineItems = lineItems;
    this.applyDiscount = applyDiscount;
    this.suggestedDiscounts = suggestedDiscounts;
    this.orderConfig = orderConfig;
    this.note = note;
    this.point = point;
    this.autoDiscount = autoDiscount;
  }

  static createEmpty(storeId: number, orderConfig: OrderConfigEntity) {
    if (storeId) {
      return new OrderEntity(
        storeId,
        'POS',
        null,
        [],
        null,
        [],
        orderConfig,
        '',
        0,
        true,
      );
    } else {
      return new OrderEntity(
        null,
        'POS',
        null,
        [],
        null,
        [],
        orderConfig,
        '',
        0,
        true,
      );
    }
  }

  static clone(order: OrderEntity) {
    return new OrderEntity(
      order.storeId,
      order.salesChannelName,
      order.customer,
      order.lineItems,
      order.applyDiscount,
      order.suggestedDiscounts,
      order.orderConfig,
      order.note,
      order.point,
      order.autoDiscount ?? true,
    );
  }

  getCustomer() {
    return this.customer;
  }

  getLineItems() {
    return this.lineItems;
  }

  emptyCustomer() {
    return this.customer == null;
  }

  addCustomer(customer: CustomerEntity) {
    this.customer = OrderCustomerEntity.create(customer);
  }

  emptyLineItems() {
    return this.lineItems === null;
  }

  addLineItem(item: OrderLineEntity) {
    this.lineItems.unshift(item);
  }

  updateLineItems(lineItems: Array<OrderLineEntity>) {
    this.lineItems = lineItems;
  }

  updateLineItem(index: number, item: OrderLineEntity) {
    this.lineItems[index] = item;
  }

  removeLineItemByIndex(index: number) {
    this.lineItems.splice(index, 1);
    if (this.lineItems && this.lineItems.length === 0) {
      this.point = 0;
    }
  }

  removeLineItemByVariantId(variantId: number) {
    let index = this.lineItems.findIndex(
      item => item.getVariantId() === variantId,
    );
    if (index !== -1) {
      this.lineItems.splice(index, 1);
    }
  }

  changeQuantityLineItem(index: number) {
    this.lineItems.splice(index, 1);
  }

  clearCustomer() {
    this.customer = null;
    this.point = 0;
  }

  getLineItemByIndex(index: number) {
    return this.lineItems[index];
  }
  getId() {
    return this.id;
  }
  getAmountDiscountProduct() {
    let total = 0;
    this.lineItems
      .filter(item => item.getType() !== LineItemTypeLowercase.GIFT)
      .forEach(item => {
        total = total + item.getDiscountAmountValue();
      });
    return total;
  }
  getSalesChannelName() {
    return this.salesChannelName;
  }
  setStoreId(storeId: number) {
    this.storeId = storeId;
  }
  getStoreId() {
    return this.storeId;
  }

  isHaveLineItems(): boolean {
    return this.lineItems.length > 0;
  }

  removeSuggestDiscount(index: number) {
    this.suggestedDiscounts.splice(index, 1);
  }

  getTotalNumberVariant() {
    if (this.lineItems.length > 0) {
      let count = 0;
      this.lineItems.forEach(orderLine => {
        count = count + orderLine.getQuantity();
      });
      return count;
    } else {
      return 0;
    }
  }

  getTotalPriceRetail() {
    if (this.lineItems.length > 0) {
      let totalPriceValue = 0;
      this.lineItems
        .filter(item => item.getType() !== LineItemTypeLowercase.GIFT)
        .forEach(item => {
          totalPriceValue = totalPriceValue + item.getTotalPriceValue();
        });
      return totalPriceValue;
    } else {
      return 0;
    }
  }

  getAmountDiscountDisplay() {
    return this.getAmountDiscountOrderValue() > this.getTotalPriceRetail()
      ? NumberUtils.formatCurrency(this.getTotalPriceRetail())
      : NumberUtils.formatCurrency(this.getAmountDiscountOrderValue());
  }

  buildRequestApplyCoupon(coupon?: string | null) {
    let discountRequest: DiscountRequest = {
      orderId: null,
      lineItems: [],
      salesChannelName: 'POS',
      customerId: null,
      customerLevelId: null,
      keyword: null,
      orderSourceId: 1,
    };
    discountRequest.appliedDiscount = coupon ? {code: coupon} : null;
    discountRequest.orderId = this.id;
    discountRequest.storeId = this.storeId;
    discountRequest.customerId = this.customer?.getCustomerIdValue() ?? null;
    discountRequest.customerLevelId =
      this.customer?.getCustomerLevelId() ?? null;
    if (this.lineItems.length > 0) {
      discountRequest.lineItems = this.lineItems.map(lineItem => {
        const variant = lineItem.getVariant();
        let appliedDiscount: AppliedDiscountRequest | null = null;
        if (lineItem.getDiscountItems() && lineItem.getDiscountItems()[0]) {
          const appliedDiscountEntity = lineItem
            .getDiscountItems()[0]
            .getApplyDiscount();
          if (appliedDiscountEntity) {
            appliedDiscount = {
              code: appliedDiscountEntity.getCode(),
            };
          }
        }
        return {
          keyword: null,
          searchYpe: null,
          originalUnitPrice: variant.getRetailPriceValue(),
          productId: variant.getProductId(),
          quantity: lineItem.getQuantityValue(),
          sku: lineItem.getSku(),
          variantId: variant.getId(),
          appliedDiscount: appliedDiscount,
        };
      });
    }
    return discountRequest;
  }

  isDiscountLineItem() {
    if (this.lineItems && this.lineItems.length > 0) {
      let isDiscountLineItems = false;
      this.lineItems.forEach(item => {
        if (item.getDiscountItems().length > 0) {
          isDiscountLineItems = true;
          return;
        }
      });
      return isDiscountLineItems;
    } else {
      return false;
    }
  }

  setSuggestedDiscounts(suggestedDiscounts: Array<SuggestedDiscountResponse>) {
    this.suggestedDiscounts = suggestedDiscounts.map(e =>
      SuggestedDiscountEntity.createFromResponse(e),
    );
  }

  setSuggestedDiscountsEntity(
    suggestedDiscounts: Array<SuggestedDiscountEntity | ApplyDiscountEntity>,
  ) {
    this.suggestedDiscounts = suggestedDiscounts;
  }

  getSuggestedDiscounts() {
    return this.suggestedDiscounts;
  }

  getSuggestedDiscountManual() {
    const discounts = this.suggestedDiscounts.filter(e => e.getManual());
    if (discounts && discounts.length > 0) {
      return discounts;
    }
    return [];
  }

  getNote() {
    return this.note;
  }

  setNote(note: string) {
    this.note = note;
  }

  getDiscountAmountBuySuggestedDiscountsValue(
    suggestedDiscounts: Array<SuggestedDiscountResponse>,
  ) {
    const lstSuggestEntity = suggestedDiscounts.map(e =>
      SuggestedDiscountEntity.createFromResponse(e),
    );
    if (lstSuggestEntity.length > 0) {
      const suggest = lstSuggestEntity[0];
      if (suggest.getValueType() === EnumValuePricePromotion.FIXED_AMOUNT) {
        if (suggest.getValue() >= this.getTotalPriceRetail()) {
          return this.getTotalPriceRetail();
        }
        return suggest.getValue();
      }
      if (suggest.getValueType() === EnumValuePricePromotion.PERCENTAGE) {
        return (suggest.getValue() * this.getTotalPriceRetail()) / 100;
      }
      return suggest.getValue();
    }
    return 0;
  }

  static resetDiscounts(order: OrderEntity) {
    const newOrder = OrderEntity.clone(order);
    newOrder.autoDiscount = false;
    newOrder.applyDiscount = null;
    newOrder.suggestedDiscounts = [];
    newOrder.lineItems.forEach(e => e.setDiscountItems([]));
    return newOrder;
  }

  getAmountDiscountOrderValue() {
    let value = 0;
    if (this.getAmountDiscountProduct() > 0) {
      value += this.getAmountDiscountProduct();
    }
    if (this.suggestedDiscounts && this.suggestedDiscounts.length > 0) {
      this.suggestedDiscounts.forEach(discount => {
        if (discount.getValueType() === EnumValuePricePromotion.PERCENTAGE) {
          value +=
            (discount.getValue() / 100) *
            (this.getTotalPriceRetail() - this.getAmountDiscountProduct());
        }
        if (discount.getValueType() === EnumValuePricePromotion.FIXED_AMOUNT) {
          if (
            discount.getValue() >=
            this.getTotalPriceRetail() - this.getAmountDiscountProduct()
          ) {
            value +=
              this.getTotalPriceRetail() - this.getAmountDiscountProduct();
          } else {
            value += discount.getValue();
          }
        }
      });
    }
    return value;
  }

  getAmountDiscountOrder() {
    return NumberUtils.formatCurrency(this.getAmountDiscountOrderValue());
  }

  private getAmountOrderValue() {
    return (
      this.getTotalPriceRetail() -
      Math.round(this.getAmountDiscountOrderValue()) -
      this.getPoint() * 1000
    );
  }

  getAmountOrderNotPointValue() {
    return (
      this.getTotalPriceRetail() -
      this.getAmountDiscountProduct() -
      this.getAmountDiscountOrderValue()
    );
  }

  getPercentDiscountTotalOrder() {
    if (!this.getAmountDiscountOrderValue() || !this.getTotalPriceRetail()) {
      return '0%';
    } else if (
      this.getAmountDiscountOrderValue() >=
      this.getTotalPriceRetail() - this.getAmountDiscountProduct()
    ) {
      return '100%';
    } else {
      let percentVal =
        (this.getAmountDiscountOrderValue() /
          (this.getTotalPriceRetail() - this.getAmountDiscountProduct())) *
        100;
      if (percentVal % 1 === 0) {
        return `${percentVal.toFixed(0)}%`;
      }
      return `${percentVal.toFixed(2)}%`;
    }
  }

  getAmountOrder() {
    if (this.getAmountOrderValue() < 0) {
      return NumberUtils.formatCurrency(0);
    }
    return NumberUtils.formatCurrency(this.getAmountOrderValue());
  }

  getApplyDiscount() {
    return this.applyDiscount;
  }

  // ============== Build Request Yoscan ===============
  buildItemGenerateBarCode(checkbox: boolean) {
    let items: Array<OrderItem> = [];
    let listLineItemGift: Array<OrderLineEntity> = [];
    this.getLineItems().forEach(item => {
      if (item.getGifts().length > 0) {
        listLineItemGift = [...listLineItemGift, ...item.getGifts()];
      }
    });
    if (this.getLineItems().length > 0) {
      items = [...this.getLineItems(), ...listLineItemGift].map(item => {
        let suggestDiscount: SuggestedDiscountEntity;
        let discountItems: Array<DiscountItem> = [];
        const discountItem = item.getDiscountItems()[0];
        const variant = item.getVariant();
        let amount = 0;

        if (discountItem && discountItem.getSuggestedDiscounts().length > 0) {
          amount = discountItem.getAmountDiscountValue() * item.getQuantity();
          if (
            discountItem.getEntitledMethod() ===
            EntitledMethodEnum.DISCOUNT_CODE_LINE
          ) {
            amount = discountItem.getAmountDiscountValue();
          }
        }

        if (item.getType() === LineItemTypeLowercase.GIFT) {
          discountItems.push({
            rate: 0,
            value: 0,
            amount: 0,
            promotionId: item.getGiftProgram()?.getId(),
            promotionTitle: item.getGiftProgram()?.getTitle(),
            type: EnumValuePricePromotion.FIXED_AMOUNT,
            reason: '',
            discountCode: '',
            orderId: null,
            source: '',
            taxable: false,
            otpEnabled: false,
          });
        } else {
          if (discountItem && discountItem.getSuggestedDiscounts().length > 0) {
            suggestDiscount = item
              .getDiscountItems()[0]
              .getSuggestedDiscounts()[0];
            let type = suggestDiscount.getValueType();
            if (type === EnumValuePricePromotion.FIXED_PRICE) {
              type = EnumValuePricePromotion.FIXED_AMOUNT;
            }
            discountItems.push({
              rate: discountItem.getRateValue(),
              value: discountItem.getAmountDiscountValue(),
              amount,
              promotionTitle: suggestDiscount.getTitle(),
              reason: '',
              promotionId: suggestDiscount.getPriceRuleId(),
              discountCode: suggestDiscount.getCode() ?? '',
              orderId: null,
              source: '',
              type: type,
              taxable: suggestDiscount.getTaxable(),
              otpEnabled: suggestDiscount.getOtpEnabled(),
              entitledMethod: suggestDiscount.getEntitledMethod(),
            });
          }
        }

        return {
          sku: item.getSku(),
          variantId: variant.getId(),
          variant: variant.getName(),
          productId: item.getProductId(),
          product: variant.getProductName(),
          variantBarcode: variant.getBarcode(),
          productType: item.getType(),
          productCode: item.getProductCode(),
          quantity: item.getQuantity(),
          price: variant.getRetailPriceValue(),
          amount: item.getAmountValue(),
          note: item.getNote(),
          type: item.getType(),
          variantImage: item.getVariantImage(),
          unit: item.getUnit(),
          taxRate: 0,
          taxInclude: true,
          lineAmountAfterLineDiscount:
            item.getLineAmountAfterLineDiscountValue(),
          discountType: '',
          discountItems,
          discountRate: discountItem?.getRateValue(),
          discountValue: discountItem?.getAmountDiscountValue(),
          discountAmount: amount,
          available: 0,
          gifts: item.getGifts(),
          committed: 0,
          id: null,
          onHand: 0,
          onHold: 0,
          showNote: false,
          weight: null,
          weightUnit: null,
          position: item.getPosition(),
          taxable: item.getTaxable(),
        };
      });
    }
    let discounts: Array<DiscountItem> = [];
    if (this.suggestedDiscounts && this.suggestedDiscounts.length > 0) {
      this.suggestedDiscounts.forEach(suggest => {
        discounts.push({
          reason: '',
          amount: suggest.getAmountDiscountValue(
            this.getAmountAfterDiscountProduct(),
          ),
          promotionTitle: suggest.getTitle(),
          discountCode: suggest.getCode(),
          taxable: suggest.getTaxable(),
          otpEnabled: suggest.getOtpEnabled(),
          entitledMethod: suggest.getEntitledMethod(),
          rate: this.getRateAmountAfterDiscountProduct(
            suggest.getAmountDiscountValue(
              this.getAmountAfterDiscountProduct(),
            ),
          ),
          orderId: null,
          source: '',
          type: suggest.getValueType(),
          value: suggest.getAmountDiscountValue(
            this.getAmountAfterDiscountProduct(),
          ),
          promotionId: suggest.getPriceRuleId(),
        });
      });
    }
    if (checkbox) {
      return {
        items,
        customer: this.customer?.getCustomerNotHaveAddress(),
        customerId: this.customer?.getCustomerIdValue(),
        note: this.note,
        discounts: discounts,
        point: this.point,
      };
    }
    const validateCustomer = this.validateCustomerAddress();
    if (validateCustomer) {
      return;
    }
    return {
      items,
      customer: this.customer,
      customerId: this.customer?.getCustomerIdValue(),
      note: this.note,
      discounts: discounts,
      point: this.point,
    };
  }

  buildRequestGenerateBarcode(body: OrderDraftRequest, checkbox: boolean) {
    let order = this.buildItemGenerateBarCode(checkbox);
    if (!order) {
      return;
    }
    return {
      ...body,
      order,
    };
  }

  setOrderConfig(cf: OrderConfigEntity) {
    this.orderConfig = cf;
  }

  getOrderConfig() {
    return this.orderConfig;
  }
  getDiscountRateValue() {
    if (!this.getAmountDiscountOrderValue() || !this.getTotalPriceRetail()) {
      return 0;
    } else if (
      this.getAmountDiscountOrderValue() >= this.getTotalPriceRetail()
    ) {
      return 100;
    }
    return parseFloat(
      (
        (this.getAmountDiscountOrderValue() / this.getTotalPriceRetail()) *
        100
      ).toFixed(2),
    );
  }
  getDiscountRate() {
    return NumberUtils.formatNumber(this.getDiscountRateValue());
  }

  getPointCustomer() {
    if (this.customer) {
      return this.customer.getPoint();
    }
    return 0;
  }

  getPoint() {
    return this.point;
  }

  setPoint(point: number) {
    this.point = point;
  }

  getPointApply(newPoint: number) {
    const pointCustomer = this.getPointCustomer();
    const pointMax = Math.ceil(this.getAmountOrderNotPointValue() / 1000);
    if (pointCustomer > pointMax) {
      if (newPoint > pointMax) {
        return pointMax;
      }
    }
    if (pointMax > pointCustomer) {
      if (newPoint > pointCustomer) {
        return pointCustomer;
      }
    }
    return newPoint;
  }

  getIsDiscountByTHRESHOLD() {
    let isDiscountByTHRESHOLD = false;
    this.lineItems.forEach(lineItem => {
      if (
        lineItem.getGiftProgram()?.getEntitledMethod() ===
        EntitledMethod.ORDER_THRESHOLD
      ) {
        isDiscountByTHRESHOLD = true;
      }
    });
    return isDiscountByTHRESHOLD;
  }

  getIsDiscountByQUANTITY() {
    let isDiscountByQUANTITY = false;
    this.lineItems.forEach(lineItem => {
      if (
        lineItem.getGiftProgram()?.getEntitledMethod() ===
        EntitledMethod.QUANTITY
      ) {
        isDiscountByQUANTITY = true;
      }
    });
    return isDiscountByQUANTITY;
  }
  validateCustomerAddress(): boolean {
    if (!this.customer?.getDistrict()) {
      showError('Vui lòng chọn khu vực');
      return true;
    }
    if (!this.customer?.getWard()) {
      showError('Vui lòng chọn phường/xã');
      return true;
    }
    return false;
  }

  setAutoDiscount(auto: boolean) {
    this.autoDiscount = auto;
  }

  getAutoDiscount(): boolean {
    if (this.autoDiscount) {
      return true;
    }
    return false;
  }

  //tổng sau chiết khấu sản phẩm
  private getAmountAfterDiscountProduct() {
    return this.getTotalPriceRetail() - this.getAmountDiscountProduct();
  }

  private getRateAmountAfterDiscountProduct(amountItem: number) {
    return (
      Math.round((amountItem / this.getAmountAfterDiscountProduct()) * 100), 2
    );
  }
}
