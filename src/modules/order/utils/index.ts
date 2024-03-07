import {
  CustomerEntity,
  DiscountItemEntity,
  OrderConfigEntity,
  OrderEntity,
  OrderLineEntity,
  SuggestedDiscountEntity,
  VariantEntity,
} from 'modules/order/models/entities';
import {NumberUtils} from 'common';
import {DiscountItemYoscanEntity} from 'modules/order/models/entities/OrderYoscanEntity';
import ApplyDiscountEntity from 'modules/order/models/entities/ApplyDiscountEntity';
import {plainToInstance} from 'class-transformer';
export enum TYPE {
  currency = 'currency',
  number = 'number',
}
export const handleConditionDiscountUI = (
  isHaveLineItems: boolean,
  isAutoDiscount: boolean,
) => {
  if (isHaveLineItems) {
    // 540.4
    return {
      isDisableSelectDiscount: false,
    };
  } else {
    return {
      isDisableSelectDiscount: true,
    };
  }
};

export const getTotalAfterDiscountOrder = (
  data: SuggestedDiscountEntity | null,
  totalPrice: number,
  type?: TYPE,
) => {
  if (data && data.getValue()) {
    switch (data.getValueType()) {
      case 'PERCENTAGE': {
        const priceAfterDiscount = (1 - data.getValue() / 100) * totalPrice;
        return type === TYPE.currency
          ? NumberUtils.formatCurrency(priceAfterDiscount)
          : priceAfterDiscount;
      }
      case 'FIXED_AMOUNT': {
        const priceAfterDiscount = totalPrice - data.getValue();
        if (priceAfterDiscount <= 0) {
          return type === TYPE.currency ? NumberUtils.formatCurrency(0) : 0;
        }
        return type === TYPE.currency
          ? NumberUtils.formatCurrency(priceAfterDiscount)
          : priceAfterDiscount;
      }
      default: {
        return type === TYPE.currency
          ? NumberUtils.formatCurrency(totalPrice)
          : totalPrice;
      }
    }
  } else {
    return type === TYPE.currency
      ? NumberUtils.formatCurrency(totalPrice)
      : totalPrice;
  }
};
export const getTotalDiscountOrder = (
  data: SuggestedDiscountEntity | null,
  totalPrice: number,
  type: TYPE,
) => {
  if (data && data.getValue()) {
    switch (data.getValueType()) {
      case 'PERCENTAGE': {
        let priceDiscount = (data.getValue() / 100) * totalPrice;
        return type === TYPE.currency
          ? NumberUtils.formatCurrency(priceDiscount)
          : priceDiscount;
      }
      case 'FIXED_AMOUNT': {
        let priceDiscount = data.getValue();
        return type === TYPE.currency
          ? NumberUtils.formatCurrency(priceDiscount)
          : priceDiscount;
      }
      default: {
        return type === TYPE.currency ? NumberUtils.formatCurrency(0) : 0;
      }
    }
  } else {
    return type === TYPE.currency ? NumberUtils.formatCurrency(0) : 0;
  }
};

export const getDiscountOrderUI = (
  data: SuggestedDiscountEntity | ApplyDiscountEntity | null,
  totalPrice: number,
  discountProduct: number,
): {title: string; value: string} => {
  if (data && data.getValue()) {
    switch (data.getValueType()) {
      case 'PERCENTAGE': {
        let priceDiscount =
          (data.getValue() / 100) * (totalPrice - discountProduct);
        return {
          title: `${data.getValue()}%`,
          value: NumberUtils.formatCurrency(priceDiscount),
        };
      }
      case 'FIXED_AMOUNT': {
        let priceDiscount =
          data.getValue() > totalPrice ? totalPrice : data.getValue();
        let percentDiscount =
          priceDiscount > totalPrice - discountProduct
            ? 100
            : (priceDiscount / (totalPrice - discountProduct)) * 100;
        if (Number.isInteger(percentDiscount)) {
          return {
            title: `${NumberUtils.formatCurrency(priceDiscount)}`,
            value: `${percentDiscount}%`,
          };
        } else {
          return {
            title: `${NumberUtils.formatCurrency(priceDiscount)}`,
            value: `${percentDiscount.toFixed(2)}%`,
          };
        }
      }
      default: {
        return {
          title: '0%',
          value: NumberUtils.formatCurrency(0),
        };
      }
    }
  } else {
    return {
      title: '0%',
      value: NumberUtils.formatCurrency(0),
    };
  }
};

