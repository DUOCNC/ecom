import {NumberUtils} from 'common';
import DiscountItemEntity from './DiscountItemEntity';
import VariantEntity from './VariantEntity';
import OrderEntity from './OrderEntity';
import {SuggestedDiscountGiftEntity} from 'modules/order/models/entities/GiftProgramEntity';
import {
  EntitledMethodEnum,
  LineItemTypeLowercase,
} from 'modules/order/enums/Promotion';
import {getMediaUrl} from 'utils/MediaUtils';

export default class OrderLineEntity {
  static readonly min: number = 0;
  static readonly max: number = 10000;
  public gifts: Array<OrderLineEntity> = [];
  private id: number | null;
  private amount: number;
  private discountAmount: number;
  private discountItems: Array<DiscountItemEntity>;
  private discountRate: number;
  private discountValue: number;
  private distributedOrderDiscount: number;
  private isComposite: boolean | null;
  private lineAmountAfterLineDiscount: number;
  private note: string;
  private position: number;
  private pretaxPrice: number;
  private price: number;
  private product: string;
  private productCode: string;
  private productId: number;
  private productType: string;
  private quantity: number;
  private sku: string;
  private taxInclude: number;
  private taxLines: [];
  private taxRate: number;
  private taxable: boolean;
  private totalTaxLine: number;
  private type: LineItemTypeLowercase = LineItemTypeLowercase.NORMAL;
  private unit: string;
  private variantBarcode: string;
  private variantId: number;
  private variantImage: string | null;
  private weight: number;
  private weightUnit: string;
  private variant: VariantEntity;
  public giftProgram: SuggestedDiscountGiftEntity | null;

  private constructor(
    id: number | null,
    amount: number,
    discountAmount: number,
    discountItems: Array<DiscountItemEntity>,
    discountRate: number,
    discountValue: number,
    distributedOrderDiscount: number,
    isComposite: boolean | null,
    lineAmountAfterLineDiscount: number,
    note: string,
    position: number,
    pretaxPrice: number,
    price: number,
    product: string,
    productCode: string,
    productId: number,
    productType: string,
    quantity: number,
    sku: string,
    taxInclude: number,
    taxLines: [],
    taxRate: number,
    taxable: boolean,
    totalTaxLine: number,
    type: LineItemTypeLowercase,
    unit: string,
    variantBarcode: string,
    variantId: number,
    variantImage: string | null,
    weight: number,
    weightUnit: string,
    variant: VariantEntity,
    gifts: Array<OrderLineEntity>,
    giftProgram: SuggestedDiscountGiftEntity | null,
  ) {
    this.id = id;
    this.amount = amount;
    this.discountAmount = discountAmount;
    this.discountItems = discountItems;
    this.discountRate = discountRate;
    this.discountValue = discountValue;
    this.distributedOrderDiscount = distributedOrderDiscount;
    this.isComposite = isComposite;
    this.lineAmountAfterLineDiscount = lineAmountAfterLineDiscount;
    this.note = note;
    this.position = position;
    this.pretaxPrice = pretaxPrice;
    this.price = price;
    this.product = product;
    this.productCode = productCode;
    this.productId = productId;
    this.productType = productType;
    this.quantity = quantity;
    this.sku = sku;
    this.taxInclude = taxInclude;
    this.taxLines = taxLines;
    this.taxRate = taxRate;
    this.taxable = taxable;
    this.totalTaxLine = totalTaxLine;
    this.type = type;
    this.unit = unit;
    this.variantBarcode = variantBarcode;
    this.variantId = variantId;
    this.variantImage = variantImage;
    this.weight = weight;
    this.weightUnit = weightUnit;
    this.variant = variant;
    this.gifts = gifts;
    this.giftProgram = giftProgram ?? null;
  }

  static create(variant: VariantEntity) {
    return new OrderLineEntity(
      null,
      0,
      0,
      [],
      0,
      0,
      0,
      false,
      variant.getRetailPriceValue(),
      '',
      0,
      0,
      0,
      '',
      '',
      variant.getProductId(),
      '',
      1,
      variant.getSku(),
      0,
      [],
      0,
      false,
      0,
      LineItemTypeLowercase.NORMAL,
      '',
      variant.getBarcode(),
      variant.getId(),
      variant.getImage(),
      0,
      '',
      variant,
      [],
      null,
    );
  }

  static clone(data: OrderLineEntity) {
    return new OrderLineEntity(
      data.id,
      data.amount,
      data.discountAmount,
      data.discountItems,
      data.discountRate,
      data.discountValue,
      data.distributedOrderDiscount,
      data.isComposite,
      data.lineAmountAfterLineDiscount,
      data.note,
      data.position,
      data.pretaxPrice,
      data.price,
      data.product,
      data.productCode,
      data.productId,
      data.productType,
      data.quantity,
      data.sku,
      data.taxInclude,
      data.taxLines,
      data.taxRate,
      data.taxable,
      data.totalTaxLine,
      data.type,
      data.unit,
      data.variantBarcode,
      data.variantId,
      data.variantImage,
      data.weight,
      data.weightUnit,
      data.variant,
      data.gifts,
      data.giftProgram,
    );
  }

  setQuantity(q: number) {
    if (OrderLineEntity.min <= q && q < OrderLineEntity.max) {
      this.quantity = q;
      this.updateAmount();
    }
  }

