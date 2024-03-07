import {BaseApi, Pageable, Result, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {PromotionRequest} from '../models/request';
import {DiscountRequest} from '../models/request/PromotionRequest';
import {
  DiscountResponse,
  PromotionResponse,
  CustomerDiscountResponse,
} from '../models/responses';
import {GiftProgramRequest} from 'modules/order/models/request/GiftProgramRequest';
import {GiftProgramResponse} from 'modules/order/models/responses/GiftProgramResponse';

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

  getSuggestedDiscounts(request: DiscountRequest) {
    request.orderType = 'B2C';
    let url = this.getUrl('price-rules/apply');
    return BaseAxios.post<Result<DiscountResponse>>(url, request);
  }

  getSuggestedProgramDiscount(request: GiftProgramRequest) {
    let url = '/admin/v2/promotions/gifts/apply.json';
    return BaseAxios.post<Result<GiftProgramResponse>>(url, request);
  }

  getCustomerDiscountCodes(customerId: number) {
    let url = this.getUrl(
      StringUtils.format('discount-codes/customers/{0}', customerId),
    );
    return BaseAxios.get<Result<Array<CustomerDiscountResponse>>>(url, {
      params: {use_status: 'Available'},
    });
  }

  getSuggestedProgramDiscount(request: GiftProgramRequest) {
    let url = '/admin/v2/promotions/gifts/apply.json';
    return BaseAxios.post<Result<GiftProgramResponse>>(url, request);
  }
}

export default PromotionApi;
