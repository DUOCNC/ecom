import {ShowroomInventoryResponse} from 'modules/product/models/responses/ShowroomInventoryResponse';

export default class ShowroomInventoryEntity {
  private id: number;
  private storeId: number;
  private variantId: number;
  private productId: number;
  private sku: string;
  private showroom: number;
  private storage: number;

  constructor(
    id: number,
    storeId: number,
    variantId: number,
    productId: number,
    sku: string,
    showroom: number,
    storage: number,
  ) {
    this.id = id;
    this.storeId = storeId;
    this.variantId = variantId;
    this.productId = productId;
    this.sku = sku;
    this.showroom = showroom;
    this.storage = storage;
  }

  public static createFromResponse(inventory: ShowroomInventoryResponse) {
    return new ShowroomInventoryEntity(
      inventory.id,
      inventory.storeId,
      inventory.variantId,
      inventory.productId,
      inventory.sku,
      inventory.showroom,
      inventory.storage,
    );
  }

  public static createEmpty(storeId: number) {
    return new ShowroomInventoryEntity(0, storeId, 0, 0, '', 0, 0);
  }

  getShowroomValue() {
    return this.showroom;
  }

  getStorageValue() {
    return this.storage;
  }
}
