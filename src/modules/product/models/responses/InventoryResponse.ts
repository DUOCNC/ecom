export interface InventoryResponse {
  available: number;
  committed: number;
  defect: number;
  inComing: number;
  onHand: number;
  onHold: number;
  onWay: number;
  point: number | null;
  shipping: number;
  storeId: number;
  totalStock: number;
  transferring: number;
  variantId: number;
}

export interface BinLocationResponse {
  barcode: string;
  companyId: number | null;
  id: number | null;
  name: string;
  onHand: number;
  productId: number;
  showroom: number;
  showroomBalance: number;
  showroomTarget: number;
  sku: string;
  storage: number;
  store: string | null;
  storeId: number | null;
  variantId: number;
  variantImage: string | null;
}

export interface BinTargetResponse {
  binCode: string;
  code: string;
  companyId: number;
  id: number;
  productId: number;
  sku: string;
  storeId: 14;
  target: number;
  variantId: number;
}
