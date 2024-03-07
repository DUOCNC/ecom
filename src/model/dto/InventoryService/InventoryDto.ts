import {StoreDto} from 'model/dto/CoreService/StoreDto';
import {BaseDto} from 'model/base/BaseDto';
import {VariantPrice} from '../ProductService/VariantPrice';
import {VariantImage} from '../ProductService/VariantImage';
export interface InventoryDto {
  store_id: number;
  variant_id: number;
  on_hand: number;
  available: number;
  committed: number;
  in_coming: number;
  on_way: number;
  on_hold: number;
  defect: number;
  transferring: number;
  shipping: number;
  total_stock: number;
}

export interface InventoryVariantDetailDto extends BaseDto {
  name: string;
  sku: string;
  company_id: number;
  store_dto: StoreDto;
  store_id: number;
  store_code: string;
  store: string;
  variant_id: number;
  product_id: number;
  on_hand: number;
  committed: number;
  available: number;
  in_coming: number;
  on_way: number;
  transaction_date: string;
  mac: string | null;
  barcode: string | null;
  total_stock: number;
  on_hold: number;
  defect: number;
  transferring: number;
  shipping: number;
  retail_price: number;
  import_price: number;
  variant_prices: Array<VariantPrice>;
  variant_images: Array<VariantImage>;
}
