import {BaseDto} from 'model/base/BaseDto';
import {ColorValue} from 'react-native';
import {VariantImage} from './VariantImage';
import {VariantPrice} from './VariantPrice';

export interface CollectionSubDto {
  id: number;
  description: string;
  code: string;
  name: string;
}

export interface CollectionFulDto {
  collection: CollectionSubDto;
  textColor: ColorValue;
  isChecked: boolean;
}
export interface VariantSubDto {
  id: number;
  name: string;
  inventory: number;
  supplier_id: number | null;
  supplier: string;
  color_id: number | null;
  color: string | null;
  size_id: number | null;
  size: string | null;
  color_code: string | null;
  barcode: string;
  reference_barcodes: string | null;
  reference_id: number | null;
  barcode_url: string | null;
  taxable: boolean;
  saleable: boolean;
  sku: string;
  status: string;
  status_name: string;
  composite: boolean;
  width: number | null;
  length: number | null;
  height: number | null;
  weight: number;
  weight_unit: string;
  length_unit: string;
  variant_prices: Array<VariantPrice>;
  variant_images: Array<VariantImage>;
}

export interface ProductDto extends BaseDto {
  category_id: number;
  category: string;
  goods: string;
  goods_name: string | null;
  material_id: number | null;
  material: string;
  brand: string;
  brand_name: string;
  made_in_id: number | null;
  made_in: string | null;
  description: string | null;
  content: string | null;
  merchandiser_code: string | null;
  designer_code: string | null;
  merchandiser: string | null;
  designer: string | null;
  tags: string | null;
  status: string;
  name: string;
  care_labels: string | null;
  unit: string;
  unit_name: string | null;
  product_type: string;
  specifications: string | null;
  on_hand: number;
  available: number;
  collections: Array<CollectionSubDto>;
  reference_id: number | null;
  num_variant: number;
  product_avatar: string;
  variants: Array<VariantSubDto>;
  material_advantages: string | null;
  material_component: string | null;
  material_defect: string | null;
}

export interface CategoryDto extends BaseDto {
  category: string;
  category_id: number;
  url: string;
  position: number;
}
