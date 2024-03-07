import {StoreResponse} from 'model';
import {Location} from 'model/providers';

export default class StoreEntity {
  private id: number;
  private name: string;
  private active: boolean;

  private constructor(id: number, name: string, active: boolean) {
    this.id = id;
    this.name = name;
    this.active = active;
  }

  public static createFromResponse(
    storeResponse: StoreResponse,
    storeActive: Location,
  ) {
    let active = storeActive.id === storeResponse.id;
    return new StoreEntity(storeResponse.id, storeResponse.name, active);
  }

  public static createDefault(storeActive: Location): StoreEntity {
    let active = storeActive.id === -1;
    return new StoreEntity(-1, 'Tất cả cửa hàng', active);
  }

  getKey() {
    return this.id.toString();
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  isActive() {
    return this.active;
  }

  setActive(active: boolean) {
    this.active = active;
  }

  activeStore() {
    this.active = true;
  }

  unActiveStore() {
    this.active = false;
  }

  toStoreInfo() {
    let storeInfo = {
      id: this.getId(),
      name: this.getName(),
    };
    return storeInfo;
  }
}
