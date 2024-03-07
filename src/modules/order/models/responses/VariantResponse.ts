import {BaseAuditResponse} from 'common';
import {ProductResponse} from './ProductResponse';
import {VariantImageResponse} from './VariantImageResponse';
import {VariantPriceResponse} from './VariantPriceResponse';
import {enumBinLocation} from 'common/enums';

export interface VariantResponse extends BaseAuditResponse {
  id: number;
  code: string;
  sku: string;
  barcode: string;
  color: string | null;
  colorId: number | null;
  available: number;
  committed: number;
  defect: number;
  inComing: number;
  onHand: number;
  onHold: number;
  onWay: number;
  shipping: number;
  totalStock: number;
  transferring: number;
  height: number | null;
  length: number | null;
  lengthUnit: number | null;
  weight: number | null;
  weight_unit: number | null;
  width: number | null;
  name: string;
  product: ProductResponse;
  productId: number;
  referenceBarcodes: Array<string> | null;
  referenceId: number | null;
  saleable: boolean;
  size: string | null;
  sizeId: number | null;
  status: string;
  statusName: string;
  supplierIds: string;
  suppliers: string | null;
  taxable: boolean;
  type: number;
  variantImages: Array<VariantImageResponse>;
  variantPrices: Array<VariantPriceResponse>;
  version: number;
  binLocations: Array<BinLocations>;
}

interface BinLocations {
  binCode: enumBinLocation;
  remain: number;
  store_id: number;
  variant_id: number;
}