  getQuantity() {
    return this.quantity;
  }

  setVariant(v: VariantEntity) {
    this.variant = v;
  }

  getVariantName() {
    if (this.variant) {
      return this.variant.getName();
    }
  }

  getSku() {
    return this.sku;
  }

  getVariantImage() {
    if (!this.variantImage) {
      return '';
    }
    return getMediaUrl(this.variantImage);
  }

  getPrice(lineItem: OrderLineEntity) {
    if (lineItem && lineItem.getGiftProgram()) {
      return 0;
    }
    if (
      this.getDiscountItems() &&
      this.getDiscountItems().length > 0 &&
      this.getDiscountItems()[0].getSuggestedDiscounts().length > 0
    ) {
      const discount = this.getDiscountItems()[0];
      return discount.getPriceAfterDiscount();
    }
    return this.getVariant().getRetailPrice();
  }

  getPriceValue() {
    if (this.getDiscountItems() && this.getDiscountItems().length > 0) {
      const discount = this.getDiscountItems()[0];
      return discount.getPriceAfterDiscountNumber();
    }
    return this.getVariant().getRetailPriceValue();
  }

  getLineAmountAfterLineDiscount() {
    return NumberUtils.formatCurrency(
      this.getLineAmountAfterLineDiscountValue(),
    );
  }
  getLineAmountAfterLineDiscountValue() {
    if (this.lineAmountAfterLineDiscount === undefined) {
      return this.variant.getRetailPriceValue() * this.quantity;
    }
    return this.lineAmountAfterLineDiscount;
  }

  getAmountValue() {
    return this.quantity * this.getVariant().getRetailPriceValue();
  }
  getNote() {
    return this.note;
  }
  getAmount() {
    return NumberUtils.formatCurrency(this.amount);
  }

  getDiscountAmountValue() {
    return this.discountAmount;
  }

  getDiscountAmount() {
    return NumberUtils.formatCurrency(this.discountAmount);
  }

  getQuantityValue() {
    return this.quantity;
  }

  setGiftProgram(giftProgram: SuggestedDiscountGiftEntity | null) {
    this.giftProgram = giftProgram;
  }

  getGiftProgram() {
    return this.giftProgram;
  }

  getSellableInventory(order: OrderEntity) {
    if (order) {
      const orderConfig = order.getOrderConfig();
      if (
        orderConfig &&
        this.variant.getAvailableValue() <= 0 &&
        !orderConfig.sellableInventory
      ) {
        return false;
      }
    }

    return true;
  }
  getVariantId() {
    return this.variantId;
  }

  getVariant() {
    return this.variant;
  }
  getProductId() {
    return this.productId;
  }
  getType() {
    return this.type;
  }
  getProductCode() {
    return this.productCode;
  }
  getUnit() {
    return this.unit;
  }

  // quà tặng
  getGifts() {
    return this.gifts;
  }
  setGifts(gifts: Array<OrderLineEntity>) {
    this.gifts = gifts;
  }
  setType(type: LineItemTypeLowercase) {
    this.type = type;
  }
  findGiftByIndex(index: number) {
    return this.getGifts()[index];
  }
  addGift(gift: OrderLineEntity) {
    this.gifts.unshift(gift);
  }
  updateGift(newGift: OrderLineEntity, index: number) {
    this.gifts[index] = newGift;
  }
  removeGift(index: number) {
    this.gifts.splice(index, 1);
  }

  setPosition(position: number) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }

  getTotalPriceValue() {
    if (this.variant.getRetailPriceValue()) {
      return this.quantity * this.variant.getRetailPriceValue();
    }
    return 0;
  }

  private updateAmount() {
    if (this.discountItems.length > 0) {
      const discount = this.discountItems[0];
      if (
        discount.getEntitledMethod() === EntitledMethodEnum.DISCOUNT_CODE_LINE
      ) {
        this.amount = discount.getOriginalUnitPrice(); // Giá gốc
        this.lineAmountAfterLineDiscount =
          discount.getPriceAfterDiscountValue() +
          discount.getOriginalUnitPrice() * (this.quantity - 1); // Tổng tiền trả
        this.discountAmount = discount.getAmountDiscountValue(); // Tổng tiền giảm
      } else {
        this.amount = discount.getOriginalUnitPrice(); // Giá gốc
        this.lineAmountAfterLineDiscount =
          discount.getPriceAfterDiscountValue() * this.quantity; // Tổng tiền trả
        this.discountAmount = discount.getAmountDiscountValue() * this.quantity; // Tổng tiền giảm
      }
      console.log({
        1: this.amount,
        2: this.lineAmountAfterLineDiscount,
        3: this.discountAmount,
        4: discount.getEntitledMethod(),
      });
    } else {
      this.lineAmountAfterLineDiscount =
        this.variant.getRetailPriceValue() * this.quantity;
      this.discountAmount = 0;
    }
    if (
      this.discountAmount >=
      this.quantity * this.variant.getRetailPriceValue()
    ) {
      this.lineAmountAfterLineDiscount = 0;
    }
  }

  //chiết khấu
  setDiscountItems(discounts: Array<DiscountItemEntity>) {
    this.discountItems = discounts;
    this.updateAmount();
  }
  getDiscountItems() {
    if (this.discountItems.length > 0) {
      return this.discountItems;
    } else {
      return [];
    }
  }

  getTaxable() {
    return this.taxable;
  }
}
