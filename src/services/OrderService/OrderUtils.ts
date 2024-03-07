import {
  DiscountType,
  OrderDiscountItemSubRequest,
} from 'model/request/OrderRequest';
import {PromotionLineItemSubRequest} from 'model/request/PromotionRequest';
import {VariantDto} from 'model/dto/ProductService/VariantDto';
import {
  OrderDiscountSubRequest,
  OrderLineItemSubRequest,
  OrderRequest,
} from 'model/request/OrderRequest';
import {AppConfig} from 'config/AppConfig';
import NumberUtils from 'utils/NumberUtils';
import ProductUtils from 'services/ProductService/ProductUtils';
import {PaymentSubDto} from 'model/dto/OrderService/PaymentSubDto';
import {OrderSearchDto} from 'model/dto/OrderService/OrderSearchDto';
import {OrderDto} from 'model/dto/OrderService/OrderDto';

const OrderUtils = {
  newDiscountItemSubRequest: (order_line_item_id: number | null) =>
    ({
      id: null,
      amount: 0,
      order_line_id: order_line_item_id,
      rate: 0,
      reason: '',
      source: '',
      promotion_id: null,
      discount_code: '',
      value: 0,
    } as OrderDiscountItemSubRequest),
  getAmountLineItem: (quantity: number, price: number) => quantity * price,
  getVariantOrderRequest: (variant: VariantDto) => {
    const price = ProductUtils.findPriceRetailVariant(
      variant,
      AppConfig.Currency,
    );
    const quantity = 1;
    const amount = OrderUtils.getAmountLineItem(quantity, price);
    return {
      id: null,
      amount: amount,
      discount_amount: 0,
      discount_rate: 0,
      discount_type: 'percent',
      discount_value: 0,
      gifts: [],
      discount_items: [],
      line_amount_after_line_discount: amount,
      note: '',
      price: price,
      product: variant.product.name,
      product_code: variant.product.code,
      product_id: variant.product.id,
      product_type: variant.product.product_type,
      quantity: 1,
      sku: variant.sku,
      tax_include: false,
      tax_rate: 0,
      type: 'normal',
      unit: variant.product.unit,
      variant: variant.name,
      variant_barcode: variant.barcode,
      variant_id: variant.id,
      variant_image: '',
      weight: variant.weight,
      weight_unit: variant.weightUnit,
      avaiable: variant.available,
    } as OrderLineItemSubRequest;
  },
  onQuantityChange: (item: OrderLineItemSubRequest, quantity: number) => {
    item.quantity = quantity;
    item.amount = OrderUtils.getAmountLineItem(item.quantity, item.price);
    let discountAmount = 0;
    if (item.discount_items.length > 0) {
      item.discount_items[0].amount =
        (item.discount_items[0].rate * item.quantity * item.price) / 100;
      discountAmount = item.discount_items[0].amount;
    }
    item.line_amount_after_line_discount = item.amount - discountAmount;
  },
  getTotalAmount: (lineItem: Array<OrderLineItemSubRequest>) => {
    return lineItem.map(item => item.amount).reduce((a, b) => a + b, 0);
  },
  getTotalDiscountLineItem: (lineItem: Array<OrderLineItemSubRequest>) => {
    return lineItem
      .flatMap(item => item.discount_items)
      .map(item => item.amount)
      .reduce((a, b) => a + b, 0);
  },
  getTotalDiscountOrder: (discounts: Array<OrderDiscountSubRequest>) => {
    return discounts.map(item => item.amount).reduce((a, b) => a + b, 0);
  },
  changeDiscountCode: (
    discounts: Array<OrderDiscountSubRequest>,
    code: string,
  ) => {
    discounts[0].discount_code = code;
  },
  getTotalQuantity: (lineItems: Array<OrderLineItemSubRequest>) => {
    return lineItems
      .map(lineitem => lineitem.quantity)
      .reduce((a, b) => a + b, 0);
  },
  getOrderDiscount: (discounts: Array<OrderDiscountSubRequest>) => {
    return discounts
      .map(discount => discount.amount)
      .reduce((a, b) => a + b, 0);
  },
  getTotalLineAmountAfterDiscount: (
    lineItem: Array<OrderLineItemSubRequest>,
  ) => {
    return lineItem
      .map(item => item.line_amount_after_line_discount)
      .reduce((a, b) => a + b, 0);
  },
  caculateTotal: (request: OrderRequest) => {
    const totalLineItemDiscount = OrderUtils.getTotalDiscountLineItem(
      request.items,
    );
    request.total_line_amount_after_line_discount =
      OrderUtils.getTotalLineAmountAfterDiscount(request.items);
    if (request.discounts.length > 0) {
      if (
        request.total_line_amount_after_line_discount >
        request.discounts[0].amount
      ) {
        request.discounts[0].value =
          request.total_line_amount_after_line_discount;
        request.discounts[0].rate =
          (request.discounts[0].value /
            request.total_line_amount_after_line_discount) *
          100;
        request.discounts[0].amount = request.discounts[0].amount;
      }
    }
    const orderDiscount = OrderUtils.getOrderDiscount(request.discounts);
    request.total_discount = totalLineItemDiscount + orderDiscount;
    request.total =
      request.total_line_amount_after_line_discount - orderDiscount;
  },
  getPromotionLineItem: (lineitems: Array<OrderLineItemSubRequest>) => {
    return lineitems.map(
      lineitem =>
        ({
          custom: true,
          product_id: lineitem.product_id,
          product_name: lineitem.product,
          variant_id: lineitem.variant_id,
          sku: lineitem.sku,
          collections: [],
          product_tags: [],
          color: '',
          size: '',
          quantity: lineitem.quantity,
          original_total: lineitem.amount,
          original_unit_price: lineitem.price,
          taxable: false,
          applied_discount: null,
        } as PromotionLineItemSubRequest),
    );
  },
  newOrderDiscount: () =>
    ({
      amount: 0,
      value: 0,
      discount_code: null,
      rate: 0,
      promotion_id: null,
      order_id: null,
      reason: '',
      source: '',
      id: null,
    } as OrderDiscountSubRequest),
  clearDiscount: (request: OrderRequest) => {
    request.items.forEach(item => {
      item.discount_items = [];
      OrderUtils.onQuantityChange(item, item.quantity);
    }, []);
    request.discounts = [];
  },
  getDiscount: (
    discount_type: DiscountType,
    discounts: Array<OrderDiscountItemSubRequest>,
  ) => {
    if (discounts.length === 0) {
      return '0';
    }
    let discount = discounts[0];
    if (discount_type === 'money') {
      return NumberUtils.formatCurrency(discount.value);
    }
    return discount.rate.toString();
  },
  totalPailPayment: (payments: Array<PaymentSubDto>) => {
    return payments
      .filter(a => a.status === 'paid')
      .map(item => item.amount)
      .reduce((a, b) => a + b, 0);
  },
  getDiscountCode: (subRequest: OrderDiscountSubRequest[]) => {
    let code = '';
    let subRequestAfterFilter = subRequest.filter(
      item => item.discount_code !== null || item.discount_code !== '',
    );
    if (
      subRequestAfterFilter.length > 0 &&
      subRequestAfterFilter[0].discount_code !== null
    ) {
      code = subRequestAfterFilter[0].discount_code;
    }
    return code;
  },
  getTrackingCode: (order: OrderSearchDto | OrderDto, symbol: string = '') => {
    let code = symbol;
    const fulfillments = [
      ...order.fulfillments.filter(e => e.shipment !== null),
    ];
    if (order && fulfillments && fulfillments.length > 0) {
      const index = fulfillments.length - 1;
      const shipment = fulfillments[index].shipment;
      if (shipment && shipment.trackingCode) {
        return shipment.trackingCode;
      }
    }
    return code;
  },
  getDeliveryServiceProviderName: (
    order: OrderSearchDto | OrderDto,
    symbol: string = '',
  ) => {
    let name = symbol;
    const fulfillments = order.fulfillments.filter(e => !e.shipment);
    if (order && fulfillments && fulfillments.length > 0) {
      const index = fulfillments.length - 1;
      const shipment = fulfillments[index].shipment;
      if (shipment && shipment.deliveryServiceProviderName) {
        return shipment.deliveryServiceProviderName;
      }
    }
    return name;
  },

  getFulfillmentShippingAddress: (order: OrderDto) => {
    let result = '';
    let shippingAddress = order?.shippingAddress;
    if (!shippingAddress) {
      return '';
    }
    const addressArr = [
      shippingAddress.fullAddress,
      shippingAddress.ward,
      shippingAddress.district,
      shippingAddress.city,
    ];
    const addressArrResult = addressArr.filter(address => address);
    if (addressArrResult.length > 0) {
      result = addressArrResult.join(' - ');
    }
    return result;
  },
};
export {OrderUtils};
