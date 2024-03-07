import {BaseApi, Pageable, Result, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {VariantResponse, VariantQueryRequest} from '../models';
import {VariantLocationQueryRequest} from '../models/request/VariantQueryRequest';

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

  getVariantsByLocation(query: VariantLocationQueryRequest) {
    let url = this.getUrl('variants/bin-locations');
    return BaseAxios.get<Result<Pageable<VariantResponse>>>(url, {
      params: query,
    });
  }

  getVariant(id: number) {
    let endpoint = StringUtils.format('variants/{0}', id);
    let url = this.getUrl(endpoint);
    return BaseAxios.get<Result<VariantResponse>>(url);
  }
}

export default ProductApi;
