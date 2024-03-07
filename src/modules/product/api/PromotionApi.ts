import {BaseApi, Pageable, Result} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {PromotionResponse, PromotionRequest} from '../models';

class PromotionApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/promotion-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getPromotion(query: PromotionRequest) {
    let url = this.getUrl('price-rule-entitlements/search-by-product');
    return BaseAxios.get<Result<Pageable<PromotionResponse>>>(url, {
      params: query,
    });
  }
}

export default PromotionApi;
