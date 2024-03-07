import {NumberUtils} from 'common';
import {LineItemResponse} from '../response';
import {getMediaUrl} from 'utils/MediaUtils';

export default class LineItemEntity {
  private id: number;
  private code: string;
  private version: number;
  private createdBy: string;
  private createdName: string;
  private createdDate: string;
  private updatedBy: string;
  private updatedName: string;
  private updatedDate: string;
  private sku: string;
  private barcode: string;
  private variantName: string;
  private variantId: number;
  private variantImage: null | string;
  private productName: string;
  private productId: number;
  private available: number;
  private transferQuantity: number;
  private realQuantity: number;
  private amount: number;
  private price: number;
  private weight: number;
  private weightUnit: string;
  private receiveOnHand: number;

  constructor(data: LineItemResponse) {
    this.id = data.id;
    this.code = data.code;
    this.version = data.version;
    this.createdBy = data.createdBy;
    this.createdName = data.createdName;
    this.createdDate = data.createdDate;
    this.updatedBy = data.updatedBy;
    this.updatedName = data.updatedName;
    this.updatedDate = data.updatedDate;
    this.sku = data.sku;
    this.barcode = data.barcode;
    this.variantName = data.variantName;
    this.variantId = data.variantId;
    this.variantImage = data.variantImage;
    this.productName = data.productName;
    this.productId = data.productId;
    this.available = data.available;
    this.transferQuantity = data.transferQuantity;
    this.realQuantity = data.realQuantity;
    this.amount = data.amount;
    this.price = data.price;
    this.weight = data.weight;
    this.weightUnit = data.weightUnit;
    this.receiveOnHand = data.receiveOnHand;
  }

  getId(): number {
    return this.id;
  }

  setId(value: number): void {
    this.id = value;
  }

  getCode(): string {
    return this.code;
  }

  setCode(value: string): void {
    this.code = value;
  }

  getVersion(): number {
    return this.version;
  }

  setVersion(value: number): void {
    this.version = value;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }

  setCreatedBy(value: string): void {
    this.createdBy = value;
  }

  getCreatedName(): string {
    return this.createdName;
  }

  setCreatedName(value: string): void {
    this.createdName = value;
  }

  getCreatedDate(): string {
    return this.createdDate;
  }

  setCreatedDate(value: string): void {
    this.createdDate = value;
  }

  getUpdatedBy(): string {
    return this.updatedBy;
  }

  setUpdatedBy(value: string): void {
    this.updatedBy = value;
  }

  getUpdatedName(): string {
    return this.updatedName;
  }

  setUpdatedName(value: string): void {
    this.updatedName = value;
  }

  getUpdatedDate(): string {
    return this.updatedDate;
  }

  setUpdatedDate(value: string): void {
    this.updatedDate = value;
  }

  getSku(): string {
    return this.sku;
  }

  setSku(value: string): void {
    this.sku = value;
  }

  getBarcode(): string {
    return this.barcode;
  }

  setBarcode(value: string): void {
    this.barcode = value;
  }

  getVariantName(): string {
    return this.variantName;
  }

  setVariantName(value: string): void {
    this.variantName = value;
  }

  getVariantId(): number {
    return this.variantId;
  }

  setVariantId(value: number): void {
    this.variantId = value;
  }

  getVariantImage(): null | string {
    return getMediaUrl(this.variantImage);
  }

  setVariantImage(value: null | string): void {
    this.variantImage = value;
  }

  getProductName(): string {
    return this.productName;
  }

  setProductName(value: string): void {
    this.productName = value;
  }

  getProductId(): number {
    return this.productId;
  }

  setProductId(value: number): void {
    this.productId = value;
  }

  getAvailable(): number {
    return this.available;
  }

  setAvailable(value: number): void {
    this.available = value;
  }

  getTransferQuantityValue(): number {
    return this.transferQuantity;
  }

  getTransferQuantity(): string {
    return NumberUtils.formatNumber(this.transferQuantity);
  }

  setTransferQuantity(value: number): void {
    this.transferQuantity = value;
  }

  getRealQuantity(): number {
    return this.realQuantity;
  }

  setRealQuantity(value: number): void {
    this.realQuantity = value;
  }

  getAmount(): number {
    return this.amount;
  }

  setAmount(value: number): void {
    this.amount = value;
  }

  getPriceValue(): number {
    return this.price;
  }

  getPrice(): string {
    if (!this.price) {
      return '-';
    }
    return NumberUtils.formatCurrency(this.price);
  }

  setPrice(value: number): void {
    this.price = value;
  }

  getWeight(): number {
    return this.weight;
  }

  setWeight(value: number): void {
    this.weight = value;
  }

  getWeightUnit(): string {
    return this.weightUnit;
  }

  setWeightUnit(value: string): void {
    this.weightUnit = value;
  }

  getReceiveOnHand(): number {
    return this.receiveOnHand;
  }

  setReceiveOnHand(value: number): void {
    this.receiveOnHand = value;
  }
}
