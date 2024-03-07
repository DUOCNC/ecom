import {VariantPriceResponse} from '../responses';

export default class VariantPriceEntity {
  private id: number;
  private costPrice: number | null;
  private currencyCode: string;
  private currencySymbol: string;
  private importPrice: number | null;
  private retailPrice: number | null;
  private taxPercent: number | null;
  private wholesalePrice: number | null;
  private variantId: number;
  constructor(
    id: number,
    costPrice: number | null,
    currencyCode: string,
    currencySymbol: string,
    importPrice: number | null,
    retailPrice: number | null,
    taxPercent: number | null,
    wholesalePrice: number | null,
    variantId: number,
  ) {
    this.id = id;
    this.costPrice = costPrice;
    this.currencyCode = currencyCode;
    this.currencySymbol = currencySymbol;
    this.importPrice = importPrice;
    this.retailPrice = retailPrice;
    this.taxPercent = taxPercent;
    this.wholesalePrice = wholesalePrice;
    this.variantId = variantId;
  }

  static create(variantPrice: VariantPriceResponse) {
    return new VariantPriceEntity(
      variantPrice.id,
      variantPrice.costPrice,
      variantPrice.currencyCode,
      variantPrice.currencySymbol,
      variantPrice.importPrice,
      variantPrice.retailPrice,
      variantPrice.taxPercent,
      variantPrice.wholesalePrice,
      variantPrice.variantId,
    );
  }

  getId() {
    return this.id;
  }

  getVariantId() {
    return this.variantId;
  }

  getCostPrice() {
    return this.costPrice;
  }

  getCurrencyCode() {
    return this.currencyCode;
  }

  getCurrencySymbol() {
    return this.currencySymbol;
  }

  getImportPrice() {
    return this.importPrice;
  }

  getRetailPrice() {
    if (this.retailPrice == null) {
      return 0;
    }
    return this.retailPrice;
  }

  getTaxPercent() {
    return this.taxPercent;
  }

  getWholeSalePrice() {
    return this.wholesalePrice;
  }
}
