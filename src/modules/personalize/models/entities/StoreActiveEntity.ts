import {ic_store, ic_support_store} from 'assets/images';
import {LocationSelectedProvider} from 'model/providers';

export default class StoreEntity {
  id: number;
  name: string;
  support: boolean;

  private constructor(id: number, name: string, support: boolean) {
    this.id = id;
    this.name = name;
    this.support = support;
  }

  public static createFromStoreActive(location: LocationSelectedProvider) {
    return new StoreEntity(
      location.locationId,
      location.locationName,
      location.supported,
    );
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

  isSupport() {
    return this.support;
  }

  getIcon() {
    return this.support ? ic_support_store : ic_store;
  }

  getTitle() {
    return this.support ? 'Cửa hàng hỗ trợ' : 'Cửa hàng mặc định';
  }
}
