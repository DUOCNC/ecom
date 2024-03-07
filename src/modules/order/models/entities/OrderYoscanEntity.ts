import {
  CustomerYoscan,
  DiscountItemYoscan,
  ItemYoscan,
  OrderYoscan,
  OrderYoscanResponse,
} from 'modules/order/models/responses/OrderYoscanResponse';
import {SubStatusesYoscan} from 'modules/order/config/YoscanConfig';
import {NumberUtils, StringUtils} from 'common';
import {EnumValuePricePromotion} from 'modules/order/enums';
import {LineItemTypeLowercase} from 'modules/order/enums/Promotion';
import {StatusYoscanOrderEnum} from 'modules/order/enums/Yoscan';
import {getMediaUrl} from 'utils/MediaUtils';

export class OrderYoscanEntity {
  private createdBy: string;
  private createdName: string;
  private updatedBy: string;
  private updatedName: string;
  private createdDate: string;
  private updatedDate: string;
  private id: number;
  private code: string;
  private storeId: number;
  private store: string;
  private status: StatusYoscanOrderEnum;
  private order: OrderYoscanDetailEntity;
  private total: number;
  private totalDiscount: number;

  constructor(data: OrderYoscanResponse) {
    this.createdBy = data.createdBy;
    this.createdName = data.createdName;
    this.createdDate = data.createdDate;
    this.updatedBy = data.updatedBy;
    this.updatedName = data.updatedName;
    this.updatedDate = data.updatedDate;
    this.id = data.id;
    this.code = data.code;
    this.storeId = data.storeId;
    this.store = data.store;
    this.status = data.status;
    this.order = new OrderYoscanDetailEntity(data.order);
    this.total = data.total;
    this.totalDiscount = data.totalDiscount;
  }
  getCode() {
    return this.code ?? '---';
  }

  getTotalCurrency() {
    if (!this.total) {
      return NumberUtils.formatCurrency(0);
    }
    if (this.order.getPoint() * 1000 >= this.total) {
      return NumberUtils.formatCurrency(0);
    }
    return NumberUtils.formatCurrency(
      this.total - this.order.getPoint() * 1000,
    );
  }

  getTotalProduct() {
    let total = 0;
    this.order.getItems().forEach(item => {
      total = total + item.getQuantity();
    });
    return total;
  }

  getOrder() {
    return this.order;
  }

  getCreatedDate() {
    return this.createdDate;
  }

  getStatus() {
    return this.status;
  }

  getStatusColor() {
    let index = SubStatusesYoscan.findIndex(
      value => value.code === this.status,
    );
    if (index === -1) {
      return null;
    }
    return SubStatusesYoscan[index];
  }
  getPercentDiscountTotalOrder() {
    let percentVal =
      (this.totalDiscount / (this.total + this.totalDiscount)) * 100;
    return `${percentVal.toFixed(2)}%`;
  }

  getTotalDiscount() {
    return this.totalDiscount;
  }
}

export class OrderYoscanDetailEntity {
  private customerId: number;
  private items: ItemOrderYoscanEntity[];
  private discounts: DiscountItemYoscanEntity[];
  private note: string;
  private customerNote: null | string;
  private point: number;
  private customer: Customer;

  constructor(data: OrderYoscan) {
    this.customerId = data.customerId;
    this.items = data.items.map(item => new ItemOrderYoscanEntity(item));
    this.discounts = data.discounts.map(
      discount => new DiscountItemYoscanEntity(discount),
    );
    this.note = data.note;
    this.customerNote = data.customerNote;
    this.point = data.point;
    this.customer = data.customer
      ? new Customer(data.customer)
      : Customer.createEmpty();
  }

  getItems() {
    if (!this.items) {
      return [];
    }
    return this.items;
  }

  getNote() {
    return this.note;
  }

  getCustomer() {
    return this.customer;
  }

  getCustomerId() {
    return this.customerId;
  }

  getDiscounts() {
    return this.discounts;
  }

  getPoint() {
    return this.point;
  }

  getTotalRetailPrice() {
    let total = 0;
    this.items.forEach(
      item => (total += item.getRetailPriceValue() * item.getQuantity()),
    );
    return total;
  }
}

export class ItemOrderYoscanEntity {
  private sku: string;
  private variantId: number;
  private variant: string;
  private productId: number;
  private product: string;
  private variantBarcode: string;
  private productType: string;
  private quantity: number;
  private price: number;
  private amount: number;
  private discountAmount: number;
  private lineAmountAfterLineDiscount: number;
  private discountItems: Array<DiscountItemYoscanEntity>;
  private note: string | null;
  private type: LineItemTypeLowercase;
  private position: number;
  private variantImage: string;

