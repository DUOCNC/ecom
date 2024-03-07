import {BaseApi, Result, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {LoyaltyResponse} from '../models/responses';

class LoyaltyApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/loyalty-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getLoyalty(id: number) {
    let url = this.getUrl(
      StringUtils.format('loyalty-points/customer/{0}', id),
    );
    return BaseAxios.get<Result<LoyaltyResponse>>(url);
  }
}

export default LoyaltyApi;
