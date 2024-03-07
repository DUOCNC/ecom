export interface InventoryRequest {
  variantIds?: Array<number>;
  storeIds?: Array<number | null | undefined>;
  isDetail: boolean;
}
export interface ShowroomInventoryRequest {
  variantIds?: string;
  storeId?: number;
}
