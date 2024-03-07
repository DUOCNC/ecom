import {NumberUtils} from 'common';
import {VariantResponse} from '../responses';
import VariantEntity from './VariantEntity';

export default class TopVariantEntity {
  private sku: string;
  private name: string;
  private quantity: number;
  private variant: VariantEntity | null;

  private constructor(
    sku: string,
    name: string,
    quantity: number,
    variant: VariantEntity | null,
  ) {
    this.sku = sku;
    this.name = name;
    this.quantity = quantity;
    this.variant = variant;
  }

  public static create(sku: string, name: string, quantity: number) {
    return new TopVariantEntity(sku, name, quantity, null);
  }

  getSku() {
    return this.sku;
  }

  nonNullVariant() {
    return this.variant !== null;
  }

  setVariant(variant: VariantResponse) {
    let variantEntity = VariantEntity.create(variant);
    this.variant = variantEntity;
  }

  getVariantName() {
    if (this.variant == null) {
      return '';
    }
    return this.variant.getName();
  }

  getImage() {
    if (this.variant == null) {
      return '';
    }
    return this.variant.getImage();
  }

  getQuantity() {
    return NumberUtils.formatNumber(this.quantity);
  }

  getRetailPrice() {
    if (this.variant == null) {
      return NumberUtils.formatCurrency(0);
    }
    return this.variant.getRetailPrice();
  }

  getProductId() {
    if (this.variant === null) {
      return -1;
    }
    return this.variant.getProductId();
  }
  getVariantId() {
    if (this.variant === null) {
      return -1;
    }
    return this.variant.getId();
  }
}
