import {
  GiftProgramLineItemResponse,
  GiftProgramResponse,
  GiftProgramSuggestDiscountResponse,
} from 'modules/order/models/responses/GiftProgramResponse';
import {EntitledMethod} from 'modules/order/enums/Promotion';

export class GiftProgramEntity {
  orderId: number | null;
  customerId: number | null;
  storeId: number;
  salesChannelName: string;
  orderSourceId: number;
  lineItems: LineItem[];
  originalSubtotalPrice: number | null;
  total: number | null;
  suggestedDiscounts: SuggestedDiscountGiftEntity[] | null;

  constructor(
    orderId: number | null,
    customerId: number | null,
    storeId: number,
    salesChannelName: string,
    orderSourceId: number,
    lineItems: LineItem[],
    originalSubtotalPrice: number | null,
    total: number | null,
    suggestedDiscounts: null,
  ) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.storeId = storeId;
    this.salesChannelName = salesChannelName;
    this.orderSourceId = orderSourceId;
    this.lineItems = lineItems ?? [];
    this.originalSubtotalPrice = originalSubtotalPrice;
    this.total = total;
    this.suggestedDiscounts = suggestedDiscounts;
  }

  static createFromResponse(response: GiftProgramResponse): GiftProgramEntity {
    const lineItems: LineItem[] = response.lineItems.map(
      (item: GiftProgramLineItemResponse) => {
        const suggestedDiscounts: SuggestedDiscountGiftEntity[] =
          item.suggestedDiscounts.map(
            (discount: GiftProgramSuggestDiscountResponse) => {
              return SuggestedDiscountGiftEntity.createFromResponse(discount);
            },
          );

        return LineItem.createFromResponse({
          ...item,
          suggestedDiscounts: suggestedDiscounts,
        });
      },
    );

    return new GiftProgramEntity(
      response.orderId,
      response.customerId,
      response.storeId,
      response.salesChannelName,
      response.orderSourceId,
      lineItems,
      response.originalSubtotalPrice,
      response.total,
      response.suggestedDiscounts,
    );
  }

  getSuggestDiscountsFromLineItems(variantId: number) {
    if (this.lineItems.length > 0) {
      let listItem = this.lineItems.filter(
        item => item.getVariantId() === variantId,
      );
      if (listItem.length > 0) {
        return listItem[0].getSuggestDiscounts();
      }
    }
    return [];
  }

  getIdsVariantNotValid() {
    let idsVariantNotValid: Array<number> = [];
    this.lineItems.forEach(item => {
      if (!item.getValid()) {
        idsVariantNotValid.push(item.getVariantId());
      }
    });
    return idsVariantNotValid;
  }
}

class LineItem {
  originalUnitPrice: number;
  productId: number;
  quantity: number;
  sku: string;
  variantId: number;
  type: string;
  valid: boolean;
  priceRuleId: number | null;
  suggestedDiscounts: SuggestedDiscountGiftEntity[];
  originalTotal: number | null;
  lineAmountAfterLineDiscount: number;

  constructor(
    originalUnitPrice: number,
    productId: number,
    quantity: number,
    sku: string,
    variantId: number,
    type: string,
    valid: boolean,
    priceRuleId: number | null,
    suggestedDiscounts: SuggestedDiscountGiftEntity[],
    originalTotal: number | null,
    lineAmountAfterLineDiscount: number,
  ) {
    this.originalUnitPrice = originalUnitPrice;
    this.productId = productId;
    this.quantity = quantity;
    this.sku = sku;
    this.variantId = variantId;
    this.type = type;
    this.valid = valid;
    this.priceRuleId = priceRuleId;
    this.suggestedDiscounts = suggestedDiscounts;
    this.originalTotal = originalTotal;
    this.lineAmountAfterLineDiscount = lineAmountAfterLineDiscount;
  }

  static createFromResponse(response: any): LineItem {
    const suggestedDiscounts: SuggestedDiscountGiftEntity[] =
      response.suggestedDiscounts.map(
        (discount: GiftProgramSuggestDiscountResponse) => {
          return SuggestedDiscountGiftEntity.createFromResponse(discount);
        },
      );

    return new LineItem(
      response.originalUnitPrice,
      response.productId,
      response.quantity,
      response.sku,
      response.variantId,
      response.type,
      response.valid,
      response.priceRuleId,
      suggestedDiscounts ?? [],
      response.originalTotal,
      response.lineAmountAfterLineDiscount,
    );
  }
  getSuggestDiscounts() {
    return this.suggestedDiscounts;
  }
  getVariantId() {
    return this.variantId;
  }
  getValid() {
    return this.valid;
  }
}

export class SuggestedDiscountGiftEntity {
  id: number;
  title: string;
  entitledMethod: EntitledMethod;
  value: number | null;
  valueType: string | null;

  constructor(
    id: number,
    title: string,
    entitledMethod: EntitledMethod,
    value: number | null,
    valueType: string | null,
  ) {
    this.id = id;
    this.title = title;
    this.entitledMethod = entitledMethod;
    this.value = value;
    this.valueType = valueType;
  }

  static createFromResponse(
    response: GiftProgramSuggestDiscountResponse,
  ): SuggestedDiscountGiftEntity {
    return new SuggestedDiscountGiftEntity(
      response.id,
      response.title,
      response.entitledMethod,
      response.value,
      response.valueType,
    );
  }

  getEntitledMethod() {
    return this.entitledMethod;
  }
  getTitle() {
    return this.title;
  }
  getId() {
    return this.id;
  }
}
