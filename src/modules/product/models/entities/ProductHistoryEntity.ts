import {camelizeKeys} from 'humps';

export default class ProductHistoryEntity {
  id: string;
  variantName: string;
  sku: string;

  private constructor(id: string, variantName: string, sku: string) {
    this.id = id;
    this.variantName = variantName;
    this.sku = sku;
  }

  static createByString(data: string) {
    let dataParse = JSON.parse(data);
    dataParse = camelizeKeys(dataParse);
    if (
      dataParse.id === undefined ||
      dataParse.variantName === undefined ||
      dataParse.sku === undefined
    ) {
      console.warn('Data có vấn đề');
    }
    return new ProductHistoryEntity(
      dataParse.id,
      dataParse.variantName,
      dataParse.sku,
    );
  }
}
