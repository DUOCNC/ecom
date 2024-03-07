import {AbstractCurrency, NumberUtils} from 'common';
import {VariantResponse} from '../responses';
import VariantImageEntity from './VariantImageEntity';
import VariantPriceEntity from './VariantPriceEntity';

export default class VariantEntity extends AbstractCurrency {
  private id: number;
  private sku: string;
  private name: string;
  private available: number;
  private productId: number;
  private barcode: string;
  private colorId: number | null;
  private color: string | null;
  private sizeId: number | null;
  private size: string | null;
  private variantImages: Array<VariantImageEntity> | null;
  private variantPrices: Array<VariantPriceEntity> | null;
  constructor(
    id: number,
    sku: string,
    name: string,
    available: number,
    productId: number,
    barcode: string,
    colorId: number | null,
    color: string | null,
    sizeId: number | null,
    size: string | null,
    variantImages: Array<VariantImageEntity> | null,
    variantPrices: Array<VariantPriceEntity> | null,
  ) {
    super();
    this.id = id;
    this.sku = sku;
    this.name = name;
    this.available = available;
    this.productId = productId;
    this.barcode = barcode;
    this.colorId = colorId;
    this.color = color;
    this.sizeId = sizeId;
    this.size = size;
    this.variantImages = variantImages;
    this.variantPrices = variantPrices;
  }

  static create(variant: VariantResponse) {
    let variantImages = null;
    if (variant.variantImages != null) {
      variantImages = variant.variantImages.map(variantImage =>
        VariantImageEntity.create(variantImage),
      );
    }
    let variantPrices = null;
    if (variant.variantImages != null) {
      variantPrices = variant.variantPrices.map(variantPrice =>
        VariantPriceEntity.create(variantPrice),
      );
    }
    return new VariantEntity(
      variant.id,
      variant.sku,
      variant.name,
      variant.available,
      variant.productId,
      variant.barcode,
      variant.colorId,
      variant.color,
      variant.sizeId,
      variant.size,
      variantImages,
      variantPrices,
    );
  }

  getId() {
    return this.id;
  }

  getKey() {
    return this.id.toString();
  }

  getName() {
    return this.name.trim();
  }

  getSku() {
    return this.sku.trim();
  }

  getImage() {
    if (this.variantImages === null || this.variantImages.length === 0) {
      return '';
    }
    let variantImage = this.variantImages.find(variant =>
      variant.isVariantAvatar(),
    );
    if (variantImage === undefined) {
      variantImage = this.variantImages[0];
    }
    return variantImage.getUrl();
  }

  getRetailPrice() {
    if (this.variantPrices == null) {
      return NumberUtils.formatCurrency(0);
    }
    let variantPrice = this.variantPrices.find(
      price => price.getCurrencyCode() === this.getCurrency(),
    );
    if (variantPrice == null) {
      return NumberUtils.formatCurrency(0);
    }
    return NumberUtils.formatCurrency(variantPrice.getRetailPrice());
  }

  getAvailable() {
    return NumberUtils.formatNumber(this.available);
  }

  getProductId() {
    return this.productId;
  }

  getVariantImages(): Array<VariantImageEntity> {
    if (this.variantImages == null) {
      return [];
    }
    return this.variantImages;
  }

  getBarcode() {
    return this.barcode;
  }

  getRetailPriceValue() {
    if (this.variantPrices == null) {
      return 0;
    }
    let variantPrice = this.variantPrices.find(
      price => price.getCurrencyCode() === this.getCurrency(),
    );
    if (variantPrice == null) {
      return 0;
    }
    return variantPrice.getRetailPrice();
  }

  getSizeId() {
    if (this.sizeId == null) {
      return -1;
    }
    return this.sizeId;
  }

  getSize() {
    if (this.size == null) {
      return '---';
    }
    return this.size;
  }

  getColorId() {
    if (this.colorId == null) {
      return -1;
    }
    return this.colorId;
  }

  getColor() {
    if (this.color == null) {
      return 'Không có màu';
    }
    return this.color;
  }
}
