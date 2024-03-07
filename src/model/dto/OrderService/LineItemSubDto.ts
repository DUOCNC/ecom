import {BaseDto} from 'model/base/BaseDto';
import {DiscountItemSubDto} from './DiscountItemSubDto';

export interface LineItemSubDto extends BaseDto {
  sku: string;
  variantId: number;
  variant: string;
  productId: number;
  product: string;
  productCode: string;
  variantBarcode: string;
  productType: string;
  quantity: number;
  price: number;
  amount: number;
  note: string;
  variantImage: string;
  unit: string;
  taxRate: number;
  taxInclude: boolean | null;
  discountItems: Array<DiscountItemSubDto>;
  isComposite: boolean | null;
  lineAmountAfterLineDiscount: number;
  discountRate: number;
  discountValue: number;
  discountAmount: number;
  position: number;
  weight: number;
  weightUnit: string;
  type: string;
}
