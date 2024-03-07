export interface StoreSubReducer {
  id: number;
  name: string;
}

export interface ProductStoreReducer {
  initial: boolean;
  store: StoreSubReducer;
}
