export interface CustomerPurchasedSpecificationResponse {
  customerId: number;
  productCategoryLv3Data: ProductCategoryLv3Daum[];
  colorData: ColorSpecification[];
  sizeData: SizeSpecification[];
  sku3Data: SkuSpecification[];
  materialData: MaterialSpecification[];
  updatedDate: string;
}

export interface ProductCategoryLv3Daum {
  quantity: number;
  percentage: number;
  productCategoryLv2: string;
}

export interface ColorSpecification {
  quantity: number;
  percentage: number;
  productCategoryLv2: string;
  productCategoryLv3: string;
  mainColor: string;
}

export interface SizeSpecification {
  size: string;
  quantity: number;
  percentage: number;
  productCategoryLv2: string;
  productCategoryLv3: string;
}

export interface SkuSpecification {
  quantity: number;
  percentage: number;
  productCategoryLv2: string;
  sku3: string;
  sku3Name: string;
}

export interface MaterialSpecification {
  quantity: number;
  percentage: number;
  productCategoryLv2: string;
  materialName: string;
}