export const getDiscountOrderUIDetailYoscan = (
  data: DiscountItemYoscanEntity | null,
  totalPrice: number,
  discountProduct: number,
): {title: string; value: string} => {
  if (data && data.getValue()) {
    switch (data.getType()) {
      case 'PERCENTAGE': {
        let priceDiscount =
          (data.getRate() / 100) * (totalPrice - discountProduct);
        return {
          title: `${data.getRate()}%`,
          value: NumberUtils.formatCurrency(priceDiscount),
        };
      }
      case 'FIXED_AMOUNT': {
        let priceDiscount =
          data.getValue() > totalPrice ? totalPrice : data.getValue();
        let percentDiscount =
          priceDiscount > totalPrice ? 100 : (priceDiscount / totalPrice) * 100;
        if (Number.isInteger(percentDiscount)) {
          return {
            title: `${NumberUtils.formatCurrency(priceDiscount)}`,
            value: `${percentDiscount}%`,
          };
        } else {
          return {
            title: `${NumberUtils.formatCurrency(priceDiscount)}`,
            value: `${percentDiscount.toFixed(2)}%`,
          };
        }
      }
      default: {
        return {
          title: '0%',
          value: NumberUtils.formatCurrency(0),
        };
      }
    }
  } else {
    return {
      title: '0%',
      value: NumberUtils.formatCurrency(0),
    };
  }
};

export const getOrderFromLocalOrders = (order: string) => {
  const o = plainToInstance(OrderEntity, order);
  if (order.orderConfig) {
    o.setOrderConfig(plainToInstance(OrderConfigEntity, order.orderConfig));
  }
  if (order.customer) {
    o.addCustomer(
      plainToInstance(CustomerEntity, {
        ...order.customer,
        id: order.customer.customerId,
        fullName: order.customer.customer,
      }),
    );
  }
  if (order.lineItems && order.lineItems.length > 0) {
    for (let i = 0; i < order.lineItems.length; i++) {
      const lineItem = plainToInstance(OrderLineEntity, order.lineItems[i]);
      const gifts = lineItem.gifts;
      if (gifts && gifts.length > 0) {
        for (let j = 0; j < gifts.length; j++) {
          const gift = gifts[j];
          lineItem.updateGift(plainToInstance(OrderLineEntity, gift), j);
        }
      }
      if (lineItem.variant) {
        const variant = VariantEntity.create(lineItem.variant);
        lineItem.setVariant(variant);
      }
      const discountItems = lineItem.discountItems;
      if (discountItems && discountItems.length > 0) {
        const discountEntities: Array<DiscountItemEntity> = [];
        for (let j = 0; j < discountItems.length; j++) {
          const discount = discountItems[j];
          discountEntities.push(
            DiscountItemEntity.createFromResponse(discount),
          );
        }
        lineItem.setDiscountItems(discountEntities);
      }
      o.updateLineItem(i, plainToInstance(OrderLineEntity, lineItem));
    }
  }
  if (order.suggestedDiscounts && order.suggestedDiscounts.length > 0) {
    o.setSuggestedDiscounts(order.suggestedDiscounts);
  }
  return o;
};

export const getMaxKey = (arr: Array<string>, code: string = '') => {
  const numbers: Array<number> = [];
  if (!arr || arr.length === 0) {
    return 1;
  }
  arr.forEach(item => {
    const number = parseInt(item.replace(code, ''));
    numbers.push(number);
  });
  return Math.max(...numbers) + 1;
};