  constructor(data: ItemYoscan) {
    this.sku = data.sku;
    this.variantId = data.variantId;
    this.variant = data.variant;
    this.productId = data.productId;
    this.product = data.product;
    this.variantBarcode = data.variantBarcode;
    this.productType = data.productType;
    this.quantity = data.quantity;
    this.price = data.price;
    this.amount = data.amount;
    this.discountAmount = data.discountAmount;
    this.lineAmountAfterLineDiscount = data.lineAmountAfterLineDiscount;
    this.discountItems = data.discountItems.map(
      discount => new DiscountItemYoscanEntity(discount),
    );
    this.note = data.note;
    this.type = data.type;
    this.position = data.position;
    this.variantImage = data.variantImage;
  }
  getQuantity() {
    if (!this.quantity) {
      return 0;
    }
    return this.quantity;
  }
  getDiscountItems() {
    if (this.discountItems.length <= 0) {
      return [];
    }
    return this.discountItems;
  }
  getVariantName() {
    return this.variant;
  }
  getVariantImage() {
    return getMediaUrl(this.variantImage);
  }
  getSku() {
    return this.sku;
  }
  getPriceAfterDiscount() {
    if (this.type === LineItemTypeLowercase.GIFT) {
      return 0;
    }
    if (this.discountItems[0]) {
      return NumberUtils.formatCurrency(
        this.price - this.discountItems[0].getAmountDiscountValue(this.price),
      );
    } else {
      return NumberUtils.formatCurrency(this.price);
    }
  }
  getRetailPrice() {
    return NumberUtils.formatCurrency(this.price);
  }
  getRetailPriceValue() {
    return this.price;
  }

  getTitleByDiscountType() {
    let discount = this.discountItems[0];

    if (!discount) {
      return '';
    }
    if (discount.getType() === EnumValuePricePromotion.PERCENTAGE) {
      return `${discount.getRate()}%`;
    }
    if (discount.getType() === EnumValuePricePromotion.FIXED_AMOUNT) {
      if (discount.getValue() >= this.price) {
        return `${NumberUtils.formatCurrency(this.price)}`;
      }
      return `${NumberUtils.formatCurrency(discount.getValue())}`;
    }
    if (discount.getType() === EnumValuePricePromotion.FIXED_PRICE) {
      if (this.price <= discount.getValue()) {
        return NumberUtils.formatCurrency(0);
      }
      return `${NumberUtils.formatCurrency(this.price - discount.getValue())}`;
    }
    return `${NumberUtils.formatCurrency(discount.getValue())}`;
  }

  getTagDiscount() {
    let discount = this.discountItems[0];
    if (!discount) {
      return 0;
    }
    if (discount.getType() === EnumValuePricePromotion.PERCENTAGE) {
      return NumberUtils.formatCurrency(
        (discount.getRate() / 100) * this.price,
      );
    }
    if (discount.getType() === EnumValuePricePromotion.FIXED_AMOUNT) {
      if (discount.getValue() >= this.price) {
        return '100%';
      }
      return StringUtils.format(
        '{0}%',
        ((discount.getValue() / this.price) * 100).toFixed(2),
      );
    }
    if (discount.getType() === EnumValuePricePromotion.FIXED_PRICE) {
      if (this.price <= discount.getValue()) {
        return '0%';
      }
      return StringUtils.format(
        '{0}%',
        (((this.price - discount.getValue()) / this.price) * 100).toFixed(2),
      );
    }
    return NumberUtils.formatCurrency(this.price - discount.getValue());
  }
  getType() {
    return this.type;
  }
}

export class DiscountItemYoscanEntity {
  private rate: number;
  private value: number;
  private amount: number;
  private promotionId: number;
  private reason: string;
  private discountCode: string;
  private type: string;
  private promotionTitle: string;
  private taxable: boolean;

  constructor(data: DiscountItemYoscan) {
    this.rate = data.rate;
    this.value = data.value;
    this.amount = data.amount;
    this.promotionId = data.promotionId;
    this.reason = data.reason;
    this.discountCode = data.discountCode;
    this.type = data.type;
    this.promotionTitle = data.promotionTitle;
    this.taxable = data.taxable;
  }

  getType() {
    return this.type;
  }

  getPromotionTitle() {
    return this.promotionTitle;
  }
  getValue() {
    return this.value;
  }
  getRate() {
    return this.rate;
  }
  getAmountDiscountValue(variantPrice: number) {
    // Tính tổng tiền giảm trên 1 sản phẩm
    if (this.type === EnumValuePricePromotion.PERCENTAGE) {
      return (this.getRate() * variantPrice) / 100;
    }
    if (this.type === EnumValuePricePromotion.FIXED_AMOUNT) {
      if (this.getValue() >= variantPrice) {
        return variantPrice;
      }
      return this.getValue();
    }
    if (this.type === EnumValuePricePromotion.FIXED_PRICE) {
      if (this.getValue() >= variantPrice) {
        return 0;
      }
      return variantPrice - this.getValue();
    }
    return this.getValue();
  }
}

class Customer {
  private id: number;
  private customer: string;
  private phone: string;
  private district: string;
  private districtId: number;
  private ward: string;
  private wardId: number;
  private fullAddress: string;

  constructor(data: CustomerYoscan) {
    this.id = data.id;
    this.customer = data.customer;
    this.phone = data.phone;
    this.district = data.district;
    this.districtId = data.districtId;
    this.ward = data.ward;
    this.wardId = data.wardId;
    this.fullAddress = data.fullAddress;
  }

  static createEmpty() {
    return new Customer({
      id: -1,
      customer: '',
      phone: '',
      district: '',
      districtId: -1,
      ward: '',
      wardId: -1,
      fullAddress: '',
    });
  }

  getName() {
    return this.customer ?? 'Không có';
  }

  getPhoneNumber() {
    return this.phone ?? 'Không có';
  }
}
