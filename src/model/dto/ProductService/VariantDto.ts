import {BaseDto} from 'model/base/BaseDto';
import {VariantImage} from './VariantImage';
import {VariantPrice} from './VariantPrice';

export interface ProductSubDto {
  id: number;
  code: string;
  category_id: number;
  category: string;
  material_id: number;
  goods: string;
  material: string;
  brand: string;
  brand_name: string;
  made_in_id: number;
  made_in: string;
  description: string;
  merchandiser_code: string | null;
  designer_code: string | null;
  merchandiser: string | null;
  designer: string | null;
  tags: string;
  status: string;
  status_name: string;
  name: string;
  care_labels: string;
  unit: string;
  specifications: string | null;
  product_type: string;
  product_collections: string | null;
}

export interface VariantDto extends BaseDto {
  name: string;
  onHand: number;
  available: number;
  committed: number;
  inComing: number;
  onWay: number;
  onHold: number;
  defect: number;
  transferring: number;
  shipping: number;
  totalStock: number;
  supplierId: number | null;
  supplier: string | null;
  colorId: number | null;
  color: string | null;
  sizeId: number | null;
  size: string | null;
  barcode: string;
  referenceBarcodes: string | null;
  referenceId: number | null;
  taxable: boolean;
  saleable: boolean;
  sku: string;
  status: string;
  statusName: string;
  composite: boolean;
  width: number | null;
  length: number | null;
  height: number | null;
  weight: number;
  weightUnit: string;
  lengthUnit: string;
  productId: number;
  product: ProductSubDto;
  variantPrices: Array<VariantPrice>;
  variantImages: Array<VariantImage>;
  composites: Array<any>;
}

export interface VariantReportDto {
  name: string;
  sku: string;
  product_price: number | null;
}
