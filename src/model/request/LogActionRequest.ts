export interface LogActionRequest {
  function: string;
  screen: string;
  action: string;
  customerId?: number;
  storeId?: number;
  storeName?: string;
}
