export interface VariantPriceResponse {
  id: number;
  costPrice: number | null;
  currencyCode: string;
  currencySymbol: string;
  importPrice: number | null;
  retailPrice: number | null;
  taxPercent: number | null;
  wholesalePrice: number | null;
  variantId: number;
}
