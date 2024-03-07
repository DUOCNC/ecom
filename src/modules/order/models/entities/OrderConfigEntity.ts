import {OrderConfigReducer} from '../reducers';
export default class OrderConfigEntity {
  public sellableInventory: boolean = true;

  private constructor(sellableInventory: boolean) {
    this.sellableInventory = sellableInventory;
  }

  static createEmpty() {
    return new OrderConfigEntity(false);
  }

  static createOrderConfig(cf: OrderConfigReducer) {
    return new OrderConfigEntity(cf.sellableInventory);
  }

  getSellableInventory() {
    return this.sellableInventory;
  }
}
