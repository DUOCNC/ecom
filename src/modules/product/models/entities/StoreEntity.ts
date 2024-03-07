import {StoreResponse} from 'model';
import {InventoryEntity} from 'modules/product/models';
import StoreInventoryDetailEntity from './StoreInventoryDetailEntity';
import {Location} from 'model/providers';

export default class StoreEntity {
  private readonly id: number;
  private readonly name: string | null | undefined;
  private readonly address: string | null | undefined;
  private readonly hotLine: string | undefined;
  private readonly latitude: number | null;
  private readonly longitude: number | null;
  private inventory: InventoryEntity;

  constructor(
    id: number,
    name: string | null | undefined,
    address: string | null | undefined,
    hotLine: string | undefined,
    latitude: number | null,
    longitude: number | null,
    inventory: InventoryEntity,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.hotLine = hotLine;
    this.latitude = latitude;
    this.longitude = longitude;
    this.inventory = inventory;
  }

  public static createFromResponse(store: Location) {
    return new StoreEntity(
      store.id,
      store.name,
      store.address,
      store.hotline,
      store.latitude,
      store.longitude,
      InventoryEntity.createEmpty(0, 0),
    );
  }

  public static createEmpty(store: StoreResponse | null | undefined) {
    return new StoreEntity(
      -1,
      store?.name,
      store?.address,
      store?.hotline,
      null,
      null,
      InventoryEntity.createEmpty(0, 0),
    );
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }

  getLatitude() {
    return this.latitude;
  }

  getLongitude() {
    return this.longitude;
  }

  getInventory() {
    return this.inventory;
  }

  setInventory(inventory: InventoryEntity) {
    this.inventory = inventory;
  }

  getHotLine() {
    return this.hotLine;
  }

  getStoreInventoryDetailPopup() {
    if (!this.inventory) {
      return [];
    }
    return [
      new StoreInventoryDetailEntity(
        'totalStock',
        'Tổng tồn',
        this.inventory.getTotalStock(),
      ),
      new StoreInventoryDetailEntity(
        'onHand',
        'Tồn trong kho',
        this.inventory.getOnHand(),
      ),
      new StoreInventoryDetailEntity(
        'available',
        'Có thể bán',
        this.inventory.getAvailable(),
        true,
      ),
      new StoreInventoryDetailEntity(
        'committed',
        'Đang giao dịch',
        this.inventory.getCommitted(),
      ),
      new StoreInventoryDetailEntity(
        'onHold',
        'Tạm giữ',
        this.inventory.getOnHold(),
      ),
      new StoreInventoryDetailEntity(
        'defect',
        'Hàng lỗi',
        this.inventory.getDefect(),
      ),
      new StoreInventoryDetailEntity(
        'inComing',
        'Chờ nhập',
        this.inventory.getInComing(),
      ),
      new StoreInventoryDetailEntity(
        'transferring',
        'Chuyển đến',
        this.inventory.getTransferring(),
      ),
      new StoreInventoryDetailEntity(
        'onWay',
        'Chuyển đi',
        this.inventory.getOnWay(),
      ),
    ];
  }
}
