export interface OrderPrintConfig {
  id: number;
  name: string;
}

export interface OrderConfigReducer {
  allowChooseItem: boolean;
  forAllOrder: boolean;
  hideBonusItem: boolean;
  hideGift: boolean;
  orderConfigAction: string;
  orderConfigPrint: OrderPrintConfig;
  sellableInventory: boolean;
}
