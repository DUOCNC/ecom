import {BaseApi, Pageable, Result, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {VariantResponse, VariantQueryRequest, ProductResponse} from '../models';
import {MaterialResponse} from '../models/responses';

class ProductApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/product-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getVariants(query: VariantQueryRequest) {
    let url = this.getUrl('variants');
    return BaseAxios.get<Result<Pageable<VariantResponse>>>(url, {
      params: query,
    });
  }

  getVariant(id: number) {
    let endpoint = StringUtils.format('variants/{0}', id);
    let url = this.getUrl(endpoint);
    return BaseAxios.get<Result<VariantResponse>>(url);
  }

  getProduct(id: number) {
    let endpoint = StringUtils.format('products/{0}', id);
    let url = this.getUrl(endpoint);
    return BaseAxios.get<Result<ProductResponse>>(url);
  }

  getMaterial(id: number) {
    let endpoint = StringUtils.format('materials/{0}', id);
    let url = this.getUrl(endpoint);
    return BaseAxios.get<Result<MaterialResponse>>(url);
  }

  getMaterials(ids: string) {
    let endpoint = StringUtils.format('materials?ids={0}', ids);
    let url = this.getUrl(endpoint);
    return BaseAxios.get<Result<Pageable<MaterialResponse>>>(url);
  }
}

export default ProductApi;
