import {InventoryResponse} from '../responses';
import {NumberUtils} from 'common';

export default class InventoryEntity {
  private available: number;
  private committed: number;
  private defect: number;
  private inComing: number;
  private onHand: number;
  private onHold: number;
  private onWay: number;
  private point: number | null;
  private shipping: number;
  private storeId: number | null;
  private totalStock: number;
  private transferring: number;
  private variantId: number;

  constructor(
    available: number,
    committed: number,
    defect: number,
    inComing: number,
    onHand: number,
    onHold: number,
    onWay: number,
    point: number | null,
    shipping: number,
    storeId: number | null,
    totalStock: number,
    transferring: number,
    variantId: number,
  ) {
    this.available = available;
    this.committed = committed;
    this.defect = defect;
    this.inComing = inComing;
    this.onHand = onHand;
    this.onHold = onHold;
    this.onWay = onWay;
    this.point = point;
    this.shipping = shipping;
    this.storeId = storeId;
    this.totalStock = totalStock;
    this.transferring = transferring;
    this.variantId = variantId;
  }

  public static createFromResponse(inventory: InventoryResponse) {
    return new InventoryEntity(
      inventory.available,
      inventory.committed,
      inventory.defect,
      inventory.inComing,
      inventory.onHand,
      inventory.onHold,
      inventory.onWay,
      inventory.point,
      inventory.shipping,
      inventory.storeId,
      inventory.totalStock,
      inventory.transferring,
      inventory.variantId,
    );
  }

  public static createEmpty(storeId: number | null, variantId: number) {
    return new InventoryEntity(
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      null,
      0,
      storeId,
      0,
      0,
      variantId,
    );
  }

  getAvailable() {
    return NumberUtils.formatNumber(this.available);
  }

  getAvailableTypeNumber() {
    return this.available;
  }

  getCommitted() {
    return NumberUtils.formatNumber(this.committed);
  }

  getDefect() {
    return NumberUtils.formatNumber(this.defect);
  }

  getInComing() {
    return NumberUtils.formatNumber(this.inComing);
  }

  getOnHand() {
    return NumberUtils.formatNumber(this.onHand);
  }

  getOnHold() {
    return NumberUtils.formatNumber(this.onHold);
  }

  getOnWay() {
    return NumberUtils.formatNumber(this.onWay);
  }

  getPoint() {
    return this.point;
  }

  getShipping() {
    return NumberUtils.formatNumber(this.shipping);
  }

  getStoreId() {
    return this.storeId;
  }

  getTotalStock() {
    return NumberUtils.formatNumber(this.totalStock);
  }

  getTotalStockValue() {
    return this.totalStock;
  }

  getTransferring() {
    return NumberUtils.formatNumber(this.transferring);
  }

  getVariantId() {
    return this.variantId;
  }

  static createEmptyInventoryResponse(storeId: number, variantId: number) {
    return {
      available: 0,
      committed: 0,
      defect: 0,
      inComing: 0,
      onHand: 0,
      onHold: 0,
      onWay: 0,
      point: null,
      shipping: 0,
      storeId,
      totalStock: 0,
      transferring: 0,
      variantId: variantId,
    };
  }
}
