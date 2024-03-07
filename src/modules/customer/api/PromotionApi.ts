import {BaseApi, Result, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {CustomerDiscountResponse} from '../models/responses';

class PromotionApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/promotion-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getCustomerDiscountCodes(customerId: number) {
    let url = this.getUrl(
      StringUtils.format('discount-codes/customers/{0}', customerId),
    );
    return BaseAxios.get<Result<Array<CustomerDiscountResponse>>>(url, {
      params: {use_status: 'Available'},
    });
  }
}

export default PromotionApi;
